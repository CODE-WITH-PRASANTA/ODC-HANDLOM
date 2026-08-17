const mongoose = require('mongoose');

const flashSaleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: { type: String, default: 'Just now' }
}, { timestamps: true });

module.exports = mongoose.model('FlashSale', flashSaleSchema);