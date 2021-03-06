const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/userSchema');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (token, refreshToken, profile, done) => {
        const user = await User.findOne({ google_id: profile.id });
        if (user) {
          return done(null, user);
        }
        const newuser = new User({
          name: profile.displayName,
          avatar: profile.photos[0].value,
          google_id: profile.id,
          google_token: token,
          emails: profile.emails,
          username: profile.displayName.replace('s+', '_') + Date.now(),
        });
        await newuser.save();
        return done(null, newuser);
      }
    )
  );
};
