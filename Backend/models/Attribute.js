const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  group: { type: String, required: true, trim: true },
  type: { type: String, required: true, default: 'Dropdown' },
  values: { type: String, default: '-' },
  rawValues: { type: String, default: '' },
  status: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Attribute', attributeSchema);
