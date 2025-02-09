import passport from "passport";
import User from "../models/user.js";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import LocalStrategy from "passport-local";
import keys from "../config/keys.js";

// Passport expects username field to be a username, we are specifying the username field to be an email
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify this email and password, call done with the user
	// if it is the correct email and password
	// otherwise, call done with false
  User.findOne({ email })
  .then((user) => {
    if (!user) {
      return done(null, false)
    }
    if (!user.validPassword(password)) {
      return done(null, false, {message: 'Incorrect password'})
    }
    return done(null, user)
  })
  .catch((err) => {
    return done(err)
  });
});

// Retrieve token from header and use token secret to verify jwt
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.TOKEN_SECRET,
};

// Create JWT strategy
const jwtLogin = new Strategy(jwtOptions, function (payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that other
	// otherwise, call done without a user object

	User.findById(payload.sub).then((user) => {
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);