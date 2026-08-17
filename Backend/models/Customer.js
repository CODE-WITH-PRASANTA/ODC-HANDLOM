const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    orders: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0.0
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Blocked'],
      default: 'Active'
    },
    joinedOn: {
      type: Date,
      default: Date.now
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
    },
    isVip: {
      type: Boolean,
      default: false
    },
    group: {
      type: String,
      enum: ['New Customers', 'Regular', 'VIP Customers'],
      default: 'New Customers'
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Female'
    },
    address: {
      type: String,
      default: 'N/A',
      trim: true
    },
    rewardPoints: {
      type: Number,
      default: 0
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    recentOrders: [
      {
        orderId: { type: String, required: true },
        orderDate: { type: Date, default: Date.now },
        amount: { type: Number, required: true },
        orderStatus: { 
          type: String, 
          enum: ['Delivered', 'Shipped', 'Pending', 'Cancelled'], 
          default: 'Delivered' 
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Automatically set isVip flag when group is 'VIP Customers'
customerSchema.pre('save', function (next) {
  if (this.group === 'VIP Customers') {
    this.isVip = true;
  }
  next();
});

module.exports = mongoose.model('Customer', customerSchema);