const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getFlashSales,
  createFlashSale,
  updateFlashSale,
  deleteFlashSale
} = require('../controllers/flashSaleController');

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get('/', getFlashSales);
router.post('/', upload.single('imageFile'), createFlashSale);
router.put('/:id', upload.single('imageFile'), updateFlashSale);
router.delete('/:id', deleteFlashSale);

module.exports = router;