import React, { useState } from 'react';
import './FlashSale.css';

// Import all 10 images
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

const products = [
  { id: 1, name: 'Adidas Shoes Black', price: '$45.00', oldPrice: '$99.99', desc: 'Men Black top sleeveless gown. Made with a relaxed build, perfect for casual sport activities.', image: img1 },
  { id: 2, name: 'Armani Wide-Leg Trousers', price: '$12.00', oldPrice: '$16.00', desc: 'Monochrome elegance. Made with a relaxed wide-leg, these trousers are made from a sustainable soft organic cotton with a mechanical stretch making the garment easily recycled.', image: img2 },
  { id: 3, name: 'Zara Shoes Green', price: '$50.00', oldPrice: '', desc: 'Footwear refers to garments. Premium comfort and stitching built for longevity.', image: img3 },
  { id: 4, name: 'Wayfarer Sunglasses', price: '$15.00', oldPrice: '$18.00', desc: 'Our optical engineers have created the ultimate visual clarity for sunny days.', image: img4 },
  { id: 5, name: 'Tissot Classic', price: '$600.00', oldPrice: '', desc: 'The new-model Submariner features classic elements with modern internal movements.', image: img5 },
  { id: 6, name: 'Hermes Carlton London', price: '$15.00', oldPrice: '', desc: 'Off-White self-striped classic formal wear option.', image: img6 },
  { id: 7, name: 'Polarised Wayfarer', price: '$20.00', oldPrice: '$35.00', desc: 'Exchangeable item. Includes custom carrying pouch and anti-scratch coating.', image: img7 },
  { id: 8, name: 'Gucci Carlton UK', price: '$14.99', oldPrice: '$19.99', desc: 'Knitted midi A-line dress with comfortable premium tailoring.', image: img8 },
  { id: 9, name: 'NIKE Shoes', price: '$50.00', oldPrice: '$80.00', desc: 'NIKE 2020 Black White signature track shoes.', image: img9 },
  { id: 10, name: 'Wayfarer Sunglasses', price: '$20.00', oldPrice: '$25.00', desc: 'Developed by engineers to block harmful rays without darkening your view.', image: img10 }
];

const FlashSale = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('orange');

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
    <section className="flash-sale-container">
      <div className="flash-header">
        <h2>Flash Sale</h2>
        <span className="time-over">Time Over!</span>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card flash-hover" onClick={() => openProductModal(product)}>
            <div className="image-wrapper">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="grid-desc">{product.desc}</p>
            <div className="price-box">
              <span className="current-price">{product.price}</span>
              {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeProductModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeProductModal}>&times;</button>
            
            <div className="modal-left">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>

            <div className="modal-right">
              <h2>{selectedProduct.name}</h2>
              <p className="modal-desc">{selectedProduct.desc}</p>
              
              <div className="modal-price-box">
                <span className="modal-current-price">{selectedProduct.price}</span>
                {selectedProduct.oldPrice && <span className="modal-old-price">{selectedProduct.oldPrice}</span>}
              </div>

              {/* Size Selector */}
              <div className="selector-section">
                <h4>Size</h4>
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

              {/* Color Selector */}
              <div className="selector-section">
                <h4>Color</h4>
                <div className="options-row">
                  {[
                    { name: 'orange', value: '#e27225' },
                    { name: 'pink', value: '#f9a1b6' },
                    { name: 'purple', value: '#7922e2' },
                    { name: 'red', value: '#dc3232' }
                  ].map((color) => (
                    <button 
                      key={color.name} 
                      className={`color-btn ${selectedColor === color.name ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons Container */}
              <div className="action-row">
                <div className="quantity-counter">
                  <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>—</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                </div>
                <button className="add-cart-btn">Add To Cart</button>
              </div>

              <button className="view-details-btn">View Details</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlashSale;