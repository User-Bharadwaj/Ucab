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
        const userFullName = fullName || name;

        if (!userFullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Full name, email, and password are required",
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName: userFullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone,
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

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

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

        if (name !== undefined) req.user.fullName = name;
        if (email !== undefined) req.user.email = email.toLowerCase();
        if (phone !== undefined) req.user.phone = phone;
        if (profileImage !== undefined) req.user.profileImage = profileImage;
        if (password) req.user.password = await bcrypt.hash(password, 10);

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
