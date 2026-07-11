const Booking = require("../models/Booking");
const Car = require("../models/Car");
const mongoose = require("mongoose");
const allowedBookingStatuses = ["Pending", "Confirmed", "Started", "Completed", "Cancelled"];

const bookCab = async (req, res, next) => {
    try {
        const { carId, pickupLocation, dropLocation, pickupDate, totalFare } = req.body;

        if (!carId || !pickupLocation || !dropLocation || !pickupDate || totalFare === undefined) {
            return res.status(400).json({ success: false, message: "All booking fields are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({ success: false, message: "Invalid car ID" });
        }

        const pickupTimestamp = new Date(pickupDate);
        if (Number.isNaN(pickupTimestamp.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid pickup date" });
        }

        const parsedFare = Number(totalFare);
        if (!Number.isFinite(parsedFare) || parsedFare <= 0) {
            return res.status(400).json({ success: false, message: "Total fare must be greater than 0" });
        }

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        if (!car.availability) {
            return res.status(400).json({ success: false, message: "Selected cab is not available" });
        }

        const booking = await Booking.create({
            user: req.user._id,
            car: carId,
            pickupLocation: pickupLocation.trim(),
            dropLocation: dropLocation.trim(),
            pickupDate: pickupTimestamp,
            totalFare: parsedFare,
        });

        res.status(201).json({ success: true, message: "Cab booked successfully", data: booking });
    } catch (error) {
        next(error);
    }
};

const getUserBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate("car").sort({ createdAt: -1 });
        res.json({ success: true, data: bookings });
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

const updateBookingStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!allowedBookingStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid booking status" });
        }

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { bookingStatus: status },
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.json({ success: true, message: "Booking status updated successfully", data: booking });
    } catch (error) {
        next(error);
    }
};

const cancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if (req.user.role !== "admin" && booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not allowed to cancel this booking" });
        }

        booking.bookingStatus = "Cancelled";
        const updatedBooking = await booking.save();

        res.json({ success: true, message: "Booking cancelled successfully", data: updatedBooking });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    bookCab,
    getUserBookings,
    getAllBookings,
    updateBookingStatus,
    cancelBooking,
};