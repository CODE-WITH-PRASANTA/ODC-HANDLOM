const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['Credit', 'Debit'], required: true },
  amount: { type: String, required: true },
  status: { type: String, default: 'Completed' },
  balance: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);