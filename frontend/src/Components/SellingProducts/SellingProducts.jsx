import React, { useState } from "react";
import "./SellingProducts.css";
import { FiArrowRight, FiX } from "react-icons/fi";

import product1 from "../../assets/p1.webp";
import product2 from "../../assets/p2.webp";
import product3 from "../../assets/p3.webp";
import product4 from "../../assets/p22.webp";
import product5 from "../../assets/p4.webp";
import product6 from "../../assets/p5.webp";
import product7 from "../../assets/p6.webp";
import product8 from "../../assets/p7.webp";
import product9 from "../../assets/p8.webp";

const products = [
  {
    image: product1,
    title: "Armani Veni Vidi Vici",
    desc: "Fendi began life in 1925 as a fur and leather shop.",
    price: "$17.99",
    oldPrice: "$20.00",
  },
  {
    image: product2,
    title: "Adidas Shoes Black",
    desc: "Men Black top shoes gown",
    price: "$45.00",
    oldPrice: "$99.99",
  },
  {
    image: product3,
    title: "Gucci Carlton UK",
    desc: "Knitted midi A-line dress, has a scoop neck.",
    price: "$14.99",
    oldPrice: "$19.99",
  },
  {
    image: product4,
    title: "Scuba Stand Collar Topper",
    desc: "Zara provides only the highest-quality fashion.",
    price: "$12.00",
    oldPrice: "$16.00",
  },
  {
    image: product5,
    title: "Regular Fit Crew-neck T-shirt",
    desc: "Self-striped knitted midi A-line dress.",
    price: "$12.30",
    oldPrice: "$16.38",
  },
  {
    image: product6,
    title: "Hermes Carlton London",
    desc: "Off-White self-striped knitted midi dress.",
    price: "$15.00",
    oldPrice: "",
  },
  {
    image: product7,
    title: "Wayfarer Sunglasses",
    desc: "Our optical engineers developed this design.",
    price: "$20.00",
    oldPrice: "$25.00",
  },
  {
    image: product8,
    title: "Armani Wide-Leg Trousers",
    desc: "Monochrome elegance. Made with premium fabric.",
    price: "$60.00",
    oldPrice: "$80.00",
  },
  {
    image: product9,
    title: "REDQ Steel Watch",
    desc: "The Black Bay celebrates 60 years of excellence.",
    price: "$80.00",
    oldPrice: "$120.00",
  },
];

const SellingProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(0);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity on open
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <section className="SellingProducts">
      <div className="SellingProducts__header">
        <h2>On Selling Products</h2>
        <a href="/" className="SellingProducts__viewAll">
          See All Product
          <FiArrowRight />
        </a>
      </div>

      <div className="SellingProducts__grid">
        {products.map((item, index) => (
          <div
            className="SellingProducts__card"
            key={index}
            onClick={() => handleOpenModal(item)}
            style={{ cursor: "pointer" }}
          >
            <div className="SellingProducts__img">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="SellingProducts__info">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="SellingProducts__price">
                <span className="SellingProducts__newPrice">{item.price}</span>
                {item.oldPrice && (
                  <span className="SellingProducts__oldPrice">
                    {item.oldPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedProduct && (
        <div className="SellingProducts__modalOverlay" onClick={handleCloseModal}>
          <div
            className="SellingProducts__modalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="SellingProducts__closeBtn" onClick={handleCloseModal}>
              <FiX />
            </button>

            <div className="SellingProducts__modalBody">
              <div className="SellingProducts__modalImg">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
              </div>

              <div className="SellingProducts__modalDetails">
                <h2>{selectedProduct.title}</h2>
                <p>{selectedProduct.desc}</p>

                <div className="SellingProducts__modalPrice">
                  <span className="SellingProducts__modalNewPrice">
                    {selectedProduct.price}
                  </span>
                  {selectedProduct.oldPrice && (
                    <span className="SellingProducts__modalOldPrice">
                      {selectedProduct.oldPrice}
                    </span>
                  )}
                </div>

                <div className="SellingProducts__optionGroup">
                  <h4>Size</h4>
                  <div className="SellingProducts__sizes">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
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

                <div className="SellingProducts__optionGroup">
                  <h4>Color</h4>
                  <div className="SellingProducts__colors">
                    {["#e65c00", "#ff99cc", "#8000ff", "#e62e3d"].map(
                      (color, cIndex) => (
                        <span
                          key={cIndex}
                          className={`SellingProducts__colorDot ${
                            selectedColor === cIndex ? "active" : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(cIndex)}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="SellingProducts__actionRow">
                  <div className="SellingProducts__quantitySelector">
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                  </div>
                  <button className="SellingProducts__addToCartBtn">
                    Add To Cart
                  </button>
                </div>

                <button className="SellingProducts__viewDetailsBtn">
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

export default SellingProducts;