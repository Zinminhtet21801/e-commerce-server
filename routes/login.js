const express = require("express");
const router = express.Router();
// const User = require("../config/mongoose")
const bcrypt = require("bcryptjs");
const passport = require("passport");
const salt = bcrypt.genSaltSync(10);
const cookie = require("cookie");

router.post("/login", (req, res, next) => {
  const { rememberMe } = req.body;
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      throw err;
    }
    if (info.includes("Mail")) {
      console.log("mail");
      res.send("error|Incorrect Mail!");
      return;
    } else if (info.includes("Password")) {
      console.log("password");
      res.send("error|Incorrect Password!");
      return;
    }
    if (!user) {
      res.send("No user exists");
      return;
    } else {
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
        rememberMe &&
          res.cookie("rememberMe", user.id, {
            maxAge: 24 * 30 * 365 * 9000,
            path : "/",
            encode : String
          });
        res.send("success|Login Successful!");
      });
    }
  })(req, res, next);
});

module.exports = router;
