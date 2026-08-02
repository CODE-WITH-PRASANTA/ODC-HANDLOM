import React, { useState, useEffect, useCallback } from 'react';
import './FeaturedProduct.css';

// 1. Import your local images from the assets folder
import featuredBag from '../../assets/featuredbag.webp';
import featuredCap from '../../assets/featuredcap.webp';
import featuredShoes from '../../assets/featuredshoes.webp';
import featuredSpeak from '../../assets/featuredspeak.webp';
import featuredWatch from '../../assets/featuredwatch.webp';
import fullBannerImg from '../../assets/promobanner.webp';

// 2. Product data referencing your imported local images
const productsData = [
  {
    id: 1,
    name: 'Nike Bag',
    category: "Rolex's powerhouse calibre 3235 Per...",
    fullDescription: "Rolex's powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement.",
    price: 16.38,
    originalPrice: 20.38,
    discount: '20%',
    image: featuredBag,
    isLarge: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#f27a22', '#ff9ebb', '#7d22f2', '#e53030'],
  },
  {
    id: 2,
    name: 'Adidas Woolen Cap',
    category: 'Casual wear (casual attire or clo...',
    fullDescription: 'Premium warm knitted casual beanie hat, perfect for winter and outdoor lifestyles.',
    price: 16.00,
    originalPrice: 20.00,
    discount: '20%',
    image: featuredCap,
    isLarge: false,
    sizes: ['S', 'M', 'L'],
    colors: ['#334e38', '#111111', '#555555'],
  },
  {
    id: 3,
    name: 'Nike Leader VT',
    category: 'Footwear refers to garments wo...',
    fullDescription: 'High performance running sneakers engineered for lightweight grip and absolute comfort.',
    price: 16.38,
    originalPrice: null,
    discount: null,
    image: featuredShoes,
    isLarge: false,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['#e53030', '#111111', '#4a90e2'],
  },
  {
    id: 4,
    name: 'Ray ban Aviator',
    category: 'Polarized sunglasses reduce g...',
    fullDescription: 'Classic polarized metal aviator frame built with premium UV protection lenses.',
    price: 720.00,
    originalPrice: 850.00,
    discount: '15%',
    image: featuredSpeak,
    isLarge: false,
    sizes: ['Standard'],
    colors: ['#111111', '#ffd700'],
  },
  {
    id: 5,
    name: 'Tissot Classic',
    category: 'The new-model Submariner n...',
    fullDescription: 'Classic premium leather-strap chronograph with deep blue dial face aesthetic detail.',
    price: 600.00,
    originalPrice: null,
    discount: null,
    image: featuredWatch,
    isLarge: false,
    sizes: ['One Size'],
    colors: ['#a05a2c', '#111111', '#d4af37'],
  }
];

const FeaturedProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSize, setActiveSize] = useState('M');
  const [activeColor, setActiveColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setActiveSize(product.sizes[0] || 'M');
    setActiveColor(0);
    setQuantity(1);
  };

  const closeModal = useCallback(() => setSelectedProduct(null), []);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Close on Escape, and lock background scroll while the modal is open
  useEffect(() => {
    if (!selectedProduct) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedProduct, closeModal]);

  const renderCard = (product, isLarge) => (
    <div
      key={product.id}
      onClick={() => handleProductClick(product)}
      className={`fp-card ${isLarge ? 'fp-card-large' : 'fp-card-small'}`}
    >
      {product.discount && (
        <span className="fp-badge">
          <span className="fp-badge-text">-{product.discount}</span>
        </span>
      )}

      <div className="fp-image-box">
        <img
          src={product.image}
          alt={product.name}
          className="fp-product-image flower-hover"
          loading="lazy"
        />
        <button
          type="button"
          className="fp-quick-view"
          onClick={(e) => {
            e.stopPropagation();
            handleProductClick(product);
          }}
        >
          Quick View
        </button>
      </div>

      <div className="fp-meta-info">
        <div className="fp-meta-left">
          <h3 className={`fp-product-name ${!isLarge ? 'text-truncate' : ''}`}>{product.name}</h3>
          <p className={`fp-product-category ${!isLarge ? 'text-truncate' : ''}`}>{product.category}</p>
        </div>
        <div className="fp-meta-right">
          {product.originalPrice && (
            <p className="fp-original-price">${product.originalPrice.toFixed(2)}</p>
          )}
          <p className="fp-current-price">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fp-container">
      <div className="fp-wrapper">
        <div className="fp-section-heading">
          <span className="fp-section-eyebrow">Curated Edit</span>
          <h2 className="fp-section-title">Featured Products</h2>
        </div>

        <div className="fp-grid-main">
          {/* Left Column: large hero card */}
          {productsData.filter((p) => p.isLarge).map((product) => renderCard(product, true))}

          {/* Right Column: remaining products */}
          <div className="fp-grid-sub">
            {productsData.filter((p) => !p.isLarge).map((product) => renderCard(product, false))}
          </div>
        </div>

        {/* --- PROMOTION BANNER --- */}
        <div className="promo-container">
          <div className="promo-wrapper-full">
            <img
              src={fullBannerImg}
              alt="Winter Collection Promotion Banner"
              className="promo-full-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Modal Quick View & Add to Cart */}
      {selectedProduct && (
        <div
          className="fp-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="fp-modal-content" role="dialog" aria-modal="true" aria-label={selectedProduct.name}>
            <button onClick={closeModal} className="fp-modal-close" aria-label="Close modal">
              ✕
            </button>

            <div className="fp-modal-image-panel">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="fp-modal-image" />
            </div>

            <div className="fp-modal-details-panel">
              <div className="fp-details-top">
                {selectedProduct.discount && (
                  <span className="fp-details-badge">Save {selectedProduct.discount}</span>
                )}
                <h2 className="fp-details-title">{selectedProduct.name}</h2>
                <p className="fp-details-description">{selectedProduct.fullDescription}</p>

                <div className="fp-details-pricing">
                  <span className="fp-details-price">${selectedProduct.price.toFixed(2)}</span>
                  {selectedProduct.originalPrice && (
                    <span className="fp-details-old-price">${selectedProduct.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Size Controls */}
                <div className="fp-options-section">
                  <span className="fp-options-label">Size</span>
                  <div className="fp-swatch-container">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setActiveSize(size)}
                        className={`fp-size-button ${activeSize === size ? 'active' : ''}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Controls */}
                <div className="fp-options-section">
                  <span className="fp-options-label">Color</span>
                  <div className="fp-color-container">
                    {selectedProduct.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveColor(index)}
                        style={{ backgroundColor: color }}
                        className={`fp-color-dot ${activeColor === index ? 'active' : ''}`}
                        aria-label={`Select color ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Counter, Add to Cart & Secondary Actions */}
              <div className="fp-actions-panel">
                <div className="fp-quantity-row">
                  <div className="fp-counter">
                    <button onClick={handleDecrement} className="fp-counter-btn" aria-label="Decrease quantity">－</button>
                    <span className="fp-counter-value">{quantity}</span>
                    <button onClick={handleIncrement} className="fp-counter-btn" aria-label="Increase quantity">＋</button>
                  </div>

                  <button className="fp-btn-primary">Add To Cart</button>
                </div>

                <button className="fp-btn-secondary">View Details</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedProduct;