// src/app.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/userRoutes';
import connectDB from './config/database';


const app = express();

// Connect to the database
connectDB()

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('Auth service is running');
});

export default app;
