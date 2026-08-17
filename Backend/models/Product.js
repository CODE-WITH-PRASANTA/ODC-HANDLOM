const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, default: '' },
  sku: { type: String, default: () => `SKU-${Date.now().toString().slice(-6)}` },
  category: { type: String, required: true, default: 'Sarees' },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Out of Stock'], default: 'Active' },
  image: { type: String, default: 'https://via.placeholder.com/150' },
  rating: { type: Number, default: 5.0 },
  reviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);