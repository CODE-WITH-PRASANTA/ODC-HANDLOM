const express = require('express');
const router = express.Router();
const {
  getAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute
} = require('../controllers/attributeController');

router.route('/')
  .get(getAttributes)
  .post(createAttribute);

router.route('/:id')
  .put(updateAttribute)
  .delete(deleteAttribute);

module.exports = router;
