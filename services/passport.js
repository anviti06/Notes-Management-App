const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

const fun = async () => {
  console.log('-->fun() called');

  const data = await new User({ googleId: 'anshika', displayName: 'anshika' })
  console.log('before save:', data)
  data.save()
    .then(doc => {
      console.log('after save:', doc)
    })
    .catch(err => {
      console.log('error after save:', err)
    });
  // const user = await User.findById('5d32b3a01c9d440000c09c8e');
  // console.log("user=", user);

}
// fun();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/callback',
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile here:", profile._json.email);
      const response = await User.findOne({ googleId: profile.id });
      if (response) {
        console.log('user existing')
        done(null, response);
      } else {
        console.log('user does not exist');
        const data = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile._json.email
        });
        data.save()
          .then(doc => {
            console.log('after save:', doc)
            done(null, doc);
          })
          .catch(err => {
            console.log(err)
          });
      }
    }));
