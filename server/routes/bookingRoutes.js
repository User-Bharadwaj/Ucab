const express = require("express");
const {
    bookCab,
    getUserBookings,
    getAllBookings,
    updateBookingStatus,
    cancelBooking,
} = require("../controllers/bookingController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, bookCab);
router.get("/my", protect, getUserBookings);
router.get("/", protect, adminOnly, getAllBookings);
router.patch("/:id/status", protect, adminOnly, updateBookingStatus);
router.delete("/:id", protect, cancelBooking);

module.exports = router;