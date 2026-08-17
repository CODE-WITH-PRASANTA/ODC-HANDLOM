require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

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

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files publicly via URL
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Database Connection & Server Initialization
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
app.use('/api/brands', brandRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/attributes', attributeRoutes); 
app.use('/api/coupons', couponRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.json({ status: "running", message: "E-Commerce Management API is active" });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});