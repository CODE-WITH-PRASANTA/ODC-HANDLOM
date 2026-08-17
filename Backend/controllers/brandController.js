const Brand = require('../models/Brand');
const fs = require('fs');
const path = require('path');

// Get all brands with stats and search/filter support
exports.getBrands = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (status && status !== 'All Status') {
      query.status = status === 'Active';
    }

    const brands = await Brand.find(query).sort({ createdAt: -1 });
    
    // Calculate Stats
    const totalBrands = await Brand.countDocuments();
    const activeBrands = await Brand.countDocuments({ status: true });
    const inactiveBrands = await Brand.countDocuments({ status: false });

    res.status(200).json({
      success: true,
      data: brands,
      stats: { totalBrands, activeBrands, inactiveBrands }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new brand
exports.createBrand = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    let logoUrl = '';

    if (req.file) {
      logoUrl = `/uploads/${req.file.filename}`;
    }

    const newBrand = await Brand.create({
      name,
      description,
      status: status === 'true' || status === true,
      logo: logoUrl
    });

    res.status(201).json({ success: true, data: newBrand });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update brand
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    
    let updateData = { name, description, status: status === 'true' || status === true };

    if (req.file) {
      updateData.logo = `/uploads/${req.file.filename}`;
      
      // Optional: Delete old logo file from disk if needed
      const oldBrand = await Brand.findById(id);
      if (oldBrand && oldBrand.logo && oldBrand.logo.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', oldBrand.logo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBrand) return res.status(404).json({ success: false, message: 'Brand not found' });

    res.status(200).json({ success: true, data: updatedBrand });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Toggle Status Route
exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });

    brand.status = !brand.status;
    await brand.save();

    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete brand
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });

    // Delete logo file
    if (brand.logo && brand.logo.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', brand.logo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.status(200).json({ success: true, message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};