import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const SALT_ROUNDS = 10;

// REGISTER
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await UserModel.create({
            username,
            email,
            passwordHash,
        });

        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (err) {
        next(err);
    }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email & password required" });
        }

        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (err) {
        next(err);
    }
};

// GET ME
export const getMe = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { password_hash, ...userInfo } = user;
        res.json(userInfo);
    } catch (err) {
        next(err);
    }
};

// GOOGLE AUTH INITIAL REDIRECT
export const googleAuth = (req, res) => {
    res.json({
        message: "Redirecting to Google...",
        note: "To make this functional, we need Google OAuth Credentials (Client ID & Secret)."
    });
};

