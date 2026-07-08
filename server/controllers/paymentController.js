const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

const createPayment = async (req, res, next) => {
    try {
        const { bookingId, amount, paymentMethod, transactionId } = req.body;

        if (!bookingId || amount === undefined || !paymentMethod) {
            return res.status(400).json({ success: false, message: "bookingId, amount, and paymentMethod are required" });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        const payment = await Payment.create({
            booking: bookingId,
            user: req.user._id,
            amount,
            paymentMethod,
            transactionId: transactionId || "",
            paymentStatus: "Completed",
        });

        booking.paymentStatus = "Paid";
        await booking.save();

        res.status(201).json({ success: true, message: "Payment created successfully", data: payment });
    } catch (error) {
        next(error);
    }
};

const getPaymentDetails = async (req, res, next) => {
    try {
        const payment = await Payment.findById(req.params.id).populate("booking").populate("user");

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        if (req.user.role !== "admin" && payment.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not allowed to view this payment" });
        }

        res.json({ success: true, data: payment });
    } catch (error) {
        next(error);
    }
};

const getPaymentHistory = async (req, res, next) => {
    try {
        const payments = await Payment.find({ user: req.user._id }).populate("booking").sort({ createdAt: -1 });
        res.json({ success: true, data: payments });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPayment,
    getPaymentDetails,
    getPaymentHistory,
};