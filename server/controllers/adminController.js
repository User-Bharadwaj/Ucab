const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Car = require("../models/Car");

const generateToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sanitizeAdmin = (admin) => ({
    id: admin._id,
    name: admin.fullName,
    email: admin.email,
    phone: admin.phone,
    profileImage: admin.profileImage,
    role: admin.role,
});

const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() });

        if (!admin) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const passwordMatches = await bcrypt.compare(password, admin.password);
        if (!passwordMatches) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        return res.json({
            success: true,
            message: "Admin login successful",
            token: generateToken(admin._id, admin.role),
            data: sanitizeAdmin(admin),
        });
    } catch (error) {
        next(error);
    }
};

const getDashboardStats = async (req, res, next) => {
    try {
        const [users, bookings, cars] = await Promise.all([
            User.countDocuments(),
            Booking.countDocuments(),
            Car.countDocuments(),
        ]);

        return res.json({
            success: true,
            data: { users, bookings, cars },
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find().populate("user").populate("car").sort({ createdAt: -1 });
        res.json({ success: true, data: bookings });
    } catch (error) {
        next(error);
    }
};

const getAllCars = async (req, res, next) => {
    try {
        const cars = await Car.find().sort({ createdAt: -1 });
        res.json({ success: true, data: cars });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginAdmin,
    getDashboardStats,
    getAllUsers,
    getAllBookings,
    getAllCars,
};