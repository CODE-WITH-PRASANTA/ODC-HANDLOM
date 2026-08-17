const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema(
  {
    refundId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    orderId: {
      type: String,
      required: true,
      trim: true
    },

    customerName: {
      type: String,
      required: true,
      trim: true
    },

    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    avatar: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    reason: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Pending"
    },

    refundDate: {
      type: Date,
      default: Date.now
    },

    paymentMethod: {
      type: String,
      enum: [
        "Original Payment Method",
        "Credit Card",
        "PayPal"
      ],
      default: "Original Payment Method"
    },

    cardLast4: {
      type: String,
      default: "9999"
    },

    note: {
      type: String,
      default: ""
    },

    itemName: {
      type: String,
      required: true,
      trim: true
    },

    itemQty: {
      type: Number,
      default: 1,
      min: 1
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Refund", refundSchema);