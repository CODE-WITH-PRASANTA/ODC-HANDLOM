const Banner = require("../models/Banner");

// ======================================
// Helper: Parse JSON FormData Fields
// ======================================

const parseJSONField = (value, fieldName) => {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`Invalid ${fieldName} JSON`);
  }
};

// ======================================
// Get All Banners
// ======================================

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({
      createdAt: -1,
    });

    res.status(200).json(banners);
  } catch (error) {
    console.error("GET BANNERS ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================================
// Create Banner
// ======================================

exports.createBanner = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    // Parse displaySettings
    if (data.displaySettings) {
      data.displaySettings = parseJSONField(
        data.displaySettings,
        "displaySettings"
      );
    }

    // Parse tags
    if (data.tags) {
      data.tags = parseJSONField(
        data.tags,
        "tags"
      );
    }

    // Uploaded image
    if (req.file) {
      data.bannerImage = `/uploads/${req.file.filename}`;
    }

    const newBanner = new Banner(data);

    const savedBanner = await newBanner.save();

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner: savedBanner,
    });
  } catch (error) {
    console.error("CREATE BANNER ERROR:", error);

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================================
// Update Banner
// ======================================

exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const data = {
      ...req.body,
    };

    // Parse displaySettings
    if (data.displaySettings) {
      data.displaySettings = parseJSONField(
        data.displaySettings,
        "displaySettings"
      );
    }

    // Parse tags
    if (data.tags) {
      data.tags = parseJSONField(
        data.tags,
        "tags"
      );
    }

    // If new image uploaded
    if (req.file) {
      data.bannerImage = `/uploads/${req.file.filename}`;
    }

    const updatedBanner =
      await Banner.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        error: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      banner: updatedBanner,
    });
  } catch (error) {
    console.error("UPDATE BANNER ERROR:", error);

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================================
// Delete Banner
// ======================================

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBanner =
      await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({
        success: false,
        error: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BANNER ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};