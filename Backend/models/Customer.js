const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      unique: true
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      default: '+91 98765 00000'
    },
    dob: { type: String, default: '' },
    gender: { type: String, default: '' },
    group: {
      type: String,
      enum: ['VIP', 'Regular', 'Wholesale'],
      default: 'Regular'
    },
    companyName: { type: String, default: '' },
    gstNumber: { type: String, default: '' },
    businessType: { type: String, default: '' },
    addressLine1: { type: String, default: '' },
    addressLine2: { type: String, default: '' },
    country: { type: String, default: 'India' },
    state: { type: String, default: '' },
    city: { type: String, default: '' },
    pincode: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Blocked'],
      default: 'Active'
    },
    notes: { type: String, default: '' },
    orders: { type: Number, default: 0 },
    totalSpent: { type: String, default: '₹ 0.00' },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    }
  },
  { timestamps: true }
);


customerSchema.pre('save', async function (next) {
  if (!this.customerId) {
    this.customerId = `#CUS${Math.floor(10000 + Math.random() * 90000)}`;
  }
  next();
});

module.exports = mongoose.model('Customer', customerSchema);