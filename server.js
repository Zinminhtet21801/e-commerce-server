const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5000;
require("./config/passportConfig")(passport)

// middlewares 
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// routes 
app.use('/api/users', require('./routes/users'))

app.use('/signup', require('./routes/signup'))

app.use("/login", require("./routes/login"))

app.use("/logout", require("./routes/logout"))

app.use('/update', require('./routes/update'))

app.listen(PORT, (e) => {
  e
    ? console.log(`Something went wrong`)
    : console.log(`Server is running on port ${PORT}...`);
});
