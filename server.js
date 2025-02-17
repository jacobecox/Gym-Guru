// Dependencies
import express from 'express';
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import keys from './config/keys.js';
import User from './models/user.js';
import session from "express-session";
import GoogleStrategy from 'passport-google-oauth20';
import './services/passport.js';

// Routes
import Authentication from "./controllers/authentication.js"
import getAPICategories from './routes/getAPICategories.js'
import getAllAPIExercises from './routes/getAPIAllExercises.js'
import getCategories from './routes/getCategories.js'
import getAllExercises from './routes/getAllExercises.js'
import postSavedExercises from './routes/postSavedExercises.js'

const app = express();  
dotenv.config({ path: ".env.development.local" });

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const BASE_URL = process.env.NEXT_PUBLIC_FRONT_BASE_URL;

app.use(express.json());
app.use(cors({
	origin: BASE_URL,	
	credentials: true,
}));

// Storing sessions inside db used
app.use(
  session({
    secret: "passkeysecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Google Oauth functionality. We send client details through link which reroutes user to Google to login. Google returns via callback route with user's data
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }
				// Create new user with google id if one doesn't exist
        const newUser = await new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        }).save();

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"] })

// Handles when google send user back with data. We store user data with token in url params to be sent back when redirected to our success page
const handleAuthRedirect = (req, res) => {
  if (req.isAuthenticated()) {
    const user = {
      email: req.user.email,
      username: req.user.username,
      token: Authentication.userToken(req.user),
    };

    res.redirect(`${BASE_URL}/pages/login-success?token=${user.token}`);
  } else {
    res.redirect(`${BASE_URL}/pages/login?error=auth_failed`);
  }
};

const port = process.env.PORT || 8080;

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

mongoose
	.connect(keys.MONGO_URI)
	.then(() => {
		console.log('🚀 DB Connected!');
		app.listen(port, () => {
			console.log('😎 Server listening on PORT', port);
		});
	})
	.catch((err) => {
		console.log(`❌ DB Connection Error: ${err.message}`);
	});

// Non-login required routes
app.use('/api', getAPICategories)
app.use('/api', getAllAPIExercises)
app.use(getCategories)
app.use(getAllExercises)

// Login required routes
app.post('/auth/login', requireLogin, Authentication.login);
app.post('/auth/create-account', Authentication.createAccount);
app.get('/auth/current-user', requireAuth, Authentication.currentUser);
app.use(postSavedExercises)

// Google login and logout routes
app.get("/auth/google", googleAuth);
app.get("/auth/google/callback", googleAuth, handleAuthRedirect)