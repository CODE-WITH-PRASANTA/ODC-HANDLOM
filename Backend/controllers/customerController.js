const Customer = require('../models/Customer');

// सभी कस्टमर्स फेच करना
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// नया कस्टमर जोड़ना
exports.createCustomer = async (req, res) => {
  try {
    const existing = await Customer.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const newCustomer = await Customer.create(req.body);
    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// कस्टमर अपडेट करना
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.status(200).json({ success: true, data: updatedCustomer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// कस्टमर डिलीट करना
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};