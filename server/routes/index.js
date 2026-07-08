const express = require("express");

const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const carRoutes = require("./carRoutes");
const bookingRoutes = require("./bookingRoutes");
const paymentRoutes = require("./paymentRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/cars", carRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);

module.exports = router;
