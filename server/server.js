const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");

const connectDB = require("./db/config");
const apiRoutes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
].filter(Boolean);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const corsError = new Error("Not allowed by CORS");
      corsError.status = 403;
      return callback(corsError);
    },
    credentials: true,
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("UCab Backend Running");
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API Routes
app.use("/api", apiRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};

startServer();