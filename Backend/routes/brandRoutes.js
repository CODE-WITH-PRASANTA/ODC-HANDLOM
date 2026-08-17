const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getBrands,
  createBrand,
  updateBrand,
  toggleStatus,
  deleteBrand
} = require('../controllers/brandController');

// Multer storage engine config for webp / images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', getBrands);
router.post('/', upload.single('logo'), createBrand);
router.put('/:id', upload.single('logo'), updateBrand);
router.patch('/:id/status', toggleStatus);
router.delete('/:id', deleteBrand);

module.exports = router;