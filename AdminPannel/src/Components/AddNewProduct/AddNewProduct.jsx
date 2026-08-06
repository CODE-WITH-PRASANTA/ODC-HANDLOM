import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import "./AddNewProduct.css";

const INITIAL_GALLERY = [
  "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=200&h=250&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=250&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&h=250&fit=crop",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&h=250&fit=crop",
];

export default function AddNewProduct() {
  const navigate = useNavigate();
  // Form States
  const [productName, setProductName] = useState("Armani Veni Vidi Vici");
  const [slug, setSlug] = useState("armani-veni-vidi-vici");
  const [shortDesc, setShortDesc] = useState("Premium designer top with soft breathable fabric.");
  const [description, setDescription] = useState(
    "<p>Elegant and stylish top made from premium quality fabric. Perfect for casual daily wear and summer outings.</p><ul><li>Soft and breathable fabric</li><li>Comfortable regular fit</li><li>Easy to pair with any outfit</li></ul>"
  );

  // Dropdown States
  const [category, setCategory] = useState("Tops");
  const [subCategory, setSubCategory] = useState("T-Shirts");
  const [brand, setBrand] = useState("Armani");
  const [collection, setCollection] = useState("Summer Collection");
  const [status, setStatus] = useState("Published");
  const [visibility, setVisibility] = useState("Public");
  const [taxClass, setTaxClass] = useState("GST 18%");

  // Pricing & Inventory (INR)
  const [regularPrice, setRegularPrice] = useState("1499");
  const [salePrice, setSalePrice] = useState("1299");
  const [onSale, setOnSale] = useState(true);
  const [taxRate, setTaxRate] = useState("18");
  const [sku, setSku] = useState("ARM-VVV-001");
  const [barcode, setBarcode] = useState("8901234567890");
  const [stockQty, setStockQty] = useState("150");
  const [lowStockThreshold, setLowStockThreshold] = useState("10");

  // Media States
  const [galleryImages, setGalleryImages] = useState(INITIAL_GALLERY);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");

  // Tags & Toggles
  const [tags, setTags] = useState(["Top", "Armani", "Summer", "Casual", "Women"]);
  const [tagInput, setTagInput] = useState("");
  const [toggles, setToggles] = useState({
    featured: true,
    newArrival: true,
    bestSeller: false,
    trending: false,
    allowBackorders: false,
  });
  const [selectedSize, setSelectedSize] = useState("S");

  // Refs for hidden inputs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // --- HANDLERS ---

  // Tag Handlers
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const toggleSwitch = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newUrls = files.map((file) => URL.createObjectURL(file));
      setGalleryImages((prev) => [...prev, ...newUrls]);
    }
  };

  const handleDeleteImage = (indexToDelete) => {
    if (galleryImages.length <= 1) {
      alert("At least one image is required.");
      return;
    }
    const updated = galleryImages.filter((_, idx) => idx !== indexToDelete);
    setGalleryImages(updated);
    if (selectedImageIndex >= updated.length) {
      setSelectedImageIndex(0);
    }
  };

  // Video Handlers
  const handleVideoChange = (file) => {
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert("Video size exceeds maximum limit of 50MB.");
        return;
      }
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDropVideo = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoChange(e.dataTransfer.files[0]);
    }
  };

  // Save as Draft
  const handleSaveDraft = () => {
    const draftData = {
      productName,
      slug,
      shortDesc,
      description,
      category,
      subCategory,
      brand,
      collection,
      regularPrice,
      salePrice,
      onSale,
      sku,
      stockQty,
      status: "Draft",
      tags,
      toggles,
    };
    localStorage.setItem("product_draft", JSON.stringify(draftData));
    alert("Product draft saved successfully!");
  };

  return (
    <div className="anp-page">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        multiple
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={videoInputRef}
        onChange={(e) => handleVideoChange(e.target.files[0])}
        accept="video/mp4,video/quicktime"
        style={{ display: "none" }}
      />

      {/* Header */}
      <div className="anp-header">
        <div>
          <h1 className="anp-title">Add New Product</h1>
          <div className="anp-breadcrumb">
            <span>Dashboard</span>
            <span className="anp-breadcrumb-sep">›</span>
            <span>Products</span>
            <span className="anp-breadcrumb-sep">›</span>
            <span className="anp-breadcrumb-active">Add New Product</span>
          </div>
        </div>
        <div className="anp-header-actions">
           <button className="anp-btn anp-btn-outline" onClick={handleSaveDraft}>
            <span>🗎</span> Save as Draft
          </button>
          <button className="anp-btn anp-btn-primary">
            <span>→</span> Publish Product
          </button>
        </div>
      </div>

      <div className="anp-body">
        {/* Main Content */}
        <main className="anp-main">
          {/* Basic Information Card */}
          <section className="anp-card">
            <h2 className="anp-card-title">Basic Information</h2>

            <div className="anp-field">
              <label>
                Product Name <span className="req">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="anp-field">
              <label>
                Slug <span className="req">*</span>
              </label>
              <div className="anp-input-with-icon">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <span className="anp-info-icon" title="Unique URL slug for this product">
                  ⓘ
                </span>
              </div>
              <p className="anp-hint">Unique URL slug for product identification</p>
            </div>

            <div className="anp-field">
              <label>
                Short Description <span className="req">*</span>
              </label>
              <textarea
                rows={2}
                maxLength={160}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
              />
              <p className="anp-hint anp-hint-right">
                {shortDesc.length} / 160
              </p>
            </div>

            {/* TinyMCE Rich Text Editor Integration */}
            <div className="anp-field">
              <label>
                Description <span className="req">*</span>
              </label>
              <div className="anp-editor-wrap">
                <Editor
                  apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu" // Insert your TinyMCE API key here if required
                  value={description}
                  onEditorChange={(newContent) => setDescription(newContent)}
                  init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                      "advlist", "autolink", "lists", "link", "image", "charmap",
                      "preview", "anchor", "searchreplace", "visualblocks",
                      "code", "fullscreen", "insertdatetime", "media", "table", "code", "help"
                    ],
                    toolbar:
                      "undo redo | blocks | bold italic underline | " +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist outdent indent | link image table | removeformat",
                    content_style:
                      "body { font-family:Inter,sans-serif; font-size:14px; color:#334155; }",
                  }}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="anp-field-row">
              <div className="anp-field">
                <label>
                  Category <span className="req">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Tops">Tops</option>
                  <option value="Ethnic Wear">Ethnic Wear</option>
                  <option value="Western Wear">Western Wear</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Footwear">Footwear</option>
                </select>
              </div>

              <div className="anp-field">
                <label>Sub Category</label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Kurtis">Kurtis</option>
                  <option value="Crop Tops">Crop Tops</option>
                  <option value="Tunics">Tunics</option>
                </select>
              </div>
            </div>

            {/* Brand & Collection */}
            <div className="anp-field-row">
              <div className="anp-field">
                <label>
                  Brand <span className="req">*</span>
                </label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                  <option value="Armani">Armani</option>
                  <option value="Zara">Zara</option>
                  <option value="H&M">H&M</option>
                  <option value="FabIndia">FabIndia</option>
                  <option value="Biba">Biba</option>
                </select>
              </div>

              <div className="anp-field">
                <label>Collection</label>
                <select
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                >
                  <option value="Summer Collection">Summer Collection</option>
                  <option value="Festive Edition">Festive Edition</option>
                  <option value="Winter Wear">Winter Wear</option>
                  <option value="Casual Basics">Casual Basics</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="anp-field">
              <label>Tags</label>
              <div className="anp-tags-box">
                {tags.map((tag) => (
                  <span className="anp-tag" key={tag}>
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                className="anp-tag-input"
                placeholder="Add tag and press enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
              />
            </div>
          </section>

          {/* Pricing & Inventory Row */}
          <div className="anp-two-col">
            <section className="anp-card">
              <h2 className="anp-card-title">Pricing (INR)</h2>
              <div className="anp-field-row">
                <div className="anp-field">
                  <label>
                    Regular Price (₹) <span className="req">*</span>
                  </label>
                  <input
                    type="number"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                  />
                </div>
                <div className="anp-field">
                  <label>Sale Price (₹)</label>
                  <div className="anp-sale-price-row">
                    <input
                      type="number"
                      value={salePrice}
                      disabled={!onSale}
                      onChange={(e) => setSalePrice(e.target.value)}
                    />
                    <label className="anp-checkbox">
                      <input
                        type="checkbox"
                        checked={onSale}
                        onChange={() => setOnSale(!onSale)}
                      />
                      On Sale
                    </label>
                  </div>
                </div>
              </div>
              <div className="anp-field-row">
                <div className="anp-field">
                  <label>Tax Class</label>
                  <select
                    value={taxClass}
                    onChange={(e) => setTaxClass(e.target.value)}
                  >
                    <option value="GST 0%">GST 0% (Exempted)</option>
                    <option value="GST 5%">GST 5%</option>
                    <option value="GST 12%">GST 12%</option>
                    <option value="GST 18%">GST 18% (Standard)</option>
                    <option value="GST 28%">GST 28%</option>
                  </select>
                </div>
                <div className="anp-field">
                  <label>Tax Rate (%)</label>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="anp-card">
              <h2 className="anp-card-title">Inventory</h2>
              <div className="anp-field-row">
                <div className="anp-field">
                  <label>
                    SKU <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </div>
                <div className="anp-field">
                  <label>Barcode (GTIN/EAN)</label>
                  <input
                    type="text"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                  />
                </div>
              </div>
              <div className="anp-field-row">
                <div className="anp-field">
                  <label>
                    Stock Quantity <span className="req">*</span>
                  </label>
                  <input
                    type="number"
                    value={stockQty}
                    onChange={(e) => setStockQty(e.target.value)}
                  />
                </div>
                <div className="anp-field">
                  <label>Low Stock Threshold</label>
                  <input
                    type="number"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                  />
                </div>
              </div>
              <div className="anp-toggle-row">
                <div>
                  <p className="anp-toggle-label">Allow Backorders</p>
                  <p className="anp-toggle-desc">
                    Allow customers to order when stock reaches 0
                  </p>
                </div>
                <label className="anp-switch">
                  <input
                    type="checkbox"
                    checked={toggles.allowBackorders}
                    onChange={() => toggleSwitch("allowBackorders")}
                  />
                  <span className="anp-slider" />
                </label>
              </div>
            </section>
          </div>
        </main>

        {/* Center-Right Column: Images & Gallery */}
        <section className="anp-card anp-gallery-card">
          <h2 className="anp-card-title">Images &amp; Gallery</h2>
          <p className="anp-card-subtitle">
            Upload high quality images of your product
          </p>

          <div className="anp-main-image-wrap">
            <span className="anp-main-image-badge">Main Image</span>
            <div className="anp-main-image-actions">
              <button
                type="button"
                title="Edit"
                onClick={() => imageInputRef.current.click()}
              >
                ✎
              </button>
              <button
                type="button"
                title="Delete"
                onClick={() => handleDeleteImage(selectedImageIndex)}
              >
                🗑
              </button>
            </div>
            <img
              src={galleryImages[selectedImageIndex] || galleryImages[0]}
              alt="Main product visual"
            />
          </div>

          <div className="anp-thumb-row">
            {galleryImages.map((src, i) => (
              <div
                className={`anp-thumb ${
                  selectedImageIndex === i ? "active" : ""
                }`}
                key={i}
                onClick={() => setSelectedImageIndex(i)}
              >
                <img src={src} alt={`thumb-${i}`} />
              </div>
            ))}
            <button
              type="button"
              className="anp-thumb anp-thumb-add"
              onClick={() => imageInputRef.current.click()}
            >
              <span>+</span>
              Add More
            </button>
          </div>

          {/* Video Section */}
          <p className="anp-video-label">Video (Optional)</p>
          {videoPreviewUrl ? (
            <div className="anp-video-preview-wrap">
              <video src={videoPreviewUrl} controls className="anp-video-player" />
              <button
                type="button"
                className="anp-video-remove-btn"
                onClick={() => {
                  setVideoFile(null);
                  setVideoPreviewUrl("");
                }}
              >
                Remove Video
              </button>
            </div>
          ) : (
            <div
              className="anp-video-drop"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropVideo}
              onClick={() => videoInputRef.current.click()}
            >
              <div className="anp-video-icon">🎬</div>
              <p>Drag &amp; drop a video here or click to upload</p>
              <p className="anp-video-hint">MP4, MOV up to 50MB</p>
            </div>
          )}
        </section>

        {/* Right Sidebar */}
        <aside className="anp-right-col">
          <section className="anp-card">
            <h2 className="anp-card-title">Product Status</h2>

            <div className="anp-field">
              <label>
                Status <span className="req">*</span>
              </label>
              <select
                className="anp-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="anp-field">
              <label>
                Visibility <span className="req">*</span>
              </label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Password Protected">Password Protected</option>
              </select>
            </div>

            <div className="anp-toggle-row">
              <div>
                <p className="anp-toggle-label">Featured Product</p>
                <p className="anp-toggle-desc">
                  Show on homepage and featured sections
                </p>
              </div>
              <label className="anp-switch">
                <input
                  type="checkbox"
                  checked={toggles.featured}
                  onChange={() => toggleSwitch("featured")}
                />
                <span className="anp-slider" />
              </label>
            </div>

            <div className="anp-toggle-row">
              <div>
                <p className="anp-toggle-label">New Arrival</p>
                <p className="anp-toggle-desc">Show as new arrival badge</p>
              </div>
              <label className="anp-switch">
                <input
                  type="checkbox"
                  checked={toggles.newArrival}
                  onChange={() => toggleSwitch("newArrival")}
                />
                <span className="anp-slider" />
              </label>
            </div>

            <div className="anp-toggle-row">
              <div>
                <p className="anp-toggle-label">Best Seller</p>
                <p className="anp-toggle-desc">Show as best seller item</p>
              </div>
              <label className="anp-switch">
                <input
                  type="checkbox"
                  checked={toggles.bestSeller}
                  onChange={() => toggleSwitch("bestSeller")}
                />
                <span className="anp-slider" />
              </label>
            </div>

            <div className="anp-toggle-row">
              <div>
                <p className="anp-toggle-label">Trending Product</p>
                <p className="anp-toggle-desc">Highlight in trending sections</p>
              </div>
              <label className="anp-switch">
                <input
                  type="checkbox"
                  checked={toggles.trending}
                  onChange={() => toggleSwitch("trending")}
                />
                <span className="anp-slider" />
              </label>
            </div>
          </section>

          <section className="anp-card">
            <h2 className="anp-card-title">Product Summary</h2>
            <div className="anp-summary-row">
              <span className="anp-summary-label">🗐 Type</span>
              <span className="anp-summary-value">Simple Product</span>
            </div>
            <div className="anp-summary-row">
              <span className="anp-summary-label">🕓 Created On</span>
              <span className="anp-summary-value">01 Aug, 2026 12:50 PM</span>
            </div>
            <div className="anp-summary-row">
              <span className="anp-summary-label">👤 Created By</span>
              <span className="anp-summary-value">Admin User</span>
            </div>
          </section>

          <section className="anp-card">
            <h2 className="anp-card-title">Preview</h2>
            <div className="anp-preview">
              <img
                className="anp-preview-img"
                src={galleryImages[0]}
                alt="Preview"
              />
              <div className="anp-preview-info">
                <p className="anp-preview-name">{productName || "Product Name"}</p>
                <p className="anp-preview-price">
                  ₹{onSale && salePrice ? salePrice : regularPrice}{" "}
                  {onSale && salePrice && (
                    <span className="anp-preview-strike">₹{regularPrice}</span>
                  )}
                </p>
                <p className="anp-preview-desc">{shortDesc}</p>
                <div className="anp-preview-colors">
                  <span className="anp-color-dot" style={{ background: "#e8792e" }} />
                  <span className="anp-color-dot" style={{ background: "#f472b6" }} />
                  <span className="anp-color-dot" style={{ background: "#7c3aed" }} />
                  <span className="anp-color-dot" style={{ background: "#dc2626" }} />
                </div>
                <div className="anp-preview-sizes">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      type="button"
                      key={size}
                      className={`anp-size-btn ${
                        selectedSize === size ? "active" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
             <button
      type="button"
      className="anp-btn anp-btn-view-full"
      onClick={() => navigate("/previewproduct")}
    >
      View Full Product →
    </button>
          </section>
        </aside>
      </div>
    </div>
  );
}