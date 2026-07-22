import React, { useEffect, useState } from "react";
import "./NewsletterGallery.css";

import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

// Import Images
import img1 from "../../assets/m5 (1).jpg";
import img2 from "../../assets/m5 (2).jpg";
import img3 from "../../assets/m5 (3).jpg";
import img4 from "../../assets/m5 (4).jpg";
import img5 from "../../assets/m5 (5).jpg";
import img6 from "../../assets/cl6.jpg";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
];

const NewsletterGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const openImage = (index) => {
    setCurrentIndex(index);
    document.body.classList.add("lightbox-open");
  };

  const closeImage = () => {
    setCurrentIndex(null);
    document.body.classList.remove("lightbox-open");
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex === null) return;

      switch (e.key) {
        case "Escape":
          closeImage();
          break;

        case "ArrowRight":
          nextImage();
          break;

        case "ArrowLeft":
          prevImage();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("lightbox-open");
    };
  }, [currentIndex]);

  return (
    <>
      <section className="NewsletterGallery">
        <div className="NewsletterGallery-container">

          {/* Gallery */}

          <div className="NewsletterGallery-gallery">
            {images.map((image, index) => (
              <div
                key={index}
                className="NewsletterGallery-imageBox"
                onClick={() => openImage(index)}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Newsletter */}

          <div className="NewsletterGallery-content">

            <div className="NewsletterGallery-left">
              <h2>Get Expert Tips In Your Inbox</h2>

              <p>
                Subscribe to our newsletter and stay
                updated.
              </p>
            </div>

            <form
              className="NewsletterGallery-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Write your email here"
              />

              <button type="submit">
                Subscribe
              </button>
            </form>

          </div>

        </div>
      </section>

      {/* Lightbox */}

      {currentIndex !== null && (
        <div
          className="NewsletterGallery-lightbox"
          onClick={closeImage}
        >
          {/* Blurred Background */}
          <div className="NewsletterGallery-backdrop"></div>

          {/* Close */}
          <button
            className="NewsletterGallery-close"
            onClick={(e) => {
              e.stopPropagation();
              closeImage();
            }}
          >
            <FaTimes />
          </button>

          {/* Previous */}
          <button
            className="NewsletterGallery-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <FaArrowLeft />
          </button>

          {/* Image */}
          <div
            className="NewsletterGallery-preview"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`Preview ${currentIndex + 1}`}
            />
          </div>

          {/* Next */}
          <button
            className="NewsletterGallery-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <FaArrowRight />
          </button>

        </div>
      )}
    </>
  );
};

export default NewsletterGallery;