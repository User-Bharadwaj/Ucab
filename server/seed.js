const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const connectDB = require("./db/config");
const Admin = require("./models/Admin");
const Car = require("./models/Car");

const adminSeed = {
  fullName: "UCab Admin",
  email: "admin@ucab.com",
  password: "Admin@1234",
  phone: "",
  profileImage: "",
  role: "admin",
};

const carSeeds = [
  {
    carName: "Mini Express",
    carModel: "Mini Hatch",
    vehicleNumber: "UCAB-MINI-001",
    category: "Mini",
    seats: 4,
    pricePerKm: 12,
    driverName: "Arun Kumar",
    driverPhone: "9000000001",
    availability: true,
  },
  {
    carName: "City Sedan",
    carModel: "Sedan Comfort",
    vehicleNumber: "UCAB-SEDAN-001",
    category: "Sedan",
    seats: 4,
    pricePerKm: 18,
    driverName: "Bala Singh",
    driverPhone: "9000000002",
    availability: true,
  },
  {
    carName: "Family SUV",
    carModel: "SUV Plus",
    vehicleNumber: "UCAB-SUV-001",
    category: "SUV",
    seats: 6,
    pricePerKm: 24,
    driverName: "Chandru Raj",
    driverPhone: "9000000003",
    availability: true,
  },
];

const seedAdmin = async () => {
  const existingAdmin = await Admin.findOne({ email: adminSeed.email });

  if (existingAdmin) {
    return { action: "skipped", model: "Admin", key: adminSeed.email };
  }

  const hashedPassword = await bcrypt.hash(adminSeed.password, 10);

  await Admin.create({
    ...adminSeed,
    password: hashedPassword,
  });

  return { action: "inserted", model: "Admin", key: adminSeed.email };
};

const seedCars = async () => {
  const results = [];

  for (const carSeed of carSeeds) {
    const existingCar = await Car.findOne({ vehicleNumber: carSeed.vehicleNumber });

    if (existingCar) {
      results.push({ action: "skipped", model: "Car", key: carSeed.vehicleNumber });
      continue;
    }

    await Car.create(carSeed);
    results.push({ action: "inserted", model: "Car", key: carSeed.vehicleNumber });
  }

  return results;
};

const run = async () => {
  try {
    await connectDB();

    const adminResult = await seedAdmin();
    const carResults = await seedCars();

    const insertedCars = carResults.filter((result) => result.action === "inserted").length;
    const skippedCars = carResults.filter((result) => result.action === "skipped").length;

    console.log(`Admin ${adminResult.action}: ${adminResult.key}`);
    console.log(`Cars inserted: ${insertedCars}`);
    console.log(`Cars skipped: ${skippedCars}`);
    console.log("Seed completed successfully.");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

run();