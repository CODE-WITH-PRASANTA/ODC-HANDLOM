import React, { useState } from "react";
import "./NewArrivals.css";
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiEye, FiCheck, FiHeart } from "react-icons/fi";

// INR में प्रोडक्ट्स का डेटा
const productsData = [
  {
    id: 1,
    title: "Roadster Women Round Neck",
    desc: "Fendi began life in 1925 as a fur and leather speciality store in Rome.",
    price: 1499.00,
    oldPrice: 1999.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#e67e22", "#ff9ff3", "#8e44ad", "#e74c3c"]
  },
  {
    id: 2,
    title: "Roadster Men Solid Tee",
    desc: "Classic white crewneck t-shirt made from ultra-soft organic cotton.",
    price: 799.00,
    oldPrice: null,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#ffffff", "#2c3e50", "#7f8c8d"]
  },
  {
    id: 3,
    title: "Roadster Floral Printed Shirt",
    desc: "A vibrant dark floral shirt designed for a clean, modern aesthetic fit.",
    price: 1299.00,
    oldPrice: 1799.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L"],
    colors: ["#111111", "#27ae60", "#2980b9"]
  },
  {
    id: 4,
    title: "Roadster Trench Woolen Coat",
    desc: "Heavyweight woolen texture drape overcoat perfect for winter stylings.",
    price: 3499.00,
    oldPrice: 4999.00,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#2c3e50", "#d35400", "#7f8c8d"]
  },
  {
    id: 5,
    title: "Roadster Leather Biker Jacket",
    desc: "Crafted with premium authentic leather elements and heavy zip finishes.",
    price: 4999.00,
    oldPrice: 6999.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L"],
    colors: ["#111111", "#7f8c8d"]
  },
  {
    id: 6,
    title: "Roadster Vintage Boho Skirt",
    desc: "Flowy, light, and textured printed maxi skirt with side slit adjustments.",
    price: 1599.00,
    oldPrice: 2199.00,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L"],
    colors: ["#f1c40f", "#e67e22", "#16a085"]
  },
  {
    id: 7,
    title: "Roadster Emerald Flow Dress",
    desc: "V-neck dark green relaxed midi dress printed with delicate floral arrays.",
    price: 2199.00,
    oldPrice: null,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#27ae60", "#2c3e50", "#8e44ad"]
  },
  {
    id: 8,
    title: "Roadster Checked Flannel Outer",
    desc: "Layer up comfortably with our signature vintage tartan oversized flannel shirt.",
    price: 1899.00,
    oldPrice: 2499.00,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80",
    sizes: ["M", "L", "XL"],
    colors: ["#d35400", "#2c3e50", "#c0392b"]
  },
  {
    id: 9,
    title: "Roadster Camel Fedora Hat",
    desc: "Soft-structured wool-felt fedora designed to accent casual street wear.",
    price: 999.00,
    oldPrice: null,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80",
    sizes: ["One Size"],
    colors: ["#d35400", "#7f8c8d", "#2c3e50"]
  },
  {
    id: 10,
    title: "Roadster Slogan Graphic Tee",
    desc: "Cotton basic crew neck charcoal t-shirt featuring modern distressed graphics.",
    price: 699.00,
    oldPrice: 999.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#2c3e50", "#7f8c8d", "#111111"]
  }
];

// भारतीय रुपये के फॉर्मेट के लिए हेल्पर फ़ंक्शन
const formatINR = (amount) => {
  return "₹" + amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const NewArrivals = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [addedToast, setAddedToast] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleQuantityChange = (type) => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    } else if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      handleCloseModal();
    }, 1200);
  };

  return (
    <section className="NewArrivals" id="new-arrivals-section">
      <div className="NewArrivals__container">
        
        {/* Header */}
        <div className="NewArrivals__header">
          <div className="NewArrivals__titleWrap">
            <span className="NewArrivals__pill">FRESH COLLECTION</span>
            <h2 className="NewArrivals__heading">New Arrivals</h2>
          </div>
        </div>

        {/* Product Grid (5 Columns Default) */}
        <div className="NewArrivals__grid">
          {productsData.map((product) => (
            <div 
              className="NewArrivals__card" 
              key={product.id}
              onClick={() => handleOpenModal(product)}
            >
              {/* Product Image Wrapper */}
              <div className="NewArrivals__imageWrapper">
                <img src={product.image} alt={product.title} loading="lazy" />
                <div className="NewArrivals__quickOverlay">
                  <span><FiEye /> Quick View</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="NewArrivals__info">
                <div className="NewArrivals__rating">
                  <span>★</span>
                  <span>{product.rating}</span>
                </div>
                <h3 className="NewArrivals__title">{product.title}</h3>
                <p className="NewArrivals__desc">{product.desc}</p>

                <div className="NewArrivals__priceRow">
                  <span className="NewArrivals__price">{formatINR(product.price)}</span>
                  {product.oldPrice && (
                    <span className="NewArrivals__oldPrice">{formatINR(product.oldPrice)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Quick View Modal */}
      {selectedProduct && (
        <div className="NewArrivals__modalOverlay" onClick={handleCloseModal}>
          <div 
            className="NewArrivals__modalContent" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="NewArrivals__modalClose" 
              onClick={handleCloseModal} 
              aria-label="Close modal"
            >
              <FiX />
            </button>

            <div className="NewArrivals__modalBody">
              {/* Left Column - Image */}
              <div className="NewArrivals__modalImgCol">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
              </div>

              {/* Right Column - Details */}
              <div className="NewArrivals__modalDetailsCol">
                <div className="NewArrivals__modalHeaderInfo">
                  <span className="NewArrivals__modalRating">★ {selectedProduct.rating} Rating</span>
                  <h2 className="NewArrivals__modalTitle">{selectedProduct.title}</h2>
                </div>

                <p className="NewArrivals__modalDesc">{selectedProduct.desc}</p>
                
                <div className="NewArrivals__modalPriceRow">
                  <span className="NewArrivals__modalPrice">
                    {formatINR(selectedProduct.price)}
                  </span>
                  {selectedProduct.oldPrice && (
                    <span className="NewArrivals__modalOldPrice">
                      {formatINR(selectedProduct.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Size Options */}
                <div className="NewArrivals__modalOptionSection">
                  <h4 className="NewArrivals__optionHeading">Select Size</h4>
                  <div className="NewArrivals__sizeSelector">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`NewArrivals__sizeBtn ${selectedSize === size ? "active" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Options */}
                <div className="NewArrivals__modalOptionSection">
                  <h4 className="NewArrivals__optionHeading">Select Color</h4>
                  <div className="NewArrivals__colorSelector">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`NewArrivals__colorBtn ${selectedColor === color ? "active" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity & Action Controls */}
                <div className="NewArrivals__actionRow">
                  <div className="NewArrivals__quantityBlock">
                    <button type="button" onClick={() => handleQuantityChange("dec")}>
                      <FiMinus />
                    </button>
                    <span className="NewArrivals__quantityValue">{quantity}</span>
                    <button type="button" onClick={() => handleQuantityChange("inc")}>
                      <FiPlus />
                    </button>
                  </div>

                  <button 
                    type="button" 
                    className={`NewArrivals__addToCartBtn ${addedToast ? 'added' : ''}`}
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

export default NewArrivals;