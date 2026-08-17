import React, { useState } from "react";
import "./SellingProducts.css";
import { FiArrowRight, FiX, FiShoppingBag, FiEye, FiCheck } from "react-icons/fi";

import product1 from "../../assets/p1.webp";
import product2 from "../../assets/p2.webp";
import product3 from "../../assets/p3.webp";
import product4 from "../../assets/p22.webp";
import product5 from "../../assets/p4.webp";
import product6 from "../../assets/p5.webp";
import product7 from "../../assets/p6.webp";
import product8 from "../../assets/p7.webp";
import product9 from "../../assets/p8.webp";

// INR में प्रोडक्ट्स की कीमतें
const products = [
  {
    id: 1,
    image: product1,
    title: "Armani Veni Vidi Vici",
    desc: "Fendi began life in 1925 as a fur and leather shop.",
    price: 1499.00,
    oldPrice: 1999.00,
  },
  {
    id: 2,
    image: product2,
    title: "Adidas Shoes Black",
    desc: "Men Black top shoes gown built for supreme casual comfort.",
    price: 3499.00,
    oldPrice: 7999.00,
  },
  {
    id: 3,
    image: product3,
    title: "Gucci Carlton UK",
    desc: "Knitted midi A-line dress, features a elegant scoop neck.",
    price: 1249.00,
    oldPrice: 1699.00,
  },
  {
    id: 4,
    image: product4,
    title: "Scuba Stand Collar Topper",
    desc: "Zara provides only the highest-quality luxury fashion.",
    price: 999.00,
    oldPrice: 1399.00,
  },
  {
    id: 5,
    image: product5,
    title: "Regular Fit Crew-neck T-shirt",
    desc: "Self-striped knitted midi A-line dress with stretch fit.",
    price: 899.00,
    oldPrice: 1299.00,
  },
  {
    id: 6,
    image: product6,
    title: "Hermes Carlton London",
    desc: "Off-White self-striped knitted midi formal dress.",
    price: 1299.00,
    oldPrice: null,
  },
  {
    id: 7,
    image: product7,
    title: "Wayfarer Sunglasses",
    desc: "Our optical engineers developed this ultimate lens design.",
    price: 1699.00,
    oldPrice: 2199.00,
  },
  {
    id: 8,
    image: product8,
    title: "Armani Wide-Leg Trousers",
    desc: "Monochrome elegance. Made with sustainable premium fabric.",
    price: 4999.00,
    oldPrice: 6999.00,
  },
  {
    id: 9,
    image: product9,
    title: "REDQ Steel Watch",
    desc: "The Black Bay celebrates 60 years of horology excellence.",
    price: 6999.00,
    oldPrice: 9999.00,
  },
];

// भारतीय रुपये के फॉर्मेट के लिए हेल्पर फ़ंक्शन
const formatINR = (amount) => {
  return "₹" + amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const SellingProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(0);
  const [addedToast, setAddedToast] = useState(false);

  const colors = [
    { name: "Orange", hex: "#e65c00" },
    { name: "Pink", hex: "#ff99cc" },
    { name: "Purple", hex: "#8000ff" },
    { name: "Red", hex: "#e62e3d" }
  ];

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize("S");
    setSelectedColor(0);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      handleCloseModal();
    }, 1200);
  };

  return (
    <section className="SellingProducts" id="selling-products-section">
      <div className="SellingProducts__container">
        
        {/* Header */}
        <div className="SellingProducts__header">
          <div className="SellingProducts__titleWrap">
            <span className="SellingProducts__pill">CURRENTLY TRENDING</span>
            <h2>On Selling Products</h2>
          </div>
          <a href="/products" className="SellingProducts__viewAll">
            <span>See All Products</span>
            <FiArrowRight className="arrow-icon" />
          </a>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="SellingProducts__grid">
          {products.map((item) => (
            <div
              className="SellingProducts__card"
              key={item.id}
              onClick={() => handleOpenModal(item)}
            >
              <div className="SellingProducts__img">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="SellingProducts__quickViewOverlay">
                  <span><FiEye /> Quick View</span>
                </div>
              </div>

              <div className="SellingProducts__info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                
                <div className="SellingProducts__priceRow">
                  <span className="SellingProducts__newPrice">
                    {formatINR(item.price)}
                  </span>
                  {item.oldPrice && (
                    <span className="SellingProducts__oldPrice">
                      {formatINR(item.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Quick View Modal */}
      {selectedProduct && (
        <div className="SellingProducts__modalOverlay" onClick={handleCloseModal}>
          <div
            className="SellingProducts__modalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="SellingProducts__closeBtn" 
              onClick={handleCloseModal} 
              aria-label="Close modal"
            >
              <FiX />
            </button>

            <div className="SellingProducts__modalBody">
              {/* Product Image Side */}
              <div className="SellingProducts__modalImg">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
              </div>

              {/* Product Info Side */}
              <div className="SellingProducts__modalDetails">
                <h2>{selectedProduct.title}</h2>
                <p className="SellingProducts__modalDesc">{selectedProduct.desc}</p>

                <div className="SellingProducts__modalPrice">
                  <span className="SellingProducts__modalNewPrice">
                    {formatINR(selectedProduct.price)}
                  </span>
                  {selectedProduct.oldPrice && (
                    <span className="SellingProducts__modalOldPrice">
                      {formatINR(selectedProduct.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Size Selector */}
                <div className="SellingProducts__optionGroup">
                  <h4>Select Size</h4>
                  <div className="SellingProducts__sizes">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`SellingProducts__sizeBtn ${
                          selectedSize === size ? "active" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div className="SellingProducts__optionGroup">
                  <h4>Select Color</h4>
                  <div className="SellingProducts__colors">
                    {colors.map((color, cIndex) => (
                      <span
                        key={cIndex}
                        className={`SellingProducts__colorDot ${
                          selectedColor === cIndex ? "active" : ""
                        }`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(cIndex)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity & Add To Cart */}
                <div className="SellingProducts__actionRow">
                  <div className="SellingProducts__quantitySelector">
                    <button 
                      type="button" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      —
                    </button>
                    <span>{quantity}</span>
                    <button 
                      type="button" 
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    type="button" 
                    className={`SellingProducts__addToCartBtn ${addedToast ? 'added' : ''}`}
                    onClick={handleAddToCart}
                  >
                    {addedToast ? (
                      <>
                        <FiCheck /> Added To Cart
                      </>
                    ) : (
                      <>
                        <FiShoppingBag /> Add To Cart • {formatINR(selectedProduct.price * quantity)}
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SellingProducts;