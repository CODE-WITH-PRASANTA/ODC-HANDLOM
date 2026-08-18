const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  products: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
  logo: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);
