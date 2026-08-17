const express = require("express");

const {
  getRefunds,
  getRefundById,
  createRefund,
  updateRefund,
  deleteRefund,
  getRefundStats
} = require("../controllers/refundController");

const router = express.Router();

// Statistics
router.get("/stats", getRefundStats);

// Get all refunds
router.get("/", getRefunds);

// Get single refund
router.get("/:id", getRefundById);

// Create refund
router.post("/", createRefund);

// Update refund
router.put("/:id", updateRefund);

// Delete refund
router.delete("/:id", deleteRefund);

module.exports = router;