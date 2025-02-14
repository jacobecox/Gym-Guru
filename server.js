// Dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import keys from './config/keys.js';
import cookieSession from 'cookie-session';
import './services/passport.js';

// Routes
import Authentication from "./controllers/authentication.js"
import getAPICategories from './routes/getAPICategories.js'
import getAllAPIExercises from './routes/getAPIAllExercises.js'
import getCategories from './routes/getCategories.js'
import getAllExercises from './routes/getAllExercises.js'
import { googleAuth } from './services/passport.js';

const app = express();  

dotenv.config();

app.use(express.json());

app.use(cors());

app.use(passport.initialize());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["helloworld"],
  })
);

const port = process.env.PORT || 8000;

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

mongoose
	.connect(keys.MONGO_URI)
	.then(() => {
		console.log('🚀 DB Connected!');
		app.listen(port, () => {
			console.log('😎 Server listening on:', port);
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
app.post('/auth/login', requireLogin,  Authentication.login);
app.post('/auth/create-account', Authentication.createAccount);
app.get('/auth/current-user', requireAuth, Authentication.currentUser);

// Google login and logout routes
app.get("/auth/google", googleAuth);
app.get("/auth/google/callback", googleAuth, (req, res) => {
  res.send("You are logged in via Google!");
});
// app.get("/api/current_user", (req, res) => {
//   res.send(req.user);
// });
// app.get("/api/logout", (req, res) => {
//   req.logout();
//   res.send(req.user);
// });