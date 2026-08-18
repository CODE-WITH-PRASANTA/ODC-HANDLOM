require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

<<<<<<< HEAD
=======
// Import your Routes
const brandRoutes = require('./routes/brandRoutes');
const customerRoutes = require('./routes/customerRoutes');
const attributeRoutes = require('./routes/attributeRoutes'); 
const couponRoutes = require('./routes/couponRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure required upload directories exist on server startup
const uploadDirs = [
  path.join(__dirname, "uploads"),
  path.join(__dirname, "uploads/brands"),
  path.join(__dirname, "uploads/banners")
];

uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
>>>>>>> 87fe9c5aeb188d0641feb24e955b7ed2c78e58b5
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
const refundRoutes = require('./routes/refundRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const flashSaleRoutes = require('./routes/flashSaleRoutes');
// Ensure uploads directory exists on server startup
const uploadDir = path.join(__dirname, "uploads/banners");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Folders ensure karein
const uploadsBase = path.join(__dirname, "uploads");
const categoryUploads = path.join(__dirname, "uploads/categories");
const collectionUploads = path.join(__dirname, "uploads/collections");
const bannerUploads = path.join(__dirname, "uploads/banners");

[uploadsBase, categoryUploads, collectionUploads, bannerUploads].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files publicly via URL
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Database Connection & Server Initialization
app.use('/api/refunds', refundRoutes);
// Serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/transactions', transactionRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/flashsales', flashSaleRoutes);
// MongoDB Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_db');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    
    // Start Server only after successful database connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// API Routes
<<<<<<< HEAD
=======
app.use('/api/brands', brandRoutes);
app.use('/api/customers', customerRoutes);
>>>>>>> 87fe9c5aeb188d0641feb24e955b7ed2c78e58b5
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/customers', customerRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.json({ status: "running", message: "API is active" });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});