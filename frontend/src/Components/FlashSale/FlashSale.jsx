import React, { useState, useEffect } from 'react';
import './FlashSale.css';

// Import local image assets
import img1 from '../../assets/1.webp';
import img2 from '../../assets/2.webp';
import img3 from '../../assets/3.webp';
import img4 from '../../assets/4.png';
import img5 from '../../assets/5.webp';
import img6 from '../../assets/6.webp';
import img7 from '../../assets/7.webp';
import img8 from '../../assets/8.webp';
import img9 from '../../assets/9.webp';
import img10 from '../../assets/10.webp';

// INR में प्रोडक्ट्स की कीमतें
const products = [
  { id: 1, name: 'Adidas Shoes Black', price: 3499.00, oldPrice: 7999.00, discount: '56%', rating: 4.8, desc: 'Men Black top sleeveless gown. Made with a relaxed build, perfect for casual sport activities.', image: img1 },
  { id: 2, name: 'Armani Wide-Leg Trousers', price: 1199.00, oldPrice: 1599.00, discount: '25%', rating: 4.5, desc: 'Monochrome elegance. Made with a relaxed wide-leg from soft organic cotton.', image: img2 },
  { id: 3, name: 'Zara Shoes Green', price: 3999.00, oldPrice: 5999.00, discount: '33%', rating: 4.9, desc: 'Premium comfort and stitching built for longevity and urban outdoor wear.', image: img3 },
  { id: 4, name: 'Wayfarer Sunglasses', price: 1299.00, oldPrice: 1599.00, discount: '18%', rating: 4.6, desc: 'Ultimate visual clarity for sunny days with scratch-resistant lenses.', image: img4 },
  { id: 5, name: 'Tissot Classic Watch', price: 49999.00, oldPrice: 69999.00, discount: '28%', rating: 5.0, desc: 'Classic elements with modern automatic movements and sapphire crystal glass.', image: img5 },
  { id: 6, name: 'Hermes Carlton London', price: 1299.00, oldPrice: 2199.00, discount: '40%', rating: 4.3, desc: 'Off-White self-striped classic formal option crafted from high-grade silk.', image: img6 },
  { id: 7, name: 'Polarised Sunglasses', price: 1699.00, oldPrice: 2999.00, discount: '43%', rating: 4.7, desc: 'Includes custom carrying pouch, UV400 blocking, and anti-reflective coating.', image: img7 },
  { id: 8, name: 'Gucci Carlton UK', price: 1249.00, oldPrice: 1699.00, discount: '26%', rating: 4.4, desc: 'Knitted midi A-line dress with comfortable premium Italian tailoring.', image: img8 },
  { id: 9, name: 'NIKE Air Max 2026', price: 4199.00, oldPrice: 6999.00, discount: '40%', rating: 4.9, desc: 'NIKE signature track shoes built for maximum speed and shock absorption.', image: img9 },
  { id: 10, name: 'Pro Wayfarer Shades', price: 1699.00, oldPrice: 2199.00, discount: '22%', rating: 4.8, desc: 'Developed by optical engineers to block harmful UV rays effortlessly.', image: img10 }
];

// भारतीय रुपये के फॉर्मेट के लिए हेल्पर फ़ंक्शन
const formatINR = (amount) => {
  return '₹' + amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const FlashSale = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('orange');
  
  // Countdown Timer State (5 Hours initial)
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize('S');
    setSelectedColor('orange');
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="flash-sale-container" id="flash-sale-section">
      
      {/* Header with Live Countdown */}
      <div className="flash-header">
        <div className="title-wrap">
          <span className="live-pill">
            <span className="pulse-dot"></span> LIVE SALE
          </span>
          <h2>Flash Sale</h2>
        </div>

        <div className="countdown-wrap">
          <span className="ends-label">Ends In:</span>
          <div className="timer-box">
            <span className="time-num">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="time-unit">h</span>
            <span className="time-colon">:</span>
            <span className="time-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="time-unit">m</span>
            <span className="time-colon">:</span>
            <span className="time-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="time-unit">s</span>
          </div>
        </div>
      </div>

      {/* Grid Cards Container */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => openProductModal(product)}>
            
            {/* Discount Badge */}
            {product.discount && (
              <span className="discount-badge">-{product.discount}</span>
            )}

            {/* Product Image */}
            <div className="image-wrapper">
              <img src={product.image} alt={product.name} loading="lazy" />
              <div className="quick-view-overlay">
                <span>Quick View</span>
              </div>
            </div>

            {/* Info Block */}
            <div className="product-info">
              <div className="rating-row">
                <span className="star-icon">★</span>
                <span className="rating-val">{product.rating}</span>
              </div>
              
              <h3 className="product-title">{product.name}</h3>
              <p className="grid-desc">{product.desc}</p>
              
              <div className="price-box">
                <span className="current-price">{formatINR(product.price)}</span>
                {product.oldPrice && (
                  <span className="old-price">{formatINR(product.oldPrice)}</span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Quick View Lightbox Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeProductModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeProductModal} aria-label="Close modal">
              &times;
            </button>
            
            {/* Left Image Section */}
            <div className="modal-left">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <span className="modal-discount-tag">-{selectedProduct.discount} OFF</span>
            </div>

            {/* Right Information & Options */}
            <div className="modal-right">
              <div className="modal-header-info">
                <span className="modal-rating">★ {selectedProduct.rating} Rating</span>
                <h2>{selectedProduct.name}</h2>
              </div>

              <p className="modal-desc">{selectedProduct.desc}</p>
              
              <div className="modal-price-box">
                <span className="modal-current-price">{formatINR(selectedProduct.price)}</span>
                {selectedProduct.oldPrice && (
                  <span className="modal-old-price">{formatINR(selectedProduct.oldPrice)}</span>
                )}
              </div>

              {/* Size Options */}
              <div className="selector-section">
                <h4>Select Size</h4>
                <div className="options-row">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button 
                      key={size} 
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Options */}
              <div className="selector-section">
                <h4>Select Color</h4>
                <div className="options-row">
                  {[
                    { name: 'orange', value: '#ea580c' },
                    { name: 'pink', value: '#ec4899' },
                    { name: 'purple', value: '#8b5cf6' },
                    { name: 'red', value: '#dc2626' }
                  ].map((color) => (
                    <button 
                      key={color.name} 
                      className={`color-btn ${selectedColor === color.name ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Counter & Action */}
              <div className="action-row">
                <div className="quantity-counter">
                  <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>—</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                </div>
                
                <button className="add-cart-btn" onClick={closeProductModal}>
                  Add To Cart • {formatINR(selectedProduct.price * quantity)}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default FlashSale;