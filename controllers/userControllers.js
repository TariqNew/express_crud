import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/userSchema.js";
import dotenv from "dotenv"

dotenv.config()

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email
    });
});

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "15m" }
        );

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc    Get current user
// @route   GET /api/users/current
// @access  Private 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


export default {
    registerUser,
    loginUser,
    currentUser
};
