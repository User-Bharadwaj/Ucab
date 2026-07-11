const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sanitizeUser = (user) => ({
    id: user._id,
    name: user.fullName,
    email: user.email,
    phone: user.phone,
    profileImage: user.profileImage,
    role: user.role,
});

const registerUser = async (req, res, next) => {
    try {
        const { fullName, name, email, password, phone = "" } = req.body;
        const userFullName = (fullName || name || "").trim();
        const normalizedEmail = (email || "").trim().toLowerCase();

        if (!userFullName || !normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Full name, email, and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName: userFullName,
            email: normalizedEmail,
            password: hashedPassword,
            phone: String(phone).trim(),
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = (email || "").trim().toLowerCase();

        if (!normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        return res.json({
            success: true,
            message: "Login successful",
            token: generateToken(user._id, user.role),
            data: sanitizeUser(user),
        });
    } catch (error) {
        next(error);
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        return res.json({
            success: true,
            data: sanitizeUser(req.user),
        });
    } catch (error) {
        next(error);
    }
};

const updateUserProfile = async (req, res, next) => {
    try {
        const { name, email, password, phone, profileImage } = req.body;

        if (name !== undefined) req.user.fullName = name.trim();
        if (email !== undefined) req.user.email = email.trim().toLowerCase();
        if (phone !== undefined) req.user.phone = String(phone).trim();
        if (profileImage !== undefined) req.user.profileImage = profileImage;
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Password must be at least 6 characters",
                });
            }

            req.user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await req.user.save();

        return res.json({
            success: true,
            message: "Profile updated successfully",
            data: sanitizeUser(updatedUser),
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (req.user.role !== "admin" && req.user._id.toString() !== id) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to delete this user",
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
};
