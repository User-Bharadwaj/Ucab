const express = require("express");
const {
    createPayment,
    getPaymentDetails,
    getPaymentHistory,
} = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/history", protect, getPaymentHistory);
router.post("/", protect, createPayment);
router.get("/:id", protect, getPaymentDetails);

module.exports = router;