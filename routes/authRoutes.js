// authRoutes.js (ES Module)
import express from 'express';
import { register, login } from '../controllers/authController.js'; // Adjust the path as necessary

const router = express.Router();

// Register
router.post('/register', register);
router.post('/login', login);


export default router;
