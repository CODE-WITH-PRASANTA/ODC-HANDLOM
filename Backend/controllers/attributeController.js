const Attribute = require('../models/Attribute');

// Get all attributes
exports.getAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find().sort({ createdAt: -1 });
    res.status(200).json(attributes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a new attribute
exports.createAttribute = async (req, res) => {
  try {
    const { name, group, type, rawValues, status } = req.body;
    
    const valueLines = rawValues ? rawValues.split('\n').map(v => v.trim()).filter(Boolean) : [];
    const formattedValues = type === 'Dropdown' && valueLines.length > 0 ? `${valueLines.length} values` : '-';

    const newAttribute = new Attribute({
      name,
      group,
      type,
      values: formattedValues,
      rawValues: rawValues || '',
      status: status ?? true
    });

    const savedAttribute = await newAttribute.save();
    res.status(201).json(savedAttribute);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Data', error: error.message });
  }
};

// Update attribute
exports.updateAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, group, type, rawValues, status } = req.body;

    const valueLines = rawValues ? rawValues.split('\n').map(v => v.trim()).filter(Boolean) : [];
    const formattedValues = type === 'Dropdown' && valueLines.length > 0 ? `${valueLines.length} values` : '-';

    const updatedAttribute = await Attribute.findByIdAndUpdate(
      id,
      { name, group, type, values: formattedValues, rawValues, status },
      { new: true, runValidators: true }
    );

    if (!updatedAttribute) {
      return res.status(404).json({ message: 'Attribute not found' });
    }

    res.status(200).json(updatedAttribute);
  } catch (error) {
    res.status(400).json({ message: 'Update Failed', error: error.message });
  }
};

// Delete attribute
exports.deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttribute = await Attribute.findByIdAndDelete(id);

    if (!deletedAttribute) {
      return res.status(404).json({ message: 'Attribute not found' });
    }

    res.status(200).json({ message: 'Attribute deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion Failed', error: error.message });
  }
};
