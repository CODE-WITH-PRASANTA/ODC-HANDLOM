const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Collection name is required'],
      trim: true
    },
    image: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      enum: ['Manual', 'Automatic'],
      default: 'Manual'
    },
    products: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },
    sortOrder: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Collection', CollectionSchema);