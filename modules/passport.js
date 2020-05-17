let passport = require("passport");
let githubStrategy = require("passport-github").Strategy;
let Register = require("../models/register");
let facebookStrategy = require("passport-facebook").Strategy;

// GitHub login.
passport.use(
  new githubStrategy(
    // Configuration object.
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    // callback function containing all the data coming from the server.

    (accessToken, refreshToken, profile, done) => {
      // Check whether user exists.
      var newUser = {
        email: profile.emails[0].value,
        username: profile._json.login,
        password: "password",
      };

      Register.findOne({ email: profile.emails[0].value }, (err, user) => {
        // console.log(user, 'hello');
        if (err) return done(null, false);
        if (!user) {
          Register.create(newUser, (err, user) => {
            // console.log(user, 'this is something new...')
            console.log(user, "new user");
            done(null, user);
          });
        } else {
          console.log(user, "we are end");
          done(null, user);
        }
      });
    }
  )
);

// serializer.
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// deserializer
passport.deserializeUser((id, done) => {
  var user = { email: "mayank@gmail.com", username: "mayank" };
  // console.log(user, 'this is found data...')
  done(null, user);
});

// Facebook login.
passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "email",
        "first_name",
        "middle_name",
        "last_name",
      ],
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile._json.email, "profile shown");

      let fbUser = {
        email: profile._json.email,
        username: profile.displayName,
      };

      console.log(fbUser, "user from facebook.");

      Register.findOne({ username: fbUser.username }, (err, findUser) => {
        console.log(findUser, "user was here...");

        if (err) {
          console.log(err, "error here");
        }

        if (!findUser) {
          console.log(fbUser, "user not found..");
          Register.create(fbUser, (err, newUser) => {

            console.log(newUser, "user is created...");

            cb(null, newUser);
          });
        } else return cb(null, findUser);
      });
    }
  )
);

// serialize session.
passport.serializeUser((user,done) => {
  console.log(user, 'user serialized');
  done(null,user);
})