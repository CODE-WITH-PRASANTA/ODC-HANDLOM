const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // ==========================================
    // BASIC INFORMATION
    // ==========================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      trim: true,
      default: () =>
        `SKU-${Date.now()
          .toString()
          .slice(-6)}`,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    desc: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    // ==========================================
    // CATEGORY
    // ==========================================

    category: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // BRAND
    // ==========================================

    brand: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================================
    // PRICING
    // ==========================================

    regularPrice: {
      type: Number,
      default: 0,
    },

    salePrice: {
      type: Number,
      default: 0,
    },

    costPrice: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
    },

    taxClass: {
      type: String,
      default: "Standard",
    },

    // ==========================================
    // STOCK
    // ==========================================

    stock: {
      type: Number,
      default: 0,
    },

    stockQuantity: {
      type: Number,
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 0,
    },

    trackInventory: {
      type: Boolean,
      default: true,
    },

    allowBackorders: {
      type: Boolean,
      default: false,
    },

    // ==========================================
    // SHIPPING
    // ==========================================

    weight: {
      type: Number,
      default: 0,
    },

    dimensions: {
      length: {
        type: Number,
        default: 0,
      },

      width: {
        type: Number,
        default: 0,
      },

      height: {
        type: Number,
        default: 0,
      },
    },

    shippingClass: {
      type: String,
      default: "Standard",
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    // ==========================================
    // IMAGES
    // ==========================================

    image: {
      type: String,
      default: "",
    },

    featuredImage: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    // ==========================================
    // PUBLISH
    // ==========================================

    status: {
      type: String,

      enum: [
        "Active",
        "Out of Stock",
        "Published",
        "Draft",
        "Pending",
      ],

      default: "Active",
    },

    visibility: {
      type: String,

      enum: [
        "Public",
        "Password Protected",
        "Private",
      ],

      default: "Public",
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    // ==========================================
    // SEO
    // ==========================================

    metaTitle: {
      type: String,
      default: "",
    },

    urlSlug: {
      type: String,
      default: "",
      trim: true,
    },

    metaDescription: {
      type: String,
      default: "",
    },

    // ==========================================
    // TAGS
    // ==========================================

    tags: {
      type: [String],
      default: [],
    },

    // ==========================================
    // RATING
    // ==========================================

    rating: {
      type: Number,
      default: 5.0,
    },

    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);