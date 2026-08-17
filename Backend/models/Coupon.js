const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, required: true, enum: ['Percentage', 'Flat Amount', 'Free Shipping'] },
  discount: { type: String, required: true },
  minOrder: { type: String, required: true },
  usage: { type: String, default: '0 / 100' },
  validityStart: { type: String, required: true },
  validityEnd: { type: String, required: true },
  status: { type: String, required: true, enum: ['Active', 'Expired', 'Inactive'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);