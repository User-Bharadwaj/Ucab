const Car = require("../models/Car");

const createCar = async (req, res, next) => {
    try {
        const car = await Car.create(req.body);
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
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

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