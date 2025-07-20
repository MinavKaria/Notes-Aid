import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectToDb from './config/db.js';
import leaderboardRoutes from './routes/leaderboard.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// Database connection
connectToDb();

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Add your frontend URLs
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/leaderboard', leaderboardRoutes);

app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Leaderboard API is running!',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});