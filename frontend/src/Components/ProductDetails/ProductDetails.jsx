import React, { useState } from 'react';
import { 
  FaStar, 
  FaRegStar, 
  FaHeart, 
  FaRegHeart, 
  FaShoppingCart, 
  FaCheckCircle, 
  FaTruck, 
  FaUndo, 
  FaLock, 
  FaChevronLeft, 
  FaChevronRight, 
  FaPlay 
} from 'react-icons/fa';
import './ProductDetails.css';

// Import your local images from src/assets (adjust filenames as needed)
import backpackBlack from '../../assets/bag.png';
import backpackNavy from '../../assets/bag.png';
import backpackSage from '../../assets/bag1.png';
import backpackBurgundy from '../../assets/bag2.png';
import backpackSide from '../../assets/bag3.png';
import backpackBack from '../../assets/bag1.png';
import backpackDetail from '../../assets/bag3.png';

const ProductDetails = () => {
  // Product data updated with Indian Rupees (INR) pricing
  const product = {
    brand: "Nike",
    name: "Nike Sportswear RPM Backpack",
    rating: 4,
    reviewsCount: 128,
    sku: "NKB-00125",
    price: 10799.00,
    originalPrice: 13299.00,
    discount: "18% OFF",
    description: "The Nike Sportswear RPM Backpack offers ample storage for your daily commute. Padded shoulder straps and a back panel help you carry your gear comfortably, while multiple pockets help you stay organized.",
    inStock: true,
    itemsLeft: 12,
    colors: [
      { name: "Black", hex: "#111111", image: backpackBlack },
      { name: "Navy", hex: "#1d3557", image: backpackNavy },
      { name: "Sage", hex: "#6b705c", image: backpackSage },
      { name: "Burgundy", hex: "#6a040f", image: backpackBurgundy }
    ]
  };

  // Thumbnail list for the gallery using local assets
  const thumbnails = [
    product.colors[0].image,
    backpackBack,
    backpackSide,
    backpackDetail,
    backpackBlack,
    "video-thumb" // represents the video preview element in reference
  ];

  // Component states
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImage, setActiveImage] = useState(product.colors[0].image);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  // Handlers
  const handleColorChange = (colorObj) => {
    setSelectedColor(colorObj);
    setActiveImage(colorObj.image);
  };

  const handleQuantityChange = (type) => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    } else if (type === 'increase' && quantity < product.itemsLeft) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleAddToCart = () => {
    setCartMessage("Added to Cart Successfully!");
    setTimeout(() => setCartMessage(""), 3000);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} item(s) of ${selectedColor.name} color.`);
  };

  const handlePrevImage = () => {
    const currentIndex = thumbnails.indexOf(activeImage);
    if (currentIndex > 0) {
      setActiveImage(thumbnails[currentIndex - 1]);
    } else {
      setActiveImage(thumbnails[thumbnails.length - 2]); 
    }
  };

  const handleNextImage = () => {
    const currentIndex = thumbnails.indexOf(activeImage);
    if (currentIndex !== -1 && currentIndex < thumbnails.length - 2) {
      setActiveImage(thumbnails[currentIndex + 1]);
    } else {
      setActiveImage(thumbnails[0]);
    }
  };

  return (
    <div className="ProductDetails">
      <div className="ProductDetails-container">
        
        {/* Left Column: Image Gallery */}
        <div className="ProductDetails-gallery-section">
          {/* Thumbnails Sidebar */}
          <div className="ProductDetails-thumbnails">
            {thumbnails.map((thumb, index) => (
              <div 
                key={index} 
                className={`ProductDetails-thumb-item ${activeImage === thumb ? 'active' : ''}`}
                onClick={() => thumb !== 'video-thumb' && setActiveImage(thumb)}
              >
                {thumb === 'video-thumb' ? (
                  <div className="ProductDetails-video-thumb">
                    <img src={product.colors[0].image} alt="video thumbnail" />
                    <div className="ProductDetails-play-icon"><FaPlay size={12} /></div>
                  </div>
                ) : (
                  <img src={thumb} alt={`Thumbnail ${index}`} />
                )}
              </div>
            ))}
          </div>

          {/* Main Display Image */}
          <div className="ProductDetails-main-image-wrapper">
            <span className="ProductDetails-badge-new">New</span>
            <button 
              className="ProductDetails-wishlist-btn" 
              onClick={() => setIsWishlisted(!isWishlisted)}
              aria-label="Wishlist"
            >
              {isWishlisted ? <FaHeart color="#e63946" /> : <FaRegHeart />}
            </button>

            <button className="ProductDetails-arrow-btn left" onClick={handlePrevImage}>
              <FaChevronLeft />
            </button>

            <img src={activeImage} alt={product.name} className="ProductDetails-main-image" />

            <button className="ProductDetails-arrow-btn right" onClick={handleNextImage}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="ProductDetails-info-section">
          <span className="ProductDetails-brand">{product.brand}</span>
          <h1 className="ProductDetails-title">{product.name}</h1>

          {/* Rating & SKU */}
          <div className="ProductDetails-meta-row">
            <div className="ProductDetails-stars">
              {[...Array(5)].map((_, i) => (
                i < product.rating ? <FaStar key={i} color="#f4a261" /> : <FaRegStar key={i} color="#f4a261" />
              ))}
              <span className="ProductDetails-reviews">({product.reviewsCount} reviews)</span>
            </div>
            <div className="ProductDetails-sku">
              SKU: <span>{product.sku}</span>
            </div>
          </div>

          {/* Pricing in INR */}
          <div className="ProductDetails-price-row">
            <span className="ProductDetails-current-price">₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            <span className="ProductDetails-original-price">₹{product.originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            <span className="ProductDetails-discount-badge">{product.discount}</span>
          </div>

          {/* Description */}
          <p className="ProductDetails-description">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="ProductDetails-color-picker">
            <span className="ProductDetails-option-label">Color: <strong>{selectedColor.name}</strong></span>
            <div className="ProductDetails-color-swatches">
              {product.colors.map((col, idx) => (
                <button
                  key={idx}
                  className={`ProductDetails-swatch ${selectedColor.name === col.name ? 'selected' : ''}`}
                  style={{ backgroundColor: col.hex }}
                  onClick={() => handleColorChange(col)}
                  aria-label={col.name}
                />
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="ProductDetails-stock-status">
            <span className="ProductDetails-in-stock">
              <FaCheckCircle color="#2a9d8f" /> In Stock
            </span>
            <span className="ProductDetails-items-left">Only {product.itemsLeft} items left</span>
          </div>

          {/* Quantity & CTA Actions */}
          <div className="ProductDetails-actions-row">
            <div className="ProductDetails-quantity-selector">
              <span className="ProductDetails-option-label-qty">Quantity:</span>
              <div className="ProductDetails-qty-controls">
                <button onClick={() => handleQuantityChange('decrease')}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange('increase')}>+</button>
              </div>
            </div>

            <button className="ProductDetails-add-to-cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>

            <button className="ProductDetails-buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {cartMessage && <div className="ProductDetails-cart-toast">{cartMessage}</div>}

          {/* Footer Perks (Shipping threshold adjusted to ₹8,000) */}
          <div className="ProductDetails-perks-row">
            <div className="ProductDetails-perk-item">
              <FaTruck className="ProductDetails-perk-icon" />
              <div>
                <div className="ProductDetails-perk-title">Free Shipping</div>
                <div className="ProductDetails-perk-desc">On orders over ₹8,000</div>
              </div>
            </div>
            <div className="ProductDetails-perk-item">
              <FaUndo className="ProductDetails-perk-icon" />
              <div>
                <div className="ProductDetails-perk-title">30 Days Return</div>
                <div className="ProductDetails-perk-desc">Hassle free returns</div>
              </div>
            </div>
            <div className="ProductDetails-perk-item">
              <FaLock className="ProductDetails-perk-icon" />
              <div>
                <div className="ProductDetails-perk-title">Secure Payment</div>
                <div className="ProductDetails-perk-desc">100% protected</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;