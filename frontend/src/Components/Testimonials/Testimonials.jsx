import React, { useState } from "react";
import "./Testimonials.css";

import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";

import user1 from "../../assets/cl1.jpg";
import user2 from "../../assets/cl2.jpg";
import user3 from "../../assets/cl6.jpg";
import user4 from "../../assets/cl4.jpg";
import user5 from "../../assets/cl5.jpg";
import user6 from "../../assets/cl6.jpg";
import user7 from "../../assets/cl7.jpg";

const users = [
  {
    image: user1,
    name: "Olivia Wilson",
    role: "Verified Customer",
    rating: 5,
    review: "Amazing Service",
    description:
      "The customer support team helped me choose the perfect product. Fast delivery and excellent quality.",
  },
  {
    image: user2,
    name: "James Smith",
    role: "Premium Member",
    rating: 5,
    review: "Highly Recommended",
    description:
      "Shopping here has been a wonderful experience. Great collection and very friendly support.",
  },
  {
    image: user3,
    name: "Sophia Brown",
    role: "Regular Buyer",
    rating: 4,
    review: "Great Experience",
    description:
      "Excellent products with affordable pricing. I always recommend this store to my friends.",
  },
  {
    image: user4,
    name: "William Johnson",
    role: "Gold Member",
    rating: 5,
    review: "Fantastic",
    description:
      "Member Services answered all my questions quickly. Very satisfied with the support.",
  },
  {
    image: user5,
    name: "Emma Davis",
    role: "Verified Customer",
    rating: 5,
    review: "Excellent Quality",
    description:
      "Loved the packaging and the product quality. Definitely ordering again.",
  },
  {
    image: user6,
    name: "Liam Miller",
    role: "Customer",
    rating: 4,
    review: "Very Helpful",
    description:
      "Support team was extremely polite and solved my issue within minutes.",
  },
  {
    image: user7,
    name: "Charlotte Taylor",
    role: "Premium Member",
    rating: 5,
    review: "Outstanding",
    description:
      "The shopping experience was smooth from start to finish. Highly recommended.",
  },
];

const Testimonials = () => {
  const [selectedIndex, setSelectedIndex] = useState(3);

  return (
    <section className="Testimonials">
      <div className="Testimonials-container">
        <h2 className="Testimonials-title">Talk To A Real Person</h2>

        <p className="Testimonials-subtitle">
          Are you on the fence? Have a question? Need a recommendation?
          <br />
          Member Services is always here to help. Send us a message.
        </p>

        <div className="Testimonials-members">
          {users.map((user, index) => (
            <div
              key={index}
              className={`Testimonials-avatar-wrapper ${
                selectedIndex === index ? "active-wrapper" : ""
              }`}
            >
              {/* Card */}
              {selectedIndex === index && (
                <div className="Testimonials-card">
                  <div className="Testimonials-user-image">
                    <img src={user.image} alt={user.name} />
                  </div>

                  <h3>{user.name}</h3>

                  <span className="Testimonials-role">{user.role}</span>

                  <div className="Testimonials-stars">
                    {[...Array(user.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  <h4>{user.review}</h4>

                  <p>{user.description}</p>
                </div>
              )}

              {/* Avatar */}
              <div
                onClick={() => setSelectedIndex(index)}
                className={`Testimonials-avatar
                  ${
                    index === 0 || index === 6
                      ? "small"
                      : index === 1 || index === 5
                      ? "medium"
                      : index === 3
                      ? "biggest"
                      : "large"
                  }
                  ${selectedIndex === index ? "active" : ""}
                `}
              >
                <img src={user.image} alt={user.name} />
              </div>
            </div>
          ))}
        </div>

        <button className="Testimonials-btn">
          Chat With Member Services
          <HiOutlineChatBubbleOvalLeftEllipsis />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;