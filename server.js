const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/signup", require("./routes/signup"));
app.use("/", require("./routes/login"));
app.use("/users", require("./routes/users"));
app.use("/logout", require("./routes/logout"));

mongoose.connect(
  "mongodb+srv://admin:admin@e-commerce.13she.mongodb.net/e-commercedb"
);

const User = require("./config/mongoose");
require("./config/passportConfig")(passport);


app.listen(PORT, (e) => {
  e
    ? console.log(`Something went wrong`)
    : console.log(`Server is running on port ${PORT}...`);
});
