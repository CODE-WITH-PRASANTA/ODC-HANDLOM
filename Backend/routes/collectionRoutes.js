const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection
} = require('../controllers/collectionController');

// Upload directory ensure karein
const uploadDir = path.join(__dirname, '../uploads/collections');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Routes
router.get('/', getCollections);
router.post('/', upload.single('image'), createCollection);
router.put('/:id', upload.single('image'), updateCollection);
router.delete('/:id', deleteCollection);

module.exports = router;