const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const PORT = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true)
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
mongoose.connect(
  "mongodb+srv://admin:admin@e-commerce.13she.mongodb.net/e-commercedb"
);

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  comfirmPassword: {
    required: true,
    type: String,
  },
  gmail: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  postal: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
});

const User = mongoose.model("user", UserSchema);

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ gmail: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, "Incorrect Mail");
        // return done(null, false);
      }
      if (password !== user.password) {
        return done(null, false, "Incorrect Password");
        // return done(null, false);
      }
      return done(null, user, "Signed In Successfully");
      // return done(null, user);
    });
  })
);

app.get("/users", (req, res) => {
  User.find({}, (err, result) => {
    res.json(result);
  });
});

app.get("/users/:name", (req, res) => {
  const name = req.params.name;
  User.findOne({ name: name }, (err, result) => {
    res.json(result);
  });
});

app.post("/signup", (req, res) => {
  // console.log(req.body);
  const {
    name,
    gmail,
    password,
    confirmPassword,
    phone,
    city,
    postal,
    address,
  } = req.body;
  const user = new User({
    name: name,
    gmail: gmail,
    password: password,
    comfirmPassword: confirmPassword,
    phone: phone,
    city: city,
    postal: postal,
    address: address,
  });
  user.save();
  res.redirect("http://localhost:3000");
});

app.post("/login", (req, res, next) => {
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

app.listen(PORT, (e) => {
  e
    ? console.log(`Something went wrong`)
    : console.log(`Server is running on port ${PORT}...`);
});
