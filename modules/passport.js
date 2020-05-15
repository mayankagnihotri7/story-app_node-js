let passport = require('passport');
let githubStrategy = require('passport-github').Strategy;
let Register = require('../models/register');

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
      username: profile.displayName,
      password: 'password'
    }

    Register.findOne({email: profile.emails[0].value}, (err, user) => {
      console.log(user, 'hello');
      if (err) return done(err);
      if (!user) {
        Register.create(newUser, (err, user) => {
          console.log(user, 'this is something new...');
          return done(null, user);
        })
      } return done(null, user);
    })

    }
  )
);

// serializer.
passport.serializeUser((user, done) => {
    console.log(user._id, 'This is username!');
    done(null, user._id);
})

// deserializer
passport.deserializeUser((username,done) => {
  Register.findById(username, (err, user) => {
    if (err) return done(err);
  return done (null, user);
  })
})