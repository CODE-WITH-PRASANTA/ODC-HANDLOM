const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Create product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, desc, sku, category, price, stock, status, image } = req.body;

    const product = await Product.create({
      name,
      desc,
      sku: sku || undefined,
      category,
      price: Number(price),
      stock: Number(stock) || 0,
      status: Number(stock) === 0 ? 'Out of Stock' : (status || 'Active'),
      image: image || 'https://via.placeholder.com/150'
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, desc, sku, category, price, stock, status } = req.body;
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        desc,
        sku,
        category,
        price: Number(price),
        stock: Number(stock),
        status: Number(stock) === 0 ? 'Out of Stock' : status
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};