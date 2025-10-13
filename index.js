import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
dbConnect();

const app = express();

// ✅ Correct CORS setup
app.use(cors({
  origin: 'https://my-playgo-frontend-6za9wlpph-shriharinis-projects.vercel.app/ ',
  credentials: true
}));

// ✅ Parse JSON body
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/bookings", bookingRoutes);

// ✅ Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
