import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ProductInformation from "../../Components/ProductInformation/ProductInformation";
import ProductImages from "../../Components/ProductImages/ProductImages";
import Pricingstock from "../../Components/Pricingstock/Pricingstock";
import SeoSetting from "../../Components/SeoSetting/SeoSetting";
import ProductPreview from "../../Components/ProductPreview/ProductPreview";

import API from "../../api/axios";

const Addproduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEditMode = Boolean(id);

  // =========================================================
  // PRODUCT INFORMATION
  // =========================================================

  const [
    productInformation,
    setProductInformation,
  ] = useState({
    productName: "",
    sku: "",
    shortDescription: "",
    description: "",
  });

  // =========================================================
  // PRICING & STOCK
  // =========================================================

  const [
    pricingData,
    setPricingData,
  ] = useState({
    regularPrice: "",
    salePrice: "",
    costPrice: "",
    taxClass: "Standard",
    stockQuantity: "",
    lowStockThreshold: "10",
    trackInventory: true,
    allowBackorders: false,
    weight: "",
    length: "",
    width: "",
    height: "",
    shippingClass: "Standard",
    freeShipping: false,
  });

  // =========================================================
  // SEO
  // =========================================================

  const [
    seoData,
    setSeoData,
  ] = useState({
    metaTitle: "",
    urlSlug: "",
    metaDescription: "",
  });

  // =========================================================
  // IMAGES
  // =========================================================

  const [
    images,
    setImages,
  ] = useState([]);

  // =========================================================
  // PUBLISH DATA
  // =========================================================

  const [
    publishData,
    setPublishData,
  ] = useState({
    status: "Draft",
    visibility: "Public",
    publishedAt: "",
  });

  // =========================================================
  // CATEGORY
  // =========================================================

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  // =========================================================
  // BRAND
  // =========================================================

  const [
    selectedBrand,
    setSelectedBrand,
  ] = useState("");

  // =========================================================
  // TAGS
  // =========================================================

  const [
    tags,
    setTags,
  ] = useState([]);

  // =========================================================
  // LOADING
  // =========================================================

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  // =========================================================
  // GET IMAGE URL
  // =========================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("blob:")
    ) {
      return image;
    }

    return `http://localhost:5000${image}`;
  };

  // =========================================================
  // LOAD PRODUCT FOR EDIT
  // =========================================================

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);

        console.log(
          "LOADING PRODUCT:",
          id
        );

        const response = await API.get(
          `/products/${id}`
        );

        console.log(
          "PRODUCT DETAILS:",
          response.data
        );

        const product =
          response.data?.data;

        if (!product) {
          alert(
            "Product not found"
          );

          navigate(
            "/products/all-products"
          );

          return;
        }

        // =====================================================
        // PRODUCT INFORMATION
        // =====================================================

        setProductInformation({
          productName:
            product.name || "",

          sku:
            product.sku || "",

          shortDescription:
            product.shortDescription ||
            "",

          description:
            product.description ||
            product.desc ||
            "",
        });

        // =====================================================
        // PRICING & STOCK
        // =====================================================

        setPricingData({
          regularPrice:
            product.regularPrice ??
            product.price ??
            "",

          salePrice:
            product.salePrice ??
            "",

          costPrice:
            product.costPrice ??
            "",

          taxClass:
            product.taxClass ||
            "Standard",

          stockQuantity:
            product.stockQuantity ??
            product.stock ??
            "",

          lowStockThreshold:
            product.lowStockThreshold ??
            10,

          trackInventory:
            product.trackInventory ??
            true,

          allowBackorders:
            product.allowBackorders ??
            false,

          weight:
            product.weight ??
            "",

          length:
            product.dimensions?.length ??
            "",

          width:
            product.dimensions?.width ??
            "",

          height:
            product.dimensions?.height ??
            "",

          shippingClass:
            product.shippingClass ||
            "Standard",

          freeShipping:
            product.freeShipping ??
            false,
        });

        // =====================================================
        // SEO
        // =====================================================

        setSeoData({
          metaTitle:
            product.metaTitle ||
            "",

          urlSlug:
            product.urlSlug ||
            "",

          metaDescription:
            product.metaDescription ||
            "",
        });

        // =====================================================
        // CATEGORY
        // =====================================================

        setSelectedCategory(
          product.category || ""
        );

        // =====================================================
        // BRAND
        // =====================================================

        setSelectedBrand(
          product.brand || ""
        );

        // =====================================================
        // TAGS
        // =====================================================

        setTags(
          Array.isArray(
            product.tags
          )
            ? product.tags
            : []
        );

        // =====================================================
        // PUBLISH DATA
        // =====================================================

        let publishedAt = "";

        if (
          product.publishedAt
        ) {
          const date =
            new Date(
              product.publishedAt
            );

          if (
            !Number.isNaN(
              date.getTime()
            )
          ) {
            publishedAt =
              date
                .toISOString()
                .slice(0, 16);
          }
        }

        setPublishData({
          status:
            product.status ||
            "Draft",

          visibility:
            product.visibility ||
            "Public",

          publishedAt,
        });

        // =====================================================
        // EXISTING IMAGES
        // =====================================================

        let existingImages = [];

        if (
          Array.isArray(
            product.images
          )
        ) {
          existingImages =
            product.images;
        } else if (
          product.image
        ) {
          existingImages = [
            product.image,
          ];
        }

        const existingImageData =
          existingImages.map(
            (
              image,
              index
            ) => ({
              id:
                `existing-${product._id}-${index}`,

              url:
                getImageUrl(image),

              file: null,

              isCover:
                image ===
                product.featuredImage ||
                (
                  !product.featuredImage &&
                  index === 0
                ),
            })
          );

        setImages(
          existingImageData
        );

      } catch (error) {
        console.error(
          "LOAD PRODUCT ERROR:",
          error
        );

        console.error(
          "SERVER ERROR:",
          error.response?.data
        );

        alert(
          error.response?.data
            ?.message ||
            "Failed to load product"
        );

        navigate(
          "/products/all-products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();

  }, [
    id,
    navigate,
  ]);

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setProductInformation({
      productName: "",
      sku: "",
      shortDescription: "",
      description: "",
    });

    setPricingData({
      regularPrice: "",
      salePrice: "",
      costPrice: "",
      taxClass: "Standard",
      stockQuantity: "",
      lowStockThreshold: "10",
      trackInventory: true,
      allowBackorders: false,
      weight: "",
      length: "",
      width: "",
      height: "",
      shippingClass: "Standard",
      freeShipping: false,
    });

    setSeoData({
      metaTitle: "",
      urlSlug: "",
      metaDescription: "",
    });

    setImages([]);

    setPublishData({
      status: "Draft",
      visibility: "Public",
      publishedAt: "",
    });

    setSelectedCategory("");

    setSelectedBrand("");

    setTags([]);
  };

  // =========================================================
  // SAVE PRODUCT
  // =========================================================

  const handleSaveProduct =
    async () => {
      try {
        setSaving(true);

        // ===================================================
        // VALIDATION
        // ===================================================

        if (
          !productInformation.productName.trim()
        ) {
          alert(
            "Please enter product name"
          );

          return;
        }

        if (
          !selectedCategory
        ) {
          alert(
            "Please select category"
          );

          return;
        }

        if (
          !selectedBrand
        ) {
          alert(
            "Please select brand"
          );

          return;
        }

        if (
          !pricingData.regularPrice &&
          !pricingData.salePrice
        ) {
          alert(
            "Please enter product price"
          );

          return;
        }

        // ===================================================
        // FORMDATA
        // ===================================================

        const data =
          new FormData();

        // ===================================================
        // BASIC INFORMATION
        // ===================================================

        data.append(
          "name",
          productInformation.productName
        );

        data.append(
          "sku",
          productInformation.sku
        );

        data.append(
          "shortDescription",
          productInformation.shortDescription
        );

        data.append(
          "desc",
          productInformation.description
        );

        data.append(
          "description",
          productInformation.description
        );

        // ===================================================
        // CATEGORY
        // ===================================================

        data.append(
          "category",
          selectedCategory
        );

        // ===================================================
        // BRAND
        // ===================================================

        data.append(
          "brand",
          selectedBrand
        );

        // ===================================================
        // PRICE
        // ===================================================

        data.append(
          "regularPrice",
          pricingData.regularPrice
        );

        data.append(
          "salePrice",
          pricingData.salePrice
        );

        data.append(
          "costPrice",
          pricingData.costPrice
        );

        const finalPrice =
          pricingData.salePrice ||
          pricingData.regularPrice;

        data.append(
          "price",
          finalPrice
        );

        data.append(
          "taxClass",
          pricingData.taxClass
        );

        // ===================================================
        // STOCK
        // ===================================================

        data.append(
          "stockQuantity",
          pricingData.stockQuantity
        );

        data.append(
          "stock",
          pricingData.stockQuantity
        );

        data.append(
          "lowStockThreshold",
          pricingData.lowStockThreshold
        );

        data.append(
          "trackInventory",
          String(
            pricingData.trackInventory
          )
        );

        data.append(
          "allowBackorders",
          String(
            pricingData.allowBackorders
          )
        );

        // ===================================================
        // SHIPPING
        // ===================================================

        data.append(
          "weight",
          pricingData.weight
        );

        data.append(
          "length",
          pricingData.length
        );

        data.append(
          "width",
          pricingData.width
        );

        data.append(
          "height",
          pricingData.height
        );

        data.append(
          "shippingClass",
          pricingData.shippingClass
        );

        data.append(
          "freeShipping",
          String(
            pricingData.freeShipping
          )
        );

        // ===================================================
        // SEO
        // ===================================================

        data.append(
          "metaTitle",
          seoData.metaTitle
        );

        data.append(
          "urlSlug",
          seoData.urlSlug
        );

        data.append(
          "metaDescription",
          seoData.metaDescription
        );

        // ===================================================
        // PUBLISH
        // ===================================================

        data.append(
          "status",
          publishData.status
        );

        data.append(
          "visibility",
          publishData.visibility
        );

        if (
          publishData.publishedAt
        ) {
          data.append(
            "publishedAt",
            publishData.publishedAt
          );
        }

        // ===================================================
        // TAGS
        // ===================================================

        data.append(
          "tags",
          JSON.stringify(tags)
        );

        // ===================================================
        // IMAGES
        // ===================================================

        const realImages =
          images.filter(
            (img) =>
              img.file
          );

        realImages.forEach(
          (img) => {
            data.append(
              "images",
              img.file
            );
          }
        );

        // ===================================================
        // FEATURED IMAGE
        // ===================================================

        const coverImage =
          images.find(
            (img) =>
              img.isCover
          );

        if (
          coverImage?.file
        ) {
          const featuredIndex =
            realImages.findIndex(
              (img) =>
                img.id ===
                coverImage.id
            );

          if (
            featuredIndex >= 0
          ) {
            data.append(
              "featuredImageIndex",
              String(
                featuredIndex
              )
            );
          }
        }

        // ===================================================
        // DEBUG FORMDATA
        // ===================================================

        console.log(
          isEditMode
            ? "UPDATING PRODUCT..."
            : "CREATING PRODUCT..."
        );

        console.log(
          "PRODUCT ID:",
          id || "NEW"
        );

        for (
          const [
            key,
            value,
          ] of data.entries()
        ) {
          console.log(
            key,
            value
          );
        }

        // ===================================================
        // API REQUEST
        // ===================================================

        let response;

        if (
          isEditMode
        ) {
          response =
            await API.put(
              `/products/${id}`,
              data
            );
        } else {
          response =
            await API.post(
              "/products",
              data
            );
        }

        // ===================================================
        // RESPONSE
        // ===================================================

        console.log(
          "PRODUCT RESPONSE:",
          response.data
        );

        if (
          !response.data?.success
        ) {
          throw new Error(
            response.data
              ?.message ||
              "Product save failed"
          );
        }

        alert(
          isEditMode
            ? "Product updated successfully!"
            : "Product created successfully!"
        );

        // ===================================================
        // CREATE MODE
        // CLEAR FORM
        // ===================================================

        if (
          !isEditMode
        ) {
          resetForm();
        }

        // ===================================================
        // REDIRECT
        // ===================================================

        navigate(
          "/products/all-products"
        );

      } catch (error) {
        console.error(
          "SAVE PRODUCT ERROR:",
          error
        );

        console.error(
          "SERVER ERROR:",
          error.response?.data
        );

        alert(
          error.response?.data
            ?.message ||
            error.response?.data
              ?.error ||
            error.message ||
            "Failed to save product"
        );
      } finally {
        setSaving(false);
      }
    };

  // =========================================================
  // LOADING
  // =========================================================

  if (
    isEditMode &&
    loading
  ) {
    return (
      <div className="new-product-page">
        Loading product...
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="new-product-page">

      {/* Left Side */}

      <div className="left-content">

        <ProductInformation
          formData={
            productInformation
          }
          setFormData={
            setProductInformation
          }
        />

        <ProductImages
          images={images}
          setImages={
            setImages
          }
        />

        <Pricingstock
          formData={
            pricingData
          }
          setFormData={
            setPricingData
          }
        />

        <SeoSetting
          formData={
            seoData
          }
          setFormData={
            setSeoData
          }
        />

      </div>

      {/* Right Side */}

      <div className="right-sidebar">

        <ProductPreview
  publishData={publishData}
  setPublishData={setPublishData}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  selectedBrand={selectedBrand}
  setSelectedBrand={setSelectedBrand}
  tags={tags}
  setTags={setTags}
  images={images}
  setImages={setImages}
  productInformation={productInformation}
  pricingData={pricingData}
  seoData={seoData}
  onSaveProduct={handleSaveProduct}
  saving={saving}
  isEditMode={isEditMode}
/>

      </div>

    </div>
  );
};

export default Addproduct;