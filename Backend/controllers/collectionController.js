const Collection = require('../models/Collection');

// Get all collections
exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find().sort({ sortOrder: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: collections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new collection
exports.createCollection = async (req, res) => {
  try {
    const { name, type, status, products } = req.body;
    let image = '';

    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/uploads/collections/${req.file.filename}`;
    }

    const count = await Collection.countDocuments();

    const newCollection = await Collection.create({
      name: name?.trim(),
      type: type || 'Manual',
      status: status || 'Active',
      products: Number(products) || 0,
      image,
      sortOrder: count + 1
    });

    res.status(201).json({ success: true, data: newCollection });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update collection
exports.updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status, products } = req.body;

    const updatePayload = {
      name: name?.trim(),
      type: type || 'Manual',
      status: status || 'Active',
      products: Number(products) || 0
    };

    if (req.file) {
      updatePayload.image = `${req.protocol}://${req.get('host')}/uploads/collections/${req.file.filename}`;
    }

    const updatedCollection = await Collection.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true
    });

    if (!updatedCollection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }

    res.status(200).json({ success: true, data: updatedCollection });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete collection
exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Collection.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }

    res.status(200).json({ success: true, message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};