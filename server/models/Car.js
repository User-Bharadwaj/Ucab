const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        carName: {
            type: String,
            required: true,
        },

        carModel: {
            type: String,
            required: true,
        },

        vehicleNumber: {
            type: String,
            required: true,
            unique: true,
        },

        category: {
            type: String,
            enum: ["Mini", "Sedan", "SUV", "Luxury"],
            required: true,
        },

        seats: {
            type: Number,
            required: true,
        },

        pricePerKm: {
            type: Number,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        driverName: {
            type: String,
            required: true,
        },

        driverPhone: {
            type: String,
            required: true,
        },

        availability: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.Car || mongoose.model("Car", carSchema);