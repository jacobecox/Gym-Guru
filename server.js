import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import getAPICategories from './routes/getAPICategories.js'
import getAllExercises from './routes/getAPIAllExercises.js'
import getCategories from './routes/getCategories.js'

const app = express();  

dotenv.config();


app.use(express.json());

app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', getAPICategories)
app.use('/api', getAllExercises)
app.use(getCategories)

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});
