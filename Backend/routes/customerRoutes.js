const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  updateCustomerStatus,
  deleteCustomer
} = require("../controllers/customerController");

// POST: Create Customer & GET: Fetch all Customers
router.route('/')
  .post(createCustomer)
  .get(getAllCustomers);

// Single Resource Routes: GET, PUT, DELETE
router.route('/:id')
  .get(getCustomerById)
  .put(updateCustomer)
  .delete(deleteCustomer);

// Quick Status Update Route: PATCH
router.patch('/:id/status', updateCustomerStatus);

module.exports = router;