const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true
    },
    parent: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    products: {
      type: Number,
      default: 0
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);