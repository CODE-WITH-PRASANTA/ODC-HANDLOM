require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// ===============================
// Import Routes
// ===============================
const brandRoutes = require("./routes/brandRoutes");
const customerRoutes = require("./routes/customerRoutes");
const attributeRoutes = require("./routes/attributeRoutes");
const couponRoutes = require("./routes/couponRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const refundRoutes = require("./routes/refundRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const flashSaleRoutes = require("./routes/flashSaleRoutes");

// ===============================
// App Configuration
// ===============================
const app = express();
const PORT = process.env.PORT || 5000;

// ===============================
// Create Upload Directories
// ===============================
const uploadDirs = [
  path.join(__dirname, "uploads"),
  path.join(__dirname, "uploads/brands"),
  path.join(__dirname, "uploads/banners"),
  path.join(__dirname, "uploads/categories"),
  path.join(__dirname, "uploads/collections"),
];

uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// ===============================
// Global Middleware
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Static Uploads
// ===============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// API Routes
// ===============================
app.use("/api/brands", brandRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/refunds", refundRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/flashsales", flashSaleRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/coupons", couponRoutes);

// ===============================
// Health Check
// ===============================
app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "API is active",
  });
});

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ===============================
// MongoDB Connection & Server Start
// ===============================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce_db"
    );

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`
    );

    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();