const Customer = require("../models/Customer");

// @desc    Create a new Customer (POST)
// @route   POST /api/customers
// @access  Public / Admin
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, group, gender, address, status, avatar } = req.body;

    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email: email.toLowerCase() });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'A customer with this email address already exists.'
      });
    }

    const newCustomer = new Customer({
      name,
      email,
      phone,
      group: group || 'New Customers',
      gender: gender || 'Female',
      address: address || 'N/A',
      status: status || 'Active',
      avatar: avatar || undefined,
      isVip: group === 'VIP Customers',
      orders: 0,
      totalSpent: 0,
      rewardPoints: 0
    });

    const savedCustomer = await newCustomer.save();

    return res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: savedCustomer
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to create customer',
      error
    });
  }
};

// @desc    Get all Customers with dynamic search, filter, and pagination
// @route   GET /api/customers
// @access  Public / Admin
exports.getAllCustomers = async (req, res) => {
  try {
    const { search, status, group, location, page = 1, limit = 10 } = req.query;

    const query = {};

    // 1. Search Query (Name, Email, Phone)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // 2. Status Filter
    if (status && status !== 'All Status') {
      query.status = status;
    }

    // 3. Group Filter
    if (group && group !== 'All Groups') {
      query.group = group;
    }

    // 4. Location Filter (matches partial address)
    if (location && location !== 'All Locations') {
      query.address = { $regex: location, $options: 'i' };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [customers, totalCount] = await Promise.all([
      Customer.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Customer.countDocuments(query)
    ]);

    // Aggregate statistics across all customers
    const allCustomers = await Customer.find();
    const totalCustomers = allCustomers.length;
    const activeCustomers = allCustomers.filter((c) => c.status === 'Active').length;
    const newCustomers = allCustomers.filter((c) => c.group === 'New Customers').length;
    const blockedCustomers = allCustomers.filter((c) => c.status === 'Blocked').length;

    return res.status(200).json({
      success: true,
      count: customers.length,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum) || 1,
      currentPage: pageNum,
      stats: {
        totalCustomers,
        activeCustomers,
        newCustomers,
        blockedCustomers
      },
      data: customers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving customers',
      error: error.message
    });
  }
};

// @desc    Get single Customer by ID
// @route   GET /api/customers/:id
// @access  Public / Admin
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }
    return res.status(200).json({
      success: true,
      data: customer
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching customer profile',
      error: error.message
    });
  }
};

// @desc    Update Customer
// @route   PUT /api/customers/:id
// @access  Public / Admin
exports.updateCustomer = async (req, res) => {
  try {
    const { group } = req.body;
    const updateData = { ...req.body };

    if (group) {
      updateData.isVip = group === 'VIP Customers';
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      data: updatedCustomer
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to update customer'
    });
  }
};

// @desc    Update Customer Status (Quick Action)
// @route   PATCH /api/customers/:id/status
// @access  Public / Admin
exports.updateCustomerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Active', 'Inactive', 'Blocked'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Customer marked as ${status}`,
      data: customer
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete Customer
// @route   DELETE /api/customers/:id
// @access  Public / Admin
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete customer'
    });
  }
};