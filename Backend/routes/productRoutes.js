const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// =====================================================
// PRODUCT UPLOAD DIRECTORY
// =====================================================

const uploadDirectory = path.join(
  __dirname,
  "..",
  "uploads",
  "products"
);

// =====================================================
// CREATE DIRECTORY IF NOT EXISTS
// =====================================================

try {
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
      recursive: true,
    });
  }
} catch (error) {
  console.error(
    "PRODUCT UPLOAD DIRECTORY ERROR:",
    error
  );
}

// =====================================================
// MULTER STORAGE
// =====================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // Make sure directory still exists
      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, {
          recursive: true,
        });
      }

      cb(null, uploadDirectory);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    try {
      const extension = path
        .extname(file.originalname)
        .toLowerCase();

      const uniqueName =
        `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${extension}`;

      cb(null, uniqueName);
    } catch (error) {
      cb(error);
    }
  },
});

// =====================================================
// FILE FILTER
// =====================================================

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ];

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const validMimeType =
    allowedMimeTypes.includes(
      file.mimetype
    );

  const validExtension =
    allowedExtensions.includes(
      extension
    );

  if (
    validMimeType &&
    validExtension
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      ),
      false
    );
  }
};

// =====================================================
// MULTER CONFIGURATION
// =====================================================

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },
});

// =====================================================
// MULTER ERROR HANDLER
// =====================================================

const handleProductUpload = (
  req,
  res,
  next
) => {
  upload.array(
    "images",
    10
  )(req, res, (error) => {
    if (!error) {
      return next();
    }

    console.error(
      "PRODUCT IMAGE UPLOAD ERROR:",
      error
    );

    // -----------------------------------------------
    // Multer file size error
    // -----------------------------------------------

    if (
      error instanceof multer.MulterError
    ) {
      if (
        error.code ===
        "LIMIT_FILE_SIZE"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Each image must be 5MB or smaller.",
        });
      }

      if (
        error.code ===
        "LIMIT_FILE_COUNT"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "You can upload a maximum of 10 images.",
        });
      }

      if (
        error.code ===
        "LIMIT_UNEXPECTED_FILE"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Unexpected image field. Use 'images'.",
        });
      }

      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Image upload failed.",
      });
    }

    // -----------------------------------------------
    // Custom file filter error
    // -----------------------------------------------

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Image upload failed.",
    });
  });
};

// =====================================================
// GET ALL PRODUCTS
// GET
// /api/products
// =====================================================

router.get(
  "/",
  getProducts
);

// =====================================================
// CREATE PRODUCT
// POST
// /api/products
//
// FormData field:
// images
// =====================================================

router.post(
  "/",
  handleProductUpload,
  createProduct
);

// =====================================================
// GET SINGLE PRODUCT
// GET
// /api/products/:id
// =====================================================

router.get(
  "/:id",
  getProductById
);

// =====================================================
// UPDATE PRODUCT
// PUT
// /api/products/:id
//
// Existing images remain.
// New images are appended.
// =====================================================

router.put(
  "/:id",
  handleProductUpload,
  updateProduct
);

// =====================================================
// DELETE PRODUCT
// DELETE
// /api/products/:id
// =====================================================

router.delete(
  "/:id",
  deleteProduct
);

// =====================================================
// EXPORT
// =====================================================

module.exports = router;