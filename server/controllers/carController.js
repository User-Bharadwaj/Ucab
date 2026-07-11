const Car = require("../models/Car");

const normalizeCarPayload = (payload) => ({
    ...payload,
    carName: payload.carName?.trim(),
    carModel: payload.carModel?.trim(),
    vehicleNumber: payload.vehicleNumber?.trim().toUpperCase(),
    driverName: payload.driverName?.trim(),
    driverPhone: payload.driverPhone?.trim(),
    seats: Number(payload.seats),
    pricePerKm: Number(payload.pricePerKm),
});

const validateCarPayload = (payload) => {
    if (!Number.isInteger(payload.seats) || payload.seats <= 0) {
        return "Seats must be a positive whole number";
    }

    if (!Number.isFinite(payload.pricePerKm) || payload.pricePerKm <= 0) {
        return "Price per km must be greater than 0";
    }

    return null;
};

const createCar = async (req, res, next) => {
    try {
        const payload = normalizeCarPayload(req.body);
        const validationError = validateCarPayload(payload);

        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        const car = await Car.create(payload);
        res.status(201).json({ success: true, message: "Car created successfully", data: car });
    } catch (error) {
        next(error);
    }
};

const getCars = async (req, res, next) => {
    try {
        const cars = await Car.find().sort({ createdAt: -1 });
        res.json({ success: true, data: cars });
    } catch (error) {
        next(error);
    }
};

const getCarById = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        res.json({ success: true, data: car });
    } catch (error) {
        next(error);
    }
};

const updateCar = async (req, res, next) => {
    try {
        const payload = normalizeCarPayload(req.body);
        const validationError = validateCarPayload(payload);

        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        const car = await Car.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });

        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        res.json({ success: true, message: "Car updated successfully", data: car });
    } catch (error) {
        next(error);
    }
};

const deleteCar = async (req, res, next) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);

        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        res.json({ success: true, message: "Car deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCar,
    getCars,
    getCarById,
    updateCar,
    deleteCar,
};