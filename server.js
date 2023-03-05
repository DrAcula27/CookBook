const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const axios = require("axios");
// const bcrypt = require("bcrypt");

const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./config/passport-config");

require("dotenv").config();
require("./config/database.js");

const User = require("./models/user");

const PORT = 5000;

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

// serve build folder
app.use(express.static(path.join(__dirname, "build")));

// ********************************************************* \\
// ************************* ROUTES ************************ \\
// ********************************************************* \\

app.get("/session_info", (req, res) => {
  res.json({
    session: req.session,
  });
});

app.post("/users/signup", async (req, res) => {
  // hash password so it isn't stored as plain text
  // let hashedPassword = await bcrypt.hash(req.body.password, 10);

  // use User model to place user in database
  let userFromCollection = await User.create({
    email: req.body.email,
    username: req.body.username,
    // password: hashedPassword,
    password: req.body.password,
  });

  console.log(userFromCollection);

  res.json("user added");
});

app.put("/users/login", async (req, res, next) => {
  passport.authenticate("local", (error, user, message) => {
    console.log("message from passport config: ", message);
    if (error) throw error;
    if (!user) {
      res.json({
        message: "login failed",
        user: false,
      });
    } else {
      // add user to express session with express session's logIn method
      req.logIn(user, (error) => {
        if (error) throw error;
        res.json({
          message: "successfully authenticated",
        });
      });
    }
  })(req, res, next);
});

// ***** ASK ABOUT THIS ON MONDAY:
// FROM PASSPORT DOCS - https://www.passportjs.org/concepts/authentication/logout/
// app.post("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/home");
//   });
// });

app.get(`/get_recipes/`, async (req, res) => {
  const apiResponse = await axios.get(
    `www.themealdb.com/api/json/v1/1/random.php`
  );
  console.log(apiResponse);
  res.json(apiResponse);
});

// catch-all route for get requests, must be last in route list
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// tell server where to listen. Must not be 3000 as React listens there.
app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
