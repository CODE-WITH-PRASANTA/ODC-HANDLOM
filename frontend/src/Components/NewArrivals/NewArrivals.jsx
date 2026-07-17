import React, { useState } from "react";
import "./NewArrivals.css";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";

const productsData = [
  {
    id: 1,
    title: "Roadster Women Round Neck",
    desc: "Fendi began life in 1925 as a fur and leather speciality store in Rome.",
    price: 18.59,
    oldPrice: 24.00,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#e67e22", "#ff9ff3", "#8e44ad", "#e74c3c"]
  },
  {
    id: 2,
    title: "Roadster Men Solid Tee",
    desc: "Classic white crewneck t-shirt made from ultra-soft organic cotton.",
    price: 18.59,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#ffffff", "#2c3e50", "#7f8c8d"]
  },
  {
    id: 3,
    title: "Roadster Floral Printed Shirt",
    desc: "A vibrant dark floral shirt designed for a clean, modern aesthetic fit.",
    price: 18.59,
    oldPrice: 22.50,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L"],
    colors: ["#111111", "#27ae60", "#2980b9"]
  },
  {
    id: 4,
    title: "Roadster Trench Woolen Coat",
    desc: "Heavyweight woolen texture drape overcoat perfect for winter stylings.",
    price: 18.59,
    oldPrice: 35.00,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#2c3e50", "#d35400", "#7f8c8d"]
  },
  {
    id: 5,
    title: "Roadster Leather Biker Jacket",
    desc: "Crafted with premium authentic leather elements and heavy zip finishes.",
    price: 18.59,
    oldPrice: 40.00,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L"],
    colors: ["#111111", "#7f8c8d"]
  },
  {
    id: 6,
    title: "Roadster Vintage Boho Skirt",
    desc: "Flowy, light, and textured printed maxi skirt with side slit adjustments.",
    price: 18.59,
    oldPrice: 25.00,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L"],
    colors: ["#f1c40f", "#e67e22", "#16a085"]
  },
  {
    id: 7,
    title: "Roadster Emerald Flow Dress",
    desc: "V-neck dark green relaxed midi dress printed with delicate floral arrays.",
    price: 18.59,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#27ae60", "#2c3e50", "#8e44ad"]
  },
  {
    id: 8,
    title: "Roadster Checked Flannel Outer",
    desc: "Layer up comfortably with our signature vintage tartan oversized flannel shirt.",
    price: 18.59,
    oldPrice: 28.00,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80",
    sizes: ["M", "L", "XL"],
    colors: ["#d35400", "#2c3e50", "#c0392b"]
  },
  {
    id: 9,
    title: "Roadster Camel Fedora Hat",
    desc: "Soft-structured wool-felt fedora designed to accent casual street wear.",
    price: 18.59,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80",
    sizes: ["One Size"],
    colors: ["#d35400", "#7f8c8d", "#2c3e50"]
  },
  {
    id: 10,
    title: "Roadster Slogan Graphic Tee",
    desc: "Cotton basic crew neck charcoal t-shirt featuring modern distressed graphics.",
    price: 18.59,
    oldPrice: 21.99,
    image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#2c3e50", "#7f8c8d", "#111111"]
  }
];

const NewArrivals = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

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

  return (
    <section className="NewArrivals">
      <div className="NewArrivals__container">
        <h2 className="NewArrivals__heading">New Arrivals</h2>

        {/* Product Grid */}
        <div className="NewArrivals__grid">
          {productsData.map((product) => (
            <div 
              className="NewArrivals__card" 
              key={product.id}
              onClick={() => handleOpenModal(product)}
            >
              <div className="NewArrivals__imageWrapper">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="NewArrivals__info">
                <h3 className="NewArrivals__title">{product.title}</h3>
                <p className="NewArrivals__desc">{product.desc}</p>
                <div className="NewArrivals__priceRow">
                  <span className="NewArrivals__price">${product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="NewArrivals__oldPrice">${product.oldPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Pop-up Modal */}
      {selectedProduct && (
        <div className="NewArrivals__modalOverlay" onClick={handleCloseModal}>
          <div 
            className="NewArrivals__modalContent" 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="NewArrivals__modalClose" onClick={handleCloseModal}>
              <FiX />
            </button>

            <div className="NewArrivals__modalBody">
              {/* Left Column - Product Image */}
              <div className="NewArrivals__modalImgCol">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
              </div>

              {/* Right Column - Details */}
              <div className="NewArrivals__modalDetailsCol">
                <h2 className="NewArrivals__modalTitle">{selectedProduct.title}</h2>
                <p className="NewArrivals__modalDesc">{selectedProduct.desc}</p>
                
                <div className="NewArrivals__modalPriceRow">
                  <span className="NewArrivals__modalPrice">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.oldPrice && (
                    <span className="NewArrivals__modalOldPrice">
                      ${selectedProduct.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Size Options */}
                <div className="NewArrivals__modalOptionSection">
                  <h4 className="NewArrivals__optionHeading">Size</h4>
                  <div className="NewArrivals__sizeSelector">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
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
                  <h4 className="NewArrivals__optionHeading">Color</h4>
                  <div className="NewArrivals__colorSelector">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        className={`NewArrivals__colorBtn ${selectedColor === color ? "active" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity & Action Buttons */}
                <div className="NewArrivals__actionRow">
                  <div className="NewArrivals__quantityBlock">
                    <button onClick={() => handleQuantityChange("dec")}>
                      <FiMinus />
                    </button>
                    <span className="NewArrivals__quantityValue">{quantity}</span>
                    <button onClick={() => handleQuantityChange("inc")}>
                      <FiPlus />
                    </button>
                  </div>

                  <button className="NewArrivals__addToCartBtn">
                    Add To Cart
                  </button>
                </div>

                <button className="NewArrivals__viewDetailsBtn">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewArrivals;