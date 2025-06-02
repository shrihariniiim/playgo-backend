
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res) => {
    const { email, password, role, name } = req.body;
    try {
        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            name
        });
        await newUser.save();
        res.status(201).json({ message: `User registered successfully ${email}` });
    } catch (error) {

        res.status(500).json({ message: `Error registering user1, ${email}`, error: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: `User not found, ${email}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: `Invalid password for user, ${email}` });
    }

    try {
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        res.status(200).json({
            message: `User logged in successfully, ${email}`,
            token,
            role: user.role,
            name: user.name,
            email: user.email,
            karma: user.karma,
            id: user._id
        });
    } catch (error) {
        res.status(500).json({
            message: `Error logging in user, ${email}`,
            error: error.message,
        });
    }
};