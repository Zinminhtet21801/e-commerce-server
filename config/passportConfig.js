const User = require("./mongoose")
const bcryptjs = require("bcryptjs")
const LocalStrategy = require("passport-local").Strategy
module.exports = function (passport){
    passport.use(
        new LocalStrategy({ username: 'gmail' }, (gmail, password, done) => {
          User.findOne({ gmail: gmail }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, "Incorrect Mail");
              // return done(null, false);
            }
            if (!bcryptjs.compare(password, user.password)) {
              return done(null, false, "Incorrect Password");
              // return done(null, false);
            }
            return done(null, user, "Signed In Successfully");
            // return done(null, user);
          });
        })
      );

      passport.serializeUser(function (user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });
}