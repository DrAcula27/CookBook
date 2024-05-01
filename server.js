const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const axios = require("axios");

const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./config/passport-config");

require("dotenv").config();
require("./config/database.js");

const User = require("./models/user");
const Recipe = require("./models/recipe");

const app = express();

// allow cross origin access - client from any source can make requests to server
app.use(
  cors({
    origin: "*",
  })
);

// logs the different requests to the server
app.use(logger("dev"));

// parse stringified objects (JSON)
app.use(express.json());

initializePassport(
  passport,
  // passport wants a function that will return the correct user, given an email or id
  async (email) => {
    let user = User.findOne({ email });
    return user;
  },
  async (id) => {
    let user = User.findById(id);
    return user;
  }
);

app.use(
  session({
    secure: true,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // session times out after a day, user must log in again
    // 86400000ms = 24h
    cookie: { originalMaxAge: 86400000, sameSite: "strict" },
  })
);

app.use(passport.session());

// serve build folder
app.use(express.static(path.join(__dirname, "build")));

/*
 // ********************************************************* \\
||   *********************** ROUTES ************************  ||
 \\ ********************************************************* //
*/

// ********************** USER ROUTES ********************** \\
app.get("/session_info", (req, res) => {
  if (!req.session) return res.status(400).send('no active session');
  res.json({
    session: req.session,
  });
});

app.post("/users/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // check if a user with that email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "signup failed: email already in use" });
  }

  // if the email address is available, try to create a new user
  try {
    let newUser = await User.create({
      username,
      email,
      password,
    });
    console.log(newUser);
  } catch (error) {
    console.error("SIGNUP ERROR: ", error);
    res.json(error);
  }
  res.status(201).json({ message: "User created successfully" });
});

app.put("/users/login", async (req, res, next) => {
  passport.authenticate("local", (error, user, message) => {
    console.log("message from passport config: ", message);
    if (error) throw error;
    if (!user) {
      res.json({
        message: "login failed: email or password incorrect",
        user: false,
      });
    } else {
      req.logIn(user, (error) => {
        if (error) throw error;
        res.json({
          message: "successfully authenticated",
        });
      });
    }
  })(req, res, next);
});

app.post("/logout", function (req, res, next) {
  try {
    req.logOut(function (err) {
      if (err) {
        return next(err);
      }
    });
  } catch (error) {
    console.error(error);
  }
  res.json("logout successful");
});

app.post("/save_recipe", async (req, res) => {
  // get logged-in user's id
  const userId = req.session.passport.user._id;
  console.log("logged-in user's id: ", userId);

  // get `recipeData`
  console.log("req.body: ", req.body);
  const recipeData = req.body;

  const recipe = await Recipe.findOneAndUpdate(
    { idMeal: recipeData.idMeal },
    { ...recipeData },
    { upsert: true, new: true, runValidators: true }
  );

  // add recipe to user's `savedRecipes` array in mongodb
  let dbResponse = await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { savedRecipes: recipe } }
  );
  console.log("dbResponse from saving recipe: ", dbResponse);
  res.json("recipe saved!");
});

app.delete("/remove_saved_recipe", async (req, res) => {
  // get logged-in user's id
  const userId = req.session.passport.user._id;
  console.log("logged-in user's id: ", userId);

  // get clicked recipe's id
  console.log("req.body: ", req.body);
  const recipe_id = req.body.id;
  console.log("recipe_id: ", recipe_id);

  // remove recipe from user's `savedRecipes` array in mongodb
  let dbResponse = await User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { savedRecipes: recipe_id } }
  );
  console.log("dbResponse from saving recipe: ", dbResponse);
  res.json("recipe removed");
});

// ****************** API REQUEST ROUTES ****************** \\
const baseURL = "http://www.themealdb.com/api/json/v1/1/";

app.get(`/get_random_recipe`, async (req, res) => {
  const apiResponse = await axios.get(`${baseURL}/random.php`);
  console.log(apiResponse.data);
  res.json(apiResponse.data);
});

app.get(`/search_recipes`, async (req, res) => {
  const config = { params: req.query };
  console.log("axios config for /search_recipes ", config);

  const apiResponse = await axios.get(`${baseURL}/search.php`, config);
  console.log("apiResponse.data for /get_recipe_details ", apiResponse.data);

  res.json(apiResponse.data);
});

app.get(`/filter_recipes`, async (req, res) => {
  const i = req.query.i;
  const c = req.query.c;
  const a = req.query.a;

  const apiResponse = await axios.get(
    `${baseURL}/filter.php?${i ? `i=${i}` : ""}&${c ? `c=${c}` : ""}&${
      a ? `a=${a}` : ""
    }`
  );

  console.log("API Response: ", apiResponse.data);

  res.json(apiResponse.data);
});

app.get(`/get_recipe_details`, async (req, res) => {
  const config = { params: req.query };
  console.log("axios config for /get_recipe_details ", config);

  const apiResponse = await axios.get(
    `http://www.themealdb.com/api/json/v1/1/lookup.php?`,
    config
  );
  console.log("apiResponse.data for /get_recipe_details ", apiResponse.data);

  res.json(apiResponse.data);
});

// ***** MONGODB CRUD ROUTES for user-created recipes ***** \\
// FUTURE WORK

// *********** CATCH-ALL ROUTE for get requests *********** \\
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// tell server where to listen -> not 3000 as React listens there
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
