const express = require("express")
const router = express.Router()
// const User = require("../config/mongoose")
const bcrypt = require("bcryptjs")
const passport = require("passport");

router.post("/", (req, res, next) => {
    console.log(req.body);
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.log(err);
        throw err;
      }
      if (info.includes("Mail")) {
        console.log("mail");
        res.send("error|Incorrect Mail!");
        return ;
      } else if (info.includes("Password")) {
        console.log("password");
        res.send("error|Incorrect Password!");
        return ;
      }
      if (!user) {
        res.send("No user exists");
        return ;
      } else {
        req.logIn(user, (err) => {
          if (err) {
            console.log(err);
            throw err;
          }
          // console.log(req.user);
          res.send("Success|Login Successful!");
        });
      }
    })(req, res, next);
  });

  module.exports = router