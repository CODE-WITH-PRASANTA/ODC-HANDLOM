const Coupon = require('../models/Coupon');

// Get all coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new coupon
const createCoupon = async (req, res) => {
  try {
    const { code, type, discount, minOrder, usage, validityStart, validityEnd, status } = req.body;
    
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    const newCoupon = new Coupon({
      code: code.toUpperCase(),
      type,
      discount,
      minOrder,
      usage: usage || '0 / 100',
      validityStart,
      validityEnd,
      status: status || 'Active'
    });

    const savedCoupon = await newCoupon.save();
    res.status(201).json(savedCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing coupon
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (updatedData.code) {
      updatedData.code = updatedData.code.toUpperCase();
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a coupon
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    
    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon
};
