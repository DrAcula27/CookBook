// passport (et. al.) use "strategies" to enable user login
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export default async function initializePassport(passport) {
  // 1. use the local strategy - email/password checking
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // check if user exists with this email
        const user = await User.findOne({ email: email }).populate(
          "savedRecipes"
        );
        if (!user) {
          return done(null, false, { message: "email or password incorrect" });
        }
        // if yes, check passwords match
        bcrypt.compare(password, user.password, (error, isMatch) => {
          if (error) throw error;
          if (isMatch) {
            // if yes, return user
            return done(null, user, {
              message: "Found user - passwords match",
            });
          } else {
            return done(null, false, {
              message: "email or password incorrect",
            });
          }
        });
      }
    )
  );
  // 2. add serialize function to passport library - place user in a session
  // callback function: a function that runs after another function, or at a specific trigger
  passport.serializeUser((user, callBackFunc) => {
    callBackFunc(null, user);
  });
  // 3. add deserialize function to passport library - take user out of session
  passport.deserializeUser(async (id, callBackFunc) => {
    return callBackFunc(null, await User.findById(id));
  });
};
