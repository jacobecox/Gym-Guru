// Dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import keys from './config/keys.js';
import './services/passport';
// Routes
import getAPICategories from './routes/getAPICategories.js'
import getAllAPIExercises from './routes/getAPIAllExercises.js'
import getCategories from './routes/getCategories.js'
import getAllExercises from './routes/getAllExercises.js'

const app = express();  

dotenv.config();


app.use(express.json());

app.use(cors());

app.use(passport.initialize());

const port = process.env.PORT || 8000;

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

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

app.use('/api', getAPICategories)
app.use('/api', getAllAPIExercises)
app.use(getCategories)
app.use(getAllExercises)  
