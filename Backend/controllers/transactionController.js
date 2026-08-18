const Transaction = require('../models/Transaction');

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new transaction (Add Funds or Payout/Refund)
exports.createTransaction = async (req, res) => {
  try {
    const { date, time, description, type, amount, status, balance } = req.body;
    const newTx = new Transaction({
      date,
      time,
      description,
      type,
      amount,
      status: status || 'Completed',
      balance: balance || '₹2,45,680.00'
    });
    const savedTx = await newTx.save();
    res.status(201).json(savedTx);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing transaction (Edit)
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTx = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTx) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(updatedTx);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTx = await Transaction.findByIdAndDelete(id);
    if (!deletedTx) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};