const FlashSale = require('../models/FlashSale');

// Get all flash sales
exports.getFlashSales = async (req, res) => {
  try {
    const flashSales = await FlashSale.find().sort({ createdAt: -1 });
    res.status(200).json(flashSales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new flash sale
exports.createFlashSale = async (req, res) => {
  try {
    const { title, rating, description, originalPrice, salePrice, discount } = req.body;
    
    // Handle image file path if uploaded
    let imagePath = req.body.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const newSale = new FlashSale({
      title,
      rating: Number(rating) || 4.5,
      description,
      originalPrice: Number(originalPrice),
      salePrice: Number(salePrice),
      discount: Number(discount) || 0,
      image: imagePath,
      createdAt: 'Just now'
    });

    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing flash sale (Edit)
exports.updateFlashSale = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedSale = await FlashSale.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedSale) return res.status(404).json({ error: 'Flash sale item not found' });
    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a flash sale
exports.deleteFlashSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await FlashSale.findByIdAndDelete(id);
    if (!deletedSale) return res.status(404).json({ error: 'Flash sale item not found' });
    res.status(200).json({ message: 'Flash sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};