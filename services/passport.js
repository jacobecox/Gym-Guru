import passport from "passport";
import User from "../models/user.js";
import { ExtractJwt, Strategy } from "passport-jwt";
import LocalStrategy from "passport-local";
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import keys from "../config/keys.js";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(null, user);
  });
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
    },
    (profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record!
          new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Passport expects username field to be a username, we are specifying the username field to be either email or username
const localOptions = { usernameField: 'login' };

const localLogin = new LocalStrategy(localOptions, async (login, password, done) => {  
  // Verify this email and password, call done with the user
	// if it is the correct email and password
	// otherwise, call done with false
  try{
  const user = await User.findOne({
    $or: [{ email: login }, { username: login }],
  })
    if (!user) {
      return done(null, false)
    }
    if (!user.validPassword(password)) {
      return done(null, false, {message: 'Incorrect password'})
    }
    return done(null, user)
  } catch(err) {
    return done(err, false)
  };
});

// Retrieve token from header and use token secret to verify jwt
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.TOKEN_SECRET,
};

// Create JWT Strategy
const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call done without a user object
    try {
      const user = await User.findById(payload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  });

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin); 