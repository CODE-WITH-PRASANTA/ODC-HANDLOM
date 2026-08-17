const Banner = require('../models/Banner');

// Get all banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new banner
exports.createBanner = async (req, res) => {
  try {
    const data = req.body;
    
    // Parse nested objects if sent as strings through FormData
    if (typeof data.displaySettings === 'string') {
      data.displaySettings = JSON.parse(data.displaySettings);
    }
    if (typeof data.tags === 'string') {
      data.tags = JSON.parse(data.tags);
    }

    if (req.file) {
      data.bannerImage = `/uploads/${req.file.filename}`;
    }

    const newBanner = new Banner(data);
    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing banner
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (typeof data.displaySettings === 'string') {
      data.displaySettings = JSON.parse(data.displaySettings);
    }
    if (typeof data.tags === 'string') {
      data.tags = JSON.parse(data.tags);
    }

    if (req.file) {
      data.bannerImage = `/uploads/${req.file.filename}`;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(id, data, { new: true });
    if (!updatedBanner) return res.status(404).json({ error: 'Banner not found' });
    res.status(200).json(updatedBanner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBanner = await Banner.findByIdAndDelete(id);
    if (!deletedBanner) return res.status(404).json({ error: 'Banner not found' });
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};