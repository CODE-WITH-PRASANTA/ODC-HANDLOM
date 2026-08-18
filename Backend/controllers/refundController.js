const Refund = require("../models/Refund");

// ==========================================
// GET ALL REFUNDS
// ==========================================
const getRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find().sort({ refundDate: -1 });

    res.status(200).json({
      success: true,
      count: refunds.length,
      data: refunds
    });
  } catch (error) {
    console.error("Get refunds error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch refunds",
      error: error.message
    });
  }
};

// ==========================================
// GET SINGLE REFUND
// ==========================================
const getRefundById = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id);

    if (!refund) {
      return res.status(404).json({
        success: false,
        message: "Refund not found"
      });
    }

    res.status(200).json({
      success: true,
      data: refund
    });
  } catch (error) {
    console.error("Get refund error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch refund",
      error: error.message
    });
  }
};

// ==========================================
// CREATE REFUND
// ==========================================
const createRefund = async (req, res) => {
  try {
    const {
      orderId,
      customerName,
      customerEmail,
      amount,
      reason,
      status,
      paymentMethod,
      cardLast4,
      note,
      itemName,
      itemQty,
      avatar
    } = req.body;

    if (
      !orderId ||
      !customerName ||
      !customerEmail ||
      amount === undefined ||
      !reason ||
      !itemName
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order ID, customer name, email, amount, reason and item name are required"
      });
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a valid positive number"
      });
    }

    const lastRefund = await Refund.findOne().sort({
      createdAt: -1
    });

    let nextNumber = 1001;

    if (lastRefund && lastRefund.refundId) {
      const number = parseInt(
        lastRefund.refundId.replace("#RFND-", ""),
        10
      );

      if (!Number.isNaN(number)) {
        nextNumber = number + 1;
      }
    }

    const refundId = `#RFND-${nextNumber}`;

    const refund = await Refund.create({
      refundId,
      orderId,
      customerName,
      customerEmail,
      avatar,
      amount: numericAmount,
      reason,
      status: status || "Pending",
      paymentMethod:
        paymentMethod || "Original Payment Method",
      cardLast4: cardLast4 || "9999",
      note: note || "",
      itemName,
      itemQty: Number(itemQty) || 1,
      refundDate: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Refund created successfully",
      data: refund
    });
  } catch (error) {
    console.error("Create refund error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create refund",
      error: error.message
    });
  }
};

// ==========================================
// UPDATE REFUND
// ==========================================
const updateRefund = async (req, res) => {
  try {
    const {
      orderId,
      customerName,
      customerEmail,
      amount,
      reason,
      status,
      paymentMethod,
      cardLast4,
      note,
      itemName,
      itemQty,
      avatar
    } = req.body;

    const updateData = {};

    if (orderId !== undefined) updateData.orderId = orderId;
    if (customerName !== undefined)
      updateData.customerName = customerName;
    if (customerEmail !== undefined)
      updateData.customerEmail = customerEmail;

    if (amount !== undefined) {
      const numericAmount = Number(amount);

      if (Number.isNaN(numericAmount) || numericAmount < 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be a valid number"
        });
      }

      updateData.amount = numericAmount;
    }

    if (reason !== undefined) updateData.reason = reason;
    if (status !== undefined) updateData.status = status;
    if (paymentMethod !== undefined)
      updateData.paymentMethod = paymentMethod;

    if (cardLast4 !== undefined)
      updateData.cardLast4 = cardLast4;

    if (note !== undefined) updateData.note = note;
    if (itemName !== undefined) updateData.itemName = itemName;
    if (itemQty !== undefined)
      updateData.itemQty = Number(itemQty);

    if (avatar !== undefined) updateData.avatar = avatar;

    const refund = await Refund.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!refund) {
      return res.status(404).json({
        success: false,
        message: "Refund not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Refund updated successfully",
      data: refund
    });
  } catch (error) {
    console.error("Update refund error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update refund",
      error: error.message
    });
  }
};

// ==========================================
// DELETE REFUND
// ==========================================
const deleteRefund = async (req, res) => {
  try {
    const refund = await Refund.findByIdAndDelete(req.params.id);

    if (!refund) {
      return res.status(404).json({
        success: false,
        message: "Refund not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Refund deleted successfully"
    });
  } catch (error) {
    console.error("Delete refund error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete refund",
      error: error.message
    });
  }
};

// ==========================================
// REFUND STATISTICS - TOP 5 CARDS
// ==========================================
const getRefundStats = async (req, res) => {
  try {
    const refunds = await Refund.find();

    let totalRefunds = 0;
    let approvedRefunds = 0;
    let pendingRefunds = 0;
    let rejectedRefunds = 0;
    let thisMonthRefunds = 0;

    const now = new Date();

    refunds.forEach((refund) => {
      const amount = Number(refund.amount) || 0;

      totalRefunds += amount;

      if (refund.status === "Approved") {
        approvedRefunds += amount;
      }

      if (refund.status === "Pending") {
        pendingRefunds += amount;
      }

      if (refund.status === "Rejected") {
        rejectedRefunds += amount;
      }

      const refundDate = new Date(refund.refundDate);

      if (
        refundDate.getMonth() === now.getMonth() &&
        refundDate.getFullYear() === now.getFullYear()
      ) {
        thisMonthRefunds += amount;
      }
    });

    const approvedPercentage =
      totalRefunds > 0
        ? (approvedRefunds / totalRefunds) * 100
        : 0;

    const pendingPercentage =
      totalRefunds > 0
        ? (pendingRefunds / totalRefunds) * 100
        : 0;

    const rejectedPercentage =
      totalRefunds > 0
        ? (rejectedRefunds / totalRefunds) * 100
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalRefunds,
        approvedRefunds,
        pendingRefunds,
        rejectedRefunds,
        thisMonthRefunds,
        approvedPercentage,
        pendingPercentage,
        rejectedPercentage
      }
    });
  } catch (error) {
    console.error("Refund statistics error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch refund statistics",
      error: error.message
    });
  }
};

module.exports = {
  getRefunds,
  getRefundById,
  createRefund,
  updateRefund,
  deleteRefund,
  getRefundStats
};