import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js'; // <-- Add .js extension
import authRoutes from './routes/authRoutes.js'; // <-- Add .js extension
import userRoutes from './routes/userRoutes.js'; // <-- Add .js extension
import locationRoutes from './routes/locationRoutes.js'; // <-- Add .js extension
import bookingRoutes from "./routes/bookingRoutes.js";
dotenv.config();

dbConnect();
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'https://my-playgo-frontend.vercel.app', // Replace with your frontend URL
}));

// Middleware
app.use(json());

// Routes
// (Add your route imports and app.use() here)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.use("/api/locations", locationRoutes);
app.use("/api/bookings", bookingRoutes);



// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});