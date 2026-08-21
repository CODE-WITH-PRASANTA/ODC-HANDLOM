const Product = require("../models/Product");

// =====================================================
// HELPER: PARSE BOOLEAN
// =====================================================

const parseBoolean = (
  value,
  defaultValue = false
) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return String(value).toLowerCase() === "true";
};

// =====================================================
// HELPER: PARSE NUMBER
// =====================================================

const parseNumber = (
  value,
  defaultValue = 0
) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return defaultValue;
  }

  const number = Number(value);

  return Number.isNaN(number)
    ? defaultValue
    : number;
};

// =====================================================
// HELPER: PARSE TAGS
// =====================================================

const parseTags = (tags) => {
  if (
    tags === undefined ||
    tags === null ||
    tags === ""
  ) {
    return [];
  }

  if (Array.isArray(tags)) {
    return tags;
  }

  try {
    const parsed = JSON.parse(tags);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    // Continue with comma-separated parsing
  }

  return String(tags)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

// =====================================================
// HELPER: GET UPLOADED IMAGE PATHS
// =====================================================

const getUploadedImages = (
  files
) => {
  if (
    !files ||
    !Array.isArray(files) ||
    files.length === 0
  ) {
    return [];
  }

  return files.map(
    (file) =>
      `/uploads/products/${file.filename}`
  );
};

// =====================================================
// GET ALL PRODUCTS
// =====================================================

exports.getProducts = async (
  req,
  res,
  next
) => {
  try {
    const products =
      await Product.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// GET PRODUCT BY ID
// =====================================================

exports.getProductById = async (
  req,
  res,
  next
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// CREATE PRODUCT
// =====================================================

exports.createProduct = async (
  req,
  res,
  next
) => {
  try {
    console.log(
      "================================"
    );

    console.log(
      "CREATE PRODUCT REQUEST"
    );

    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "FILES:",
      req.files
    );

    console.log(
      "================================"
    );

    const {
      name,
      desc,
      shortDescription,
      description,
      sku,

      category,
      brand,

      regularPrice,
      salePrice,
      costPrice,
      price,
      taxClass,

      stock,
      stockQuantity,
      lowStockThreshold,
      trackInventory,
      allowBackorders,

      weight,
      length,
      width,
      height,
      shippingClass,
      freeShipping,

      status,
      visibility,
      publishedAt,

      metaTitle,
      urlSlug,
      metaDescription,

      tags,

      featuredImageIndex,
    } = req.body;

    // ===================================================
    // VALIDATION
    // ===================================================

    if (
      !name ||
      !String(name).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Product name is required",
      });
    }

    if (
      !category ||
      !String(category).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Category is required",
      });
    }

    if (
      !brand ||
      !String(brand).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Brand is required",
      });
    }

    // ===================================================
    // PRICE
    // ===================================================

    const parsedRegularPrice =
      parseNumber(
        regularPrice,
        parseNumber(price, 0)
      );

    const parsedSalePrice =
      parseNumber(
        salePrice,
        0
      );

    const finalPrice =
      parsedSalePrice > 0
        ? parsedSalePrice
        : parsedRegularPrice;

    // ===================================================
    // STOCK
    // ===================================================

    const finalStock =
      parseNumber(
        stockQuantity,
        parseNumber(stock, 0)
      );

    // ===================================================
    // IMAGES
    // ===================================================

    const imagePaths =
      getUploadedImages(
        req.files
      );

    let featuredImage = "";

    if (
      imagePaths.length > 0
    ) {
      const index =
        parseNumber(
          featuredImageIndex,
          0
        );

      featuredImage =
        imagePaths[index] ||
        imagePaths[0];
    }

    // ===================================================
    // TAGS
    // ===================================================

    const parsedTags =
      parseTags(tags);

    // ===================================================
    // STATUS
    // ===================================================

    let finalStatus =
      status || "Active";

    if (
      finalStock === 0
    ) {
      finalStatus =
        "Out of Stock";
    }

    // ===================================================
    // CREATE PRODUCT
    // ===================================================

    const product =
      await Product.create({
        // -----------------------------------------------
        // BASIC
        // -----------------------------------------------

        name: String(name).trim(),

        sku:
          sku &&
          String(sku).trim()
            ? String(sku).trim()
            : undefined,

        shortDescription:
          shortDescription || "",

        desc:
          desc ||
          description ||
          "",

        description:
          description || "",

        // -----------------------------------------------
        // CATEGORY / BRAND
        // -----------------------------------------------

        category:
          String(category).trim(),

        brand:
          brand
            ? String(brand).trim()
            : "",

        // -----------------------------------------------
        // PRICING
        // -----------------------------------------------

        regularPrice:
          parsedRegularPrice,

        salePrice:
          parsedSalePrice,

        costPrice:
          parseNumber(
            costPrice,
            0
          ),

        price:
          finalPrice,

        taxClass:
          taxClass ||
          "Standard",

        // -----------------------------------------------
        // STOCK
        // -----------------------------------------------

        stock:
          finalStock,

        stockQuantity:
          finalStock,

        lowStockThreshold:
          parseNumber(
            lowStockThreshold,
            0
          ),

        trackInventory:
          parseBoolean(
            trackInventory,
            true
          ),

        allowBackorders:
          parseBoolean(
            allowBackorders,
            false
          ),

        // -----------------------------------------------
        // SHIPPING
        // -----------------------------------------------

        weight:
          parseNumber(
            weight,
            0
          ),

        dimensions: {
          length:
            parseNumber(
              length,
              0
            ),

          width:
            parseNumber(
              width,
              0
            ),

          height:
            parseNumber(
              height,
              0
            ),
        },

        shippingClass:
          shippingClass ||
          "Standard",

        freeShipping:
          parseBoolean(
            freeShipping,
            false
          ),

        // -----------------------------------------------
        // IMAGES
        // -----------------------------------------------

        image:
          featuredImage,

        featuredImage:
          featuredImage,

        images:
          imagePaths,

        // -----------------------------------------------
        // PUBLISH
        // -----------------------------------------------

        status:
          finalStatus,

        visibility:
          visibility ||
          "Public",

        publishedAt:
          publishedAt
            ? new Date(
                publishedAt
              )
            : null,

        // -----------------------------------------------
        // SEO
        // -----------------------------------------------

        metaTitle:
          metaTitle || "",

        urlSlug:
          urlSlug || "",

        metaDescription:
          metaDescription || "",

        // -----------------------------------------------
        // TAGS
        // -----------------------------------------------

        tags:
          parsedTags,
      });

    // ===================================================
    // RESPONSE
    // ===================================================

    res.status(201).json({
      success: true,
      message:
        "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(
      "CREATE PRODUCT ERROR:",
      error
    );

    next(error);
  }
};

// =====================================================
// UPDATE PRODUCT
// =====================================================

exports.updateProduct = async (
  req,
  res,
  next
) => {
  try {
    console.log(
      "================================"
    );

    console.log(
      "UPDATE PRODUCT REQUEST"
    );

    console.log(
      "PRODUCT ID:",
      req.params.id
    );

    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "FILES:",
      req.files
    );

    console.log(
      "================================"
    );

    // ===================================================
    // FIND PRODUCT
    // ===================================================

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    const {
      name,
      desc,
      shortDescription,
      description,
      sku,

      category,
      brand,

      regularPrice,
      salePrice,
      costPrice,
      price,
      taxClass,

      stock,
      stockQuantity,
      lowStockThreshold,
      trackInventory,
      allowBackorders,

      weight,
      length,
      width,
      height,
      shippingClass,
      freeShipping,

      status,
      visibility,
      publishedAt,

      metaTitle,
      urlSlug,
      metaDescription,

      tags,

      featuredImageIndex,
    } = req.body;

    // ===================================================
    // BASIC INFORMATION
    // ===================================================

    if (
      name !== undefined
    ) {
      if (
        !String(name).trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Product name cannot be empty",
        });
      }

      product.name =
        String(name).trim();
    }

    if (
      sku !== undefined
    ) {
      product.sku =
        String(sku).trim();
    }

    if (
      shortDescription !==
      undefined
    ) {
      product.shortDescription =
        shortDescription;
    }

    if (
      desc !== undefined
    ) {
      product.desc = desc;
    }

    if (
      description !==
      undefined
    ) {
      product.description =
        description;
    }

    // ===================================================
    // CATEGORY / BRAND
    // ===================================================

    if (
      category !== undefined
    ) {
      if (
        !String(category).trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Category cannot be empty",
        });
      }

      product.category =
        String(category).trim();
    }

    if (
      brand !== undefined
    ) {
      product.brand =
        String(brand).trim();
    }

    // ===================================================
    // PRICING
    // ===================================================

    if (
      regularPrice !==
      undefined
    ) {
      product.regularPrice =
        parseNumber(
          regularPrice,
          0
        );
    }

    if (
      salePrice !==
      undefined
    ) {
      product.salePrice =
        parseNumber(
          salePrice,
          0
        );
    }

    if (
      costPrice !==
      undefined
    ) {
      product.costPrice =
        parseNumber(
          costPrice,
          0
        );
    }

    if (
      price !== undefined
    ) {
      product.price =
        parseNumber(
          price,
          0
        );
    }

    if (
      taxClass !==
      undefined
    ) {
      product.taxClass =
        taxClass;
    }

    // ===================================================
    // STOCK
    // ===================================================

    if (
      stockQuantity !==
      undefined
    ) {
      const newStock =
        parseNumber(
          stockQuantity,
          0
        );

      product.stockQuantity =
        newStock;

      product.stock =
        newStock;
    } else if (
      stock !== undefined
    ) {
      const newStock =
        parseNumber(
          stock,
          0
        );

      product.stock =
        newStock;

      product.stockQuantity =
        newStock;
    }

    if (
      lowStockThreshold !==
      undefined
    ) {
      product.lowStockThreshold =
        parseNumber(
          lowStockThreshold,
          0
        );
    }

    if (
      trackInventory !==
      undefined
    ) {
      product.trackInventory =
        parseBoolean(
          trackInventory
        );
    }

    if (
      allowBackorders !==
      undefined
    ) {
      product.allowBackorders =
        parseBoolean(
          allowBackorders
        );
    }

    // ===================================================
    // SHIPPING
    // ===================================================

    if (
      weight !== undefined
    ) {
      product.weight =
        parseNumber(
          weight,
          0
        );
    }

    if (
      length !== undefined
    ) {
      product.dimensions =
        product.dimensions ||
        {};

      product.dimensions.length =
        parseNumber(
          length,
          0
        );
    }

    if (
      width !== undefined
    ) {
      product.dimensions =
        product.dimensions ||
        {};

      product.dimensions.width =
        parseNumber(
          width,
          0
        );
    }

    if (
      height !== undefined
    ) {
      product.dimensions =
        product.dimensions ||
        {};

      product.dimensions.height =
        parseNumber(
          height,
          0
        );
    }

    if (
      shippingClass !==
      undefined
    ) {
      product.shippingClass =
        shippingClass;
    }

    if (
      freeShipping !==
      undefined
    ) {
      product.freeShipping =
        parseBoolean(
          freeShipping
        );
    }

    // ===================================================
    // PUBLISH
    // ===================================================

    if (
      visibility !==
      undefined
    ) {
      product.visibility =
        visibility;
    }

    if (
      publishedAt !==
      undefined
    ) {
      product.publishedAt =
        publishedAt
          ? new Date(
              publishedAt
            )
          : null;
    }

    if (
      status !== undefined
    ) {
      product.status =
        status;
    }

    // ===================================================
    // SEO
    // ===================================================

    if (
      metaTitle !==
      undefined
    ) {
      product.metaTitle =
        metaTitle;
    }

    if (
      urlSlug !==
      undefined
    ) {
      product.urlSlug =
        urlSlug;
    }

    if (
      metaDescription !==
      undefined
    ) {
      product.metaDescription =
        metaDescription;
    }

    // ===================================================
    // TAGS
    // ===================================================

    if (
      tags !== undefined
    ) {
      product.tags =
        parseTags(tags);
    }

    // ===================================================
    // NEW IMAGES
    // ===================================================

    const newImages =
      getUploadedImages(
        req.files
      );

    if (
      newImages.length > 0
    ) {
      // Keep existing images
      const existingImages =
        Array.isArray(
          product.images
        )
          ? product.images
          : [];

      product.images = [
        ...existingImages,
        ...newImages,
      ];

      // -----------------------------------------------
      // Featured image
      // -----------------------------------------------

      const index =
        parseNumber(
          featuredImageIndex,
          0
        );

      const selectedNewImage =
        newImages[index];

      if (
        selectedNewImage
      ) {
        product.featuredImage =
          selectedNewImage;

        product.image =
          selectedNewImage;
      } else {
        // If no index is provided,
        // use first newly uploaded image
        product.featuredImage =
          newImages[0];

        product.image =
          newImages[0];
      }
    }

    // ===================================================
    // IF PRODUCT HAD NO FEATURED IMAGE
    // =====================================================

    if (
      !product.featuredImage &&
      Array.isArray(
        product.images
      ) &&
      product.images.length > 0
    ) {
      product.featuredImage =
        product.images[0];

      product.image =
        product.images[0];
    }

    // ===================================================
    // FINAL PRICE
    // =====================================================

    const regular =
      Number(
        product.regularPrice ||
          0
      );

    const sale =
      Number(
        product.salePrice ||
          0
      );

    product.price =
      sale > 0
        ? sale
        : regular;

    // ===================================================
    // STOCK STATUS
    // =====================================================

    if (
      Number(product.stock) === 0
    ) {
      product.status =
        "Out of Stock";
    } else if (
      status !== undefined
    ) {
      product.status =
        status;
    }

    // ===================================================
    // SAVE
    // =====================================================

    const updatedProduct =
      await product.save();

    // ===================================================
    // RESPONSE
    // =====================================================

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    next(error);
  }
};

// =====================================================
// DELETE PRODUCT
// =====================================================

exports.deleteProduct = async (
  req,
  res,
  next
) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE PRODUCT ERROR:",
      error
    );

    next(error);
  }
};