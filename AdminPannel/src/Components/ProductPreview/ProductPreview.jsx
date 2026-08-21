import React, {
  useEffect,
  useState,
} from "react";

import { createPortal } from "react-dom";

import {
  FiEye,
  FiSave,
  FiSend,
  FiFolder,
  FiTag,
  FiBookmark,
  FiImage,
  FiChevronDown,
  FiCalendar,
  FiPlus,
  FiX,
  FiCheckCircle,
  FiPackage,
  FiTruck,
} from "react-icons/fi";

import "./ProductPreview.css";

import API, { IMG_URL } from "../../api/axios";

const ProductPreview = ({
  publishData,
  setPublishData,

  selectedCategory,
  setSelectedCategory,

  selectedBrand,
  setSelectedBrand,

  tags,
  setTags,

  images,
  setImages,

  productInformation = {},
  pricingData = {},
  seoData = {},

  onSaveProduct,
  saving,
}) => {
  /* =====================================================
     CATEGORY
  ===================================================== */

  const [categoryList, setCategoryList] =
    useState([]);

  const [loadingCategories, setLoadingCategories] =
    useState(false);

  /* =====================================================
     BRAND
  ===================================================== */

  const [brandList, setBrandList] =
    useState([]);

  const [loadingBrands, setLoadingBrands] =
    useState(false);

  /* =====================================================
     ADD CATEGORY
  ===================================================== */

  const [showAddCategory, setShowAddCategory] =
    useState(false);

  const [newCategoryName, setNewCategoryName] =
    useState("");

  /* =====================================================
     ADD BRAND
  ===================================================== */

  const [showAddBrand, setShowAddBrand] =
    useState(false);

  const [newBrandName, setNewBrandName] =
    useState("");

  /* =====================================================
     TAGS
  ===================================================== */

  const [tagInput, setTagInput] =
    useState("");

  /* =====================================================
     FEATURED IMAGE
  ===================================================== */

  const [featuredImage, setFeaturedImage] =
    useState("");

  /* =====================================================
     PREVIEW POPUP
  ===================================================== */

  const [showPreview, setShowPreview] =
    useState(false);

  /* =====================================================
     FETCH CATEGORIES
  ===================================================== */

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);

      const response =
        await API.get("/categories");

      console.log(
        "CATEGORY RESPONSE:",
        response.data
      );

      const data = Array.isArray(
        response.data
      )
        ? response.data
        : response.data?.data ||
          response.data?.categories ||
          [];

      setCategoryList(data);
    } catch (error) {
      console.error(
        "FETCH CATEGORY ERROR:",
        error
      );

      setCategoryList([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  /* =====================================================
     FETCH BRANDS
  ===================================================== */

  const fetchBrands = async () => {
    try {
      setLoadingBrands(true);

      const response =
        await API.get("/brands");

      console.log(
        "BRAND RESPONSE:",
        response.data
      );

      const data = Array.isArray(
        response.data
      )
        ? response.data
        : response.data?.data ||
          response.data?.brands ||
          [];

      setBrandList(data);
    } catch (error) {
      console.error(
        "FETCH BRAND ERROR:",
        error
      );

      setBrandList([]);
    } finally {
      setLoadingBrands(false);
    }
  };

  /* =====================================================
     LOAD CATEGORY + BRAND
  ===================================================== */

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  /* =====================================================
     GET CATEGORY NAME
  ===================================================== */

  const getCategoryName = (category) => {
    if (typeof category === "string") {
      return category;
    }

    return (
      category?.name ||
      category?.categoryName ||
      category?.title ||
      ""
    );
  };

  /* =====================================================
     GET BRAND NAME
  ===================================================== */

  const getBrandName = (brand) => {
    if (typeof brand === "string") {
      return brand;
    }

    return (
      brand?.name ||
      brand?.brandName ||
      brand?.title ||
      ""
    );
  };

  /* =====================================================
     ADD CATEGORY
  ===================================================== */

  const handleAddCategorySubmit = async (
    e
  ) => {
    e.preventDefault();

    const categoryName =
      newCategoryName.trim();

    if (!categoryName) {
      return;
    }

    try {
      const response = await API.post(
        "/categories",
        {
          name: categoryName,
        }
      );

      const created =
        response.data?.data ||
        response.data?.category ||
        response.data;

      if (created) {
        setCategoryList((prev) => [
          ...prev,
          created,
        ]);

        setSelectedCategory(
          getCategoryName(created) ||
            categoryName
        );
      }

      setNewCategoryName("");
      setShowAddCategory(false);
    } catch (error) {
      console.error(
        "CREATE CATEGORY ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add category"
      );
    }
  };

  /* =====================================================
     ADD BRAND
  ===================================================== */

  const handleAddBrandSubmit = async (
    e
  ) => {
    e.preventDefault();

    const brandName =
      newBrandName.trim();

    if (!brandName) {
      return;
    }

    try {
      const response = await API.post(
        "/brands",
        {
          name: brandName,
        }
      );

      const created =
        response.data?.data ||
        response.data?.brand ||
        response.data;

      if (created) {
        setBrandList((prev) => [
          ...prev,
          created,
        ]);

        setSelectedBrand(
          getBrandName(created) ||
            brandName
        );
      }

      setNewBrandName("");
      setShowAddBrand(false);
    } catch (error) {
      console.error(
        "CREATE BRAND ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add brand"
      );
    }
  };

  /* =====================================================
     TAGS
  ===================================================== */

  const handleTagKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      tagInput.trim()
    ) {
      e.preventDefault();

      const newTag =
        tagInput.trim();

      if (!tags.includes(newTag)) {
        setTags([
          ...tags,
          newTag,
        ]);
      }

      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(
      tags.filter(
        (item) => item !== tag
      )
    );
  };

  /* =====================================================
     IMAGE URL
  ===================================================== */

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    let imageValue = image;

    if (
      typeof image === "object"
    ) {
      imageValue =
        image.url ||
        image.previewUrl ||
        image.src ||
        image.path ||
        "";
    }

    if (!imageValue) {
      return "";
    }

    if (
      imageValue.startsWith(
        "http://"
      ) ||
      imageValue.startsWith(
        "https://"
      ) ||
      imageValue.startsWith(
        "blob:"
      ) ||
      imageValue.startsWith(
        "data:"
      )
    ) {
      return imageValue;
    }

    const baseUrl = String(
      IMG_URL || ""
    ).replace(/\/$/, "");

    const cleanPath =
      imageValue.startsWith("/")
        ? imageValue
        : `/${imageValue}`;

    return `${baseUrl}${cleanPath}`;
  };

  /* =====================================================
     FEATURED IMAGE
  ===================================================== */

  useEffect(() => {
    /*
      IMPORTANT:
      If the product is already saved in DB,
      image/featuredImage can exist inside
      productInformation.
    */

    const savedFeaturedImage =
      productInformation?.featuredImage ||
      productInformation?.image;

    if (
      savedFeaturedImage &&
      (!images ||
        images.length === 0)
    ) {
      setFeaturedImage(
        savedFeaturedImage
      );

      return;
    }

    if (
      !images ||
      images.length === 0
    ) {
      setFeaturedImage(
        savedFeaturedImage || ""
      );

      return;
    }

    const coverImage =
      images.find(
        (img) =>
          img?.isCover ||
          img?.featured ||
          img?.isFeatured
      );

    if (coverImage) {
      const coverUrl =
        typeof coverImage ===
        "string"
          ? coverImage
          : coverImage.url ||
            coverImage.previewUrl ||
            coverImage.src ||
            coverImage.path ||
            "";

      setFeaturedImage(
        coverUrl
      );

      return;
    }

    const firstImage =
      typeof images[0] ===
      "string"
        ? images[0]
        : images[0]?.url ||
          images[0]?.previewUrl ||
          images[0]?.src ||
          images[0]?.path ||
          "";

    setFeaturedImage(
      firstImage
    );
  }, [
    images,
    productInformation?.featuredImage,
    productInformation?.image,
  ]);

  /* =====================================================
     IMAGE UPLOAD
  ===================================================== */

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl =
      URL.createObjectURL(file);

    const newImage = {
      id:
        Date.now() +
        Math.random(),

      file,

      url: previewUrl,

      previewUrl,

      isCover: true,
    };

    setImages((prev) => [
      ...prev.map((img) => ({
        ...img,
        isCover: false,
      })),

      newImage,
    ]);

    setFeaturedImage(
      previewUrl
    );

    e.target.value = "";
  };

  /* =====================================================
     SELECT IMAGE
  ===================================================== */

  const handleSelectImage = (
    image
  ) => {
    const imageUrl =
      typeof image === "string"
        ? image
        : image?.url ||
          image?.previewUrl ||
          image?.src ||
          image?.path ||
          "";

    if (!imageUrl) {
      return;
    }

    setFeaturedImage(
      imageUrl
    );
  };

  /* =====================================================
     OPEN PREVIEW
  ===================================================== */

  const handlePreviewProduct =
    () => {
      setShowPreview(true);
    };

  /* =====================================================
     CLOSE PREVIEW
  ===================================================== */

  const handleClosePreview =
    () => {
      setShowPreview(false);
    };

  /* =====================================================
     ESC KEY + BODY LOCK
  ===================================================== */

  useEffect(() => {
    if (!showPreview) {
      document.body.classList.remove(
        "ppv-preview-open"
      );

      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    document.body.classList.add(
      "ppv-preview-open"
    );

    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
        setShowPreview(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.body.classList.remove(
        "ppv-preview-open"
      );

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [showPreview]);

  /* =====================================================
     HELPER
     READ VALUE FROM ALL DATA OBJECTS
  ===================================================== */

  const getProductValue = (
    ...keys
  ) => {
    const sources = [
      productInformation,
      pricingData,
      seoData,
      publishData,
    ];

    for (const key of keys) {
      for (const source of sources) {
        if (
          source &&
          source[key] !==
            undefined &&
          source[key] !== null &&
          source[key] !== ""
        ) {
          return source[key];
        }
      }
    }

    return "";
  };

  /* =====================================================
     BASIC PRODUCT INFORMATION
  ===================================================== */

  const productName =
    getProductValue(
      "productName",
      "name"
    );

  const sku =
    getProductValue(
      "sku"
    );

  const shortDescription =
    getProductValue(
      "shortDescription"
    );

  const description =
    getProductValue(
      "description",
      "desc"
    );

  const category =
    selectedCategory ||
    getProductValue(
      "category"
    );

  const brand =
    selectedBrand ||
    getProductValue(
      "brand"
    );

  /* =====================================================
     PRICING
  ===================================================== */

  const regularPrice =
    Number(
      getProductValue(
        "regularPrice"
      )
    ) || 0;

  const salePrice =
    Number(
      getProductValue(
        "salePrice"
      )
    ) || 0;

  const costPrice =
    Number(
      getProductValue(
        "costPrice"
      )
    ) || 0;

  const price =
    Number(
      getProductValue(
        "price"
      )
    ) || 0;

  const displayPrice =
    salePrice > 0
      ? salePrice
      : price > 0
      ? price
      : regularPrice;

  const hasDiscount =
    salePrice > 0 &&
    regularPrice >
      salePrice;

  const discountPercentage =
    hasDiscount
      ? Math.round(
          ((regularPrice -
            salePrice) /
            regularPrice) *
            100
        )
      : 0;

  /* =====================================================
     TAX
  ===================================================== */

  const taxClass =
    getProductValue(
      "taxClass"
    );

  /* =====================================================
     INVENTORY
  ===================================================== */

  const stock =
    Number(
      getProductValue(
        "stockQuantity",
        "stock"
      )
    ) || 0;

  const lowStockThreshold =
    Number(
      getProductValue(
        "lowStockThreshold"
      )
    ) || 0;

  const trackInventory =
    getProductValue(
      "trackInventory"
    );

  const allowBackorders =
    getProductValue(
      "allowBackorders"
    );

  /* =====================================================
     SHIPPING
  ===================================================== */

  const weight =
    getProductValue(
      "weight"
    );

  const dimensions =
    getProductValue(
      "dimensions"
    ) || {};

  const shippingClass =
    getProductValue(
      "shippingClass"
    );

  const freeShipping =
    getProductValue(
      "freeShipping"
    );

  /* =====================================================
     PUBLISH
  ===================================================== */

  const status =
    publishData?.status ||
    getProductValue(
      "status"
    ) ||
    "Draft";

  const visibility =
    publishData?.visibility ||
    getProductValue(
      "visibility"
    ) ||
    "Public";

  const publishedAt =
    publishData?.publishedAt ||
    getProductValue(
      "publishedAt"
    );

  /* =====================================================
     SEO
  ===================================================== */

  const metaTitle =
    getProductValue(
      "metaTitle"
    );

  const urlSlug =
    getProductValue(
      "urlSlug"
    );

  const metaDescription =
    getProductValue(
      "metaDescription"
    );

  /* =====================================================
     OTHER PRODUCT DATA
  ===================================================== */

  const rating =
    Number(
      getProductValue(
        "rating"
      )
    ) || 0;

  const reviews =
    Number(
      getProductValue(
        "reviews"
      )
    ) || 0;

  const createdAt =
    getProductValue(
      "createdAt"
    );

  const updatedAt =
    getProductValue(
      "updatedAt"
    );

  /* =====================================================
     STOCK STATUS
  ===================================================== */

  let stockStatus =
    "In Stock";

  if (stock === 0) {
    stockStatus =
      "Out of Stock";
  } else if (
    lowStockThreshold >
      0 &&
    stock <=
      lowStockThreshold
  ) {
    stockStatus =
      "Low Stock";
  }

  /* =====================================================
     FORMAT VALUE
  ===================================================== */

  const formatValue = (
    value
  ) => {
    if (
      value ===
        undefined ||
      value === null ||
      value === ""
    ) {
      return "Not available";
    }

    if (
      typeof value ===
      "object"
    ) {
      return JSON.stringify(
        value
      );
    }

    return String(value);
  };

  /* =====================================================
     FORMAT BOOLEAN
  ===================================================== */

  const formatBoolean = (
    value
  ) => {
    if (value === true) {
      return "Yes";
    }

    if (value === false) {
      return "No";
    }

    return "Not specified";
  };

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (
    value
  ) => {
    if (!value) {
      return "Not available";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return String(value);
    }

    return date.toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  /* =====================================================
     DIMENSIONS
  ===================================================== */

  const getDimensionsText =
    () => {
      if (
        !dimensions ||
        typeof dimensions !==
          "object"
      ) {
        return formatValue(
          dimensions
        );
      }

      const length =
        dimensions.length ??
        dimensions.l ??
        "-";

      const width =
        dimensions.width ??
        dimensions.w ??
        "-";

      const height =
        dimensions.height ??
        dimensions.h ??
        "-";

      return `L: ${length} × W: ${width} × H: ${height}`;
    };

  /* =====================================================
     GALLERY
  ===================================================== */

  const galleryImages = [];

  if (featuredImage) {
    galleryImages.push(
      featuredImage
    );
  }

  /*
    Saved MongoDB product can have:
    image
    featuredImage
    images[]
  */

  const savedImages =
    productInformation?.images;

  if (
    Array.isArray(savedImages)
  ) {
    savedImages.forEach(
      (image) => {
        const imageUrl =
          typeof image ===
          "string"
            ? image
            : image?.url ||
              image?.previewUrl ||
              image?.src ||
              image?.path ||
              "";

        if (
          imageUrl &&
          !galleryImages.includes(
            imageUrl
          )
        ) {
          galleryImages.push(
            imageUrl
          );
        }
      }
    );
  }

  if (
    Array.isArray(images)
  ) {
    images.forEach(
      (image) => {
        const imageUrl =
          typeof image ===
          "string"
            ? image
            : image?.url ||
              image?.previewUrl ||
              image?.src ||
              image?.path ||
              "";

        if (
          imageUrl &&
          !galleryImages.includes(
            imageUrl
          )
        ) {
          galleryImages.push(
            imageUrl
          );
        }
      }
    );
  }

  /* =====================================================
     PREVIEW CONTENT
     PORTAL = ABOVE SIDEBAR / NAV / TINYMCE
  ===================================================== */

  const previewPopup =
    showPreview
      ? createPortal(
          <div
            className="ppv-overlay"
            onMouseDown={(e) => {
              if (
                e.target ===
                e.currentTarget
              ) {
                handleClosePreview();
              }
            }}
          >
            <div className="ppv-modal">

              {/* =====================================================
                  HEADER
              ===================================================== */}

              <div className="ppv-modal-header">

                <div className="ppv-modal-heading">

                  <div className="ppv-modal-icon">
                    <FiEye />
                  </div>

                  <div>
                    <h2>
                      Store Preview
                    </h2>

                    <p>
                      This is how your
                      product will appear
                      to customers.
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  className="ppv-close-btn"
                  onClick={
                    handleClosePreview
                  }
                  aria-label="Close preview"
                >
                  <FiX />
                </button>

              </div>

              {/* =====================================================
                  BODY
              ===================================================== */}

              <div className="ppv-modal-body">

                {/* =====================================================
                    IMAGE SECTION
                ===================================================== */}

                <div className="ppv-preview-gallery">

                  <div className="ppv-preview-main-image">

                    {hasDiscount && (
                      <span className="ppv-preview-discount">
                        {discountPercentage}%
                        OFF
                      </span>
                    )}

                    {featuredImage ? (
                      <img
                        src={getImageUrl(
                          featuredImage
                        )}
                        alt={
                          productName ||
                          "Product"
                        }
                      />
                    ) : (
                      <div className="ppv-preview-empty-image">

                        <FiPackage />

                        <span>
                          No Product Image
                        </span>

                      </div>
                    )}

                  </div>

                  {/* =====================================================
                      THUMBNAILS
                  ===================================================== */}

                  {galleryImages.length >
                    1 && (
                    <div className="ppv-preview-thumbnails">

                      {galleryImages.map(
                        (
                          image,
                          index
                        ) => {
                          const imageUrl =
                            getImageUrl(
                              image
                            );

                          return (
                            <button
                              type="button"
                              key={`${imageUrl}-${index}`}
                              className={`ppv-preview-thumbnail ${
                                image ===
                                featuredImage
                                  ? "ppv-preview-thumbnail-active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSelectImage(
                                  image
                                )
                              }
                            >
                              <img
                                src={
                                  imageUrl
                                }
                                alt={`Product ${
                                  index +
                                  1
                                }`}
                              />
                            </button>
                          );
                        }
                      )}

                    </div>
                  )}

                  {/* =====================================================
                      BENEFITS
                  ===================================================== */}

                  <div className="ppv-preview-benefits">

                    <div>
                      <FiTruck />

                      <span>
                        {freeShipping
                          ? "Free Shipping"
                          : "Fast & Safe Shipping"}
                      </span>
                    </div>

                    <div>
                      <FiCheckCircle />

                      <span>
                        Secure Checkout
                      </span>
                    </div>

                  </div>

                </div>

                {/* =====================================================
                    PRODUCT DETAILS
                ===================================================== */}

                <div className="ppv-preview-details">

                  {brand && (
                    <div className="ppv-preview-brand">
                      {brand}
                    </div>
                  )}

                  <h1>
                    {productName ||
                      "Product Name"}
                  </h1>

                  {/* =====================================================
                      RATING
                  ===================================================== */}

                  <div className="ppv-preview-rating">

                    <span>
                      {"★".repeat(
                        Math.min(
                          5,
                          Math.max(
                            0,
                            Math.round(
                              rating
                            )
                          )
                        )
                      )}

                      {"☆".repeat(
                        5 -
                          Math.min(
                            5,
                            Math.max(
                              0,
                              Math.round(
                                rating
                              )
                            )
                          )
                      )}
                    </span>

                    <b>
                      {rating.toFixed(
                        1
                      )}
                    </b>

                    <small>
                      {reviews} Reviews
                    </small>

                  </div>

                  {/* =====================================================
                      PRICE
                  ===================================================== */}

                  <div className="ppv-preview-price">

                    <strong>
                      ₹
                      {displayPrice.toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </strong>

                    {hasDiscount && (
                      <>
                        <del>
                          ₹
                          {regularPrice.toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </del>

                        <span>
                          Save ₹
                          {(
                            regularPrice -
                            salePrice
                          ).toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </span>
                      </>
                    )}

                  </div>

                  {/* =====================================================
                      SHORT DESCRIPTION
                  ===================================================== */}

                  <p className="ppv-preview-short-description">
                    {shortDescription ||
                      "No short description added."}
                  </p>

                  {/* =====================================================
                      STOCK
                  ===================================================== */}

                  <div className="ppv-preview-stock-row">

                    <span
                      className={`ppv-preview-stock ppv-preview-stock-${stockStatus
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          "-"
                        )}`}
                    >
                      <i />

                      {stockStatus}
                    </span>

                    {stock > 0 && (
                      <small>
                        {stock} items
                        available
                      </small>
                    )}

                  </div>

                  {/* =====================================================
                      PRODUCT INFORMATION
                  ===================================================== */}

                  <div className="ppv-preview-info">

                    <div>
                      <span>
                        Product Name
                      </span>

                      <strong>
                        {formatValue(
                          productName
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        SKU
                      </span>

                      <strong>
                        {formatValue(
                          sku
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Category
                      </span>

                      <strong>
                        {formatValue(
                          category
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Brand
                      </span>

                      <strong>
                        {formatValue(
                          brand
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Regular Price
                      </span>

                      <strong>
                        ₹
                        {regularPrice.toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Sale Price
                      </span>

                      <strong>
                        ₹
                        {salePrice.toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Cost Price
                      </span>

                      <strong>
                        ₹
                        {costPrice.toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Price
                      </span>

                      <strong>
                        ₹
                        {price.toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Tax Class
                      </span>

                      <strong>
                        {formatValue(
                          taxClass
                        )}
                      </strong>
                    </div>

                  </div>

                  {/* =====================================================
                      INVENTORY
                  ===================================================== */}

                  <div className="ppv-preview-section-title">
                    Inventory
                  </div>

                  <div className="ppv-preview-info">

                    <div>
                      <span>
                        Stock
                      </span>

                      <strong>
                        {stock}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Stock Quantity
                      </span>

                      <strong>
                        {stock}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Low Stock Threshold
                      </span>

                      <strong>
                        {lowStockThreshold}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Track Inventory
                      </span>

                      <strong>
                        {formatBoolean(
                          trackInventory
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Allow Backorders
                      </span>

                      <strong>
                        {formatBoolean(
                          allowBackorders
                        )}
                      </strong>
                    </div>

                  </div>

                  {/* =====================================================
                      SHIPPING
                  ===================================================== */}

                  <div className="ppv-preview-section-title">
                    Shipping
                  </div>

                  <div className="ppv-preview-info">

                    <div>
                      <span>
                        Weight
                      </span>

                      <strong>
                        {weight !==
                        ""
                          ? `${weight} kg`
                          : "Not available"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Dimensions
                      </span>

                      <strong>
                        {getDimensionsText()}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Shipping Class
                      </span>

                      <strong>
                        {formatValue(
                          shippingClass
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Free Shipping
                      </span>

                      <strong>
                        {formatBoolean(
                          freeShipping
                        )}
                      </strong>
                    </div>

                  </div>

                  {/* =====================================================
                      PUBLISH INFORMATION
                  ===================================================== */}

                  <div className="ppv-preview-section-title">
                    Publish Information
                  </div>

                  <div className="ppv-preview-info">

                    <div>
                      <span>
                        Status
                      </span>

                      <strong>
                        {formatValue(
                          status
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Visibility
                      </span>

                      <strong>
                        {formatValue(
                          visibility
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Published At
                      </span>

                      <strong>
                        {formatDate(
                          publishedAt
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Created At
                      </span>

                      <strong>
                        {formatDate(
                          createdAt
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Updated At
                      </span>

                      <strong>
                        {formatDate(
                          updatedAt
                        )}
                      </strong>
                    </div>

                  </div>

                  {/* =====================================================
                      TAGS
                  ===================================================== */}

                  {tags.length >
                    0 && (
                    <div className="ppv-preview-tags">

                      {tags.map(
                        (
                          tag,
                          index
                        ) => (
                          <span
                            key={
                              index
                            }
                          >
                            #{tag}
                          </span>
                        )
                      )}

                    </div>
                  )}

                  {/* =====================================================
                      SEO
                  ===================================================== */}

                  <div className="ppv-preview-section-title">
                    SEO Information
                  </div>

                  <div className="ppv-preview-info">

                    <div>
                      <span>
                        Meta Title
                      </span>

                      <strong>
                        {formatValue(
                          metaTitle
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        URL Slug
                      </span>

                      <strong>
                        {formatValue(
                          urlSlug
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Meta Description
                      </span>

                      <strong>
                        {formatValue(
                          metaDescription
                        )}
                      </strong>
                    </div>

                  </div>

                  {/* =====================================================
                      DESCRIPTION
                  ===================================================== */}

                  <div className="ppv-preview-description">

                    <h3>
                      Description
                    </h3>

                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          description ||
                          "<p>No description added.</p>",
                      }}
                    />

                  </div>

                </div>

              </div>

              {/* =====================================================
                  FOOTER
              ===================================================== */}

              <div className="ppv-modal-footer">

                <div className="ppv-preview-status">

                  <span />

                  Product Status:
                  {" "}

                  <strong>
                    {status}
                  </strong>

                </div>

                <div className="ppv-footer-actions">

                  <button
                    type="button"
                    className="ppv-footer-close"
                    onClick={
                      handleClosePreview
                    }
                  >
                    Continue Editing
                  </button>

                  <button
                    type="button"
                    className="ppv-footer-save"
                    onClick={async () => {
                      handleClosePreview();

                      if (
                        onSaveProduct
                      ) {
                        await onSaveProduct();
                      }
                    }}
                    disabled={saving}
                  >
                    <FiSave />

                    {saving
                      ? "Saving..."
                      : "Save Product"}
                  </button>

                </div>

              </div>

            </div>
          </div>,

          document.body
        )
      : null;

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      <div className="ppv-sidebar">

        {/* =====================================================
            ACTION BUTTONS
        ===================================================== */}

        <div className="ppv-actions">

          <button
            type="button"
            className="ppv-action-btn ppv-action-preview"
            onClick={
              handlePreviewProduct
            }
          >
            <FiEye />

            <span>
              Preview Product
            </span>
          </button>

          <button
            type="button"
            className="ppv-action-btn ppv-action-save"
            onClick={
              onSaveProduct
            }
            disabled={saving}
          >
            <FiSave />

            <span>
              {saving
                ? "Saving..."
                : "Save Product"}
            </span>
          </button>

        </div>

        {/* =====================================================
            PUBLISH
        ===================================================== */}

        <div className="ppv-card">

          <div className="ppv-card-heading">

            <div className="ppv-card-icon ppv-icon-blue">
              <FiSend />
            </div>

            <h2>
              Publish
            </h2>

          </div>

          <div className="ppv-field">

            <label>
              Status
            </label>

            <div className="ppv-select-box">

              <select
                value={
                  publishData.status
                }
                onChange={(e) =>
                  setPublishData({
                    ...publishData,
                    status:
                      e.target.value,
                  })
                }
              >

                <option value="Published">
                  Published
                </option>

                <option value="Draft">
                  Draft
                </option>

                <option value="Pending">
                  Pending
                </option>

              </select>

              <FiChevronDown />

            </div>

          </div>

          <div className="ppv-field ppv-space-top">

            <label>
              Visibility
            </label>

            <div className="ppv-select-box">

              <select
                value={
                  publishData.visibility
                }
                onChange={(e) =>
                  setPublishData({
                    ...publishData,
                    visibility:
                      e.target.value,
                  })
                }
              >

                <option value="Public">
                  Public
                </option>

                <option value="Private">
                  Private
                </option>

                <option value="Password Protected">
                  Password Protected
                </option>

              </select>

              <FiChevronDown />

            </div>

          </div>

          <div className="ppv-field ppv-space-top">

            <label>
              Published At
            </label>

            <div className="ppv-input-icon-box">

              <input
                type="datetime-local"
                value={
                  publishData.publishedAt
                }
                onChange={(e) =>
                  setPublishData({
                    ...publishData,
                    publishedAt:
                      e.target.value,
                  })
                }
              />

              <FiCalendar />

            </div>

          </div>

          <div className="ppv-publish-status">

            <strong>
              ✓{" "}
              {publishData.status}
            </strong>

            <span>
              {publishData.status ===
              "Published"
                ? "Product is live on the store"
                : "Product is not live on the store"}
            </span>

          </div>

        </div>

        {/* =====================================================
            CATEGORY
        ===================================================== */}

        <div className="ppv-card ppv-card-gap">

          <div className="ppv-card-heading">

            <div className="ppv-card-icon ppv-icon-purple">
              <FiFolder />
            </div>

            <h2>
              Product Categories
            </h2>

          </div>

          <div className="ppv-select-box">

            <select
              value={
                selectedCategory
              }
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
            >

              <option value="">
                {loadingCategories
                  ? "Loading..."
                  : "Select Category"}
              </option>

              {categoryList.map(
                (category) => {
                  const name =
                    getCategoryName(
                      category
                    );

                  if (!name) {
                    return null;
                  }

                  return (
                    <option
                      key={
                        category._id ||
                        category.id ||
                        name
                      }
                      value={name}
                    >
                      {name}
                    </option>
                  );
                }
              )}

            </select>

            <FiChevronDown />

          </div>

          {showAddCategory ? (
            <form
              className="ppv-inline-form"
              onSubmit={
                handleAddCategorySubmit
              }
            >

              <input
                type="text"
                placeholder="Category name"
                value={
                  newCategoryName
                }
                onChange={(e) =>
                  setNewCategoryName(
                    e.target.value
                  )
                }
              />

              <button type="submit">
                Add
              </button>

            </form>
          ) : (
            <button
              type="button"
              className="ppv-link-btn"
              onClick={() =>
                setShowAddCategory(
                  true
                )
              }
            >
              <FiPlus />

              Add New Category
            </button>
          )}

        </div>

        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="ppv-card ppv-card-gap">

          <div className="ppv-card-heading">

            <div className="ppv-card-icon ppv-icon-orange">
              <FiBookmark />
            </div>

            <h2>
              Product Brands
            </h2>

          </div>

          <div className="ppv-select-box">

            <select
              value={
                selectedBrand
              }
              onChange={(e) =>
                setSelectedBrand(
                  e.target.value
                )
              }
            >

              <option value="">
                {loadingBrands
                  ? "Loading..."
                  : "Select Brand"}
              </option>

              {brandList.map(
                (brand) => {
                  const name =
                    getBrandName(
                      brand
                    );

                  if (!name) {
                    return null;
                  }

                  return (
                    <option
                      key={
                        brand._id ||
                        brand.id ||
                        name
                      }
                      value={name}
                    >
                      {name}
                    </option>
                  );
                }
              )}

            </select>

            <FiChevronDown />

          </div>

          {showAddBrand ? (
            <form
              className="ppv-inline-form"
              onSubmit={
                handleAddBrandSubmit
              }
            >

              <input
                type="text"
                placeholder="Brand name"
                value={
                  newBrandName
                }
                onChange={(e) =>
                  setNewBrandName(
                    e.target.value
                  )
                }
              />

              <button type="submit">
                Add
              </button>

            </form>
          ) : (
            <button
              type="button"
              className="ppv-link-btn"
              onClick={() =>
                setShowAddBrand(
                  true
                )
              }
            >
              <FiPlus />

              Add New Brand
            </button>
          )}

        </div>

        {/* =====================================================
            TAGS
        ===================================================== */}

        <div className="ppv-card ppv-card-gap">

          <div className="ppv-card-heading">

            <div className="ppv-card-icon ppv-icon-red">
              <FiTag />
            </div>

            <h2>
              Product Tags
            </h2>

          </div>

          <input
            className="ppv-input"
            type="text"
            placeholder="Add tag and press Enter"
            value={tagInput}
            onChange={(e) =>
              setTagInput(
                e.target.value
              )
            }
            onKeyDown={
              handleTagKeyDown
            }
          />

          {tags.length > 0 && (
            <div className="ppv-tags">

              {tags.map(
                (
                  tag,
                  index
                ) => (
                  <span
                    key={index}
                    className="ppv-tag"
                  >

                    {tag}

                    <button
                      type="button"
                      onClick={() =>
                        removeTag(
                          tag
                        )
                      }
                    >
                      <FiX />
                    </button>

                  </span>
                )
              )}

            </div>
          )}

        </div>

        {/* =====================================================
            FEATURED IMAGE
        ===================================================== */}

        <div className="ppv-card ppv-card-gap">

          <div className="ppv-card-heading">

            <div className="ppv-card-icon ppv-icon-yellow">
              <FiImage />
            </div>

            <h2>
              Featured Image
            </h2>

          </div>

          <div className="ppv-featured-box">

            {featuredImage ? (
              <img
                src={getImageUrl(
                  featuredImage
                )}
                alt="Featured"
                className="ppv-featured-image"
              />
            ) : (
              <div className="ppv-no-image">
                No image selected
              </div>
            )}

            <label className="ppv-change-image">

              Change Image

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
              />

            </label>

          </div>

        </div>

      </div>

      {/* =====================================================
          PORTAL POPUP
      ===================================================== */}

      {previewPopup}
    </>
  );
};

export default ProductPreview;