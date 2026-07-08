const express = require("express");
const {
    loginAdmin,
    getDashboardStats,
    getAllUsers,
    getAllBookings,
    getAllCars,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/dashboard", protect, adminOnly, getDashboardStats);
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/bookings", protect, adminOnly, getAllBookings);
router.get("/cars", protect, adminOnly, getAllCars);

module.exports = router;