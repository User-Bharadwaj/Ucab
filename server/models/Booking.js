const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
            required: true,
        },

        pickupLocation: {
            type: String,
            required: true,
        },

        dropLocation: {
            type: String,
            required: true,
        },

        pickupDate: {
            type: Date,
            required: true,
        },

        bookingStatus: {
            type: String,
            enum: ["Pending", "Confirmed", "Started", "Completed", "Cancelled"],
            default: "Pending",
        },

        totalFare: {
            type: Number,
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);