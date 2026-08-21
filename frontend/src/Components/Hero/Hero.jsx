import React, { useEffect, useState } from "react";

import "./Hero.css";

import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import banner4 from "../../assets/banner-4.webp";
import banner5 from "../../assets/banner-5.webp";
import banner6 from "../../assets/banner-6.webp";

import API, { IMG_URL } from "../../api/axios";

const Hero = () => {
  const [banners, setBanners] = useState([]);

  // ==========================================
  // Fetch Banners From Backend
  // ==========================================

  const fetchBanners = async () => {
    try {
      const response = await API.get("/banners");

      console.log("HERO BANNERS:", response.data);

      const bannerData = Array.isArray(response.data)
        ? response.data
        : response.data?.banners || [];

      // ==========================================
      // Only show active Hero Slider banners
      // ==========================================

      const activeBanners = bannerData
        .filter((banner) => {
          return (
            banner.status === true &&
            banner.displaySettings?.heroSlider === true &&
            banner.bannerImage
          );
        })
        .sort((a, b) => {
          return (a.priority || 0) - (b.priority || 0);
        });

      setBanners(activeBanners);
    } catch (error) {
      console.error(
        "Error fetching hero banners:",
        error
      );

      setBanners([]);
    }
  };

  // ==========================================
  // Load Banners
  // ==========================================

  useEffect(() => {
    fetchBanners();
  }, []);

  // ==========================================
  // Backend Image URL
  // ==========================================

  const getBannerImage = (imagePath) => {
    if (!imagePath) {
      return "";
    }

    // Already full URL
    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }

    return `${IMG_URL}${imagePath}`;
  };

  // ==========================================
  // Keep exactly 6 positions
  // ==========================================

  const heroBanners = banners.slice(0, 6);

  // ==========================================
  // Fallback Images
  //
  // These keep the existing UI working if
  // backend has fewer than 6 banners.
  // ==========================================

  const fallbackBanners = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,
  ];

  const images = Array.from(
    { length: 6 },
    (_, index) => {
      if (heroBanners[index]?.bannerImage) {
        return getBannerImage(
          heroBanners[index].bannerImage
        );
      }

      return fallbackBanners[index];
    }
  );

  return (
    <section
      className="hero-container"
      aria-label="Featured collections"
    >
      {/* Row 1 */}

      <div
        className="hero-grid-item hero-item-wide hero-flash-hover"
        style={{
          "--hero-img": `url(${images[0]})`,
          "--i": 0,
        }}
        role="img"
        aria-label={
          heroBanners[0]?.bannerTitle ||
          "Featured collection 1"
        }
      ></div>

      <div
        className="hero-grid-item hero-item-square hero-flash-hover"
        style={{
          "--hero-img": `url(${images[1]})`,
          "--i": 1,
        }}
        role="img"
        aria-label={
          heroBanners[1]?.bannerTitle ||
          "Featured collection 2"
        }
      ></div>

      <div
        className="hero-grid-item hero-item-square hero-flash-hover"
        style={{
          "--hero-img": `url(${images[2]})`,
          "--i": 2,
        }}
        role="img"
        aria-label={
          heroBanners[2]?.bannerTitle ||
          "Featured collection 3"
        }
      ></div>

      {/* Row 2 */}

      <div
        className="hero-grid-item hero-item-square hero-flash-hover"
        style={{
          "--hero-img": `url(${images[3]})`,
          "--i": 3,
        }}
        role="img"
        aria-label={
          heroBanners[3]?.bannerTitle ||
          "Featured collection 4"
        }
      ></div>

      <div
        className="hero-grid-item hero-item-square hero-flash-hover"
        style={{
          "--hero-img": `url(${images[4]})`,
          "--i": 4,
        }}
        role="img"
        aria-label={
          heroBanners[4]?.bannerTitle ||
          "Featured collection 5"
        }
      ></div>

      <div
        className="hero-grid-item hero-item-wide hero-flash-hover"
        style={{
          "--hero-img": `url(${images[5]})`,
          "--i": 5,
        }}
        role="img"
        aria-label={
          heroBanners[5]?.bannerTitle ||
          "Featured collection 6"
        }
      ></div>
    </section>
  );
};

export default Hero;