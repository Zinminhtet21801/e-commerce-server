const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash")
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  console.log(id, done.toString());
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

// passport.use(new LocalStrategy(function(gmail, password, done){
//   console.log(gmail);
//   User.findOne({gmail : gmail},function(err,user){
//     if(err){
//       return done(err)
//     }
//     if (!user) {
//       return done(null, false, { message: 'Incorrect username.' });
//     }
//     if (!user.validPassword(password)) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }
//     return done(null,user)
//   })
// }))

passport.use(
  new LocalStrategy(function (gmail, password, done) {
    User.findOne({ gmail: gmail }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect Mail" });
      }
      if (!(password === user.password)) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user, { message: "Signed In Successfully" });
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

// app.post("/login", (req, res) => {
//   // console.log(req.body);
//   const { gmail, password } = req.body;
//   User.findOne({ gmail: gmail }, (err, result) => {
//     if (!result) {
//       res.redirect("http://localhost:3000/login");
//     } else {
//       if(password === result.password){
//         res.cookie(`MyAccount`,{gmail : gmail, password : password, maxAge : new Date().getTime() + (24*60*60*1000)} )
//         res.redirect("http://localhost:3000");
//       }else{
//         res.redirect("http://localhost:3000/login");
//       }
//     }
//   });
// });

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "http://localhost:3000/login",
    successRedirect: "http://localhost:3000/",
    failureFlash: true,
    successFlash : "Welcome"
  })
);

// app.get('/flash', function(req, res){
//   // Set a flash message by passing the key, followed by the value, to req.flash().
//   req.flash('info', 'Flash is back!')
//   res.redirect('/');
// });

// app.get("/",function(req,res){
//   res.send(req.flash("message"))
// })

app.listen(PORT, (e) => {
  e
    ? console.log(`Something went wrong`)
    : console.log(`Server is running on port ${PORT}...`);
});
