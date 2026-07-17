import React from "react";
import "./SellingProducts.css";
import { FiArrowRight } from "react-icons/fi";

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
          <div className="SellingProducts__card" key={index}>

            <div className="SellingProducts__img">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="SellingProducts__info">

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <div className="SellingProducts__price">

                <span className="SellingProducts__newPrice">
                  {item.price}
                </span>

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

    </section>
  );
};

export default SellingProducts;