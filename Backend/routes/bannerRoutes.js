const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

// ===============================
// Multer Storage Configuration
// ===============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ===============================
// Multer Upload Configuration
// ===============================

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// ===============================
// Routes
// ===============================

// Get all banners
router.get("/", getBanners);

// Create banner
router.post(
  "/",
  upload.single("imageFile"),
  createBanner
);

// Update banner
router.put(
  "/:id",
  upload.single("imageFile"),
  updateBanner
);

// Delete banner
router.delete(
  "/:id",
  deleteBanner
);

module.exports = router;