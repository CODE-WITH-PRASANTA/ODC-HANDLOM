import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../../Components/Hero/Hero";
import Collection from "../../Components/Collection/Collection";
import FeaturedProduct from "../../Components/FeaturedProduct/FeaturedProduct";
import TopBrand from "../../Components/TopBrand/TopBrand";
import Blog from "../../Components/Blog/Blog";
import SellingProducts from "../../Components/SellingProducts/SellingProducts";
import ExclusiveSection from "../../Components/ExclusiveSection/ExclusiveSection";
import NewArrivals from "../../Components/NewArrivals/NewArrivals";
import FlashSale from "../../Components/FlashSale/FlashSale";
import ChawkBazarApp from "../../Components/ChawkBazarApp/ChawkBazarApp";
import Testimonials from "../../Components/Testimonials/Testimonials";
import NewsletterGallery from "../../Components/NewsletterGallery/NewsletterGallery";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.state?.scrollTo;

    if (!sectionId) return;

    const timer = setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        const navbarHeight = 85;

        const scrollPosition =
          section.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }

      // Remove navigation state
      window.history.replaceState({}, document.title);
    }, 300);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="home-container">
      {/* HERO */}
      <section id="hero-section">
        <Hero />
      </section>

      {/* COLLECTION */}
      <section id="collection-section">
        <Collection />
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="featured-products-section">
        <FeaturedProduct />
      </section>

      {/* TOP BRANDS */}
      <section id="top-brands-section">
        <TopBrand />
      </section>

      {/* BLOG */}
      <section id="blog-section">
        <Blog />
      </section>

      {/* FLASH SALE */}
      <section id="flash-sale-section">
        <FlashSale />
      </section>

      {/* SELLING PRODUCTS */}
      <section id="selling-products-section">
        <SellingProducts />
      </section>

      {/* EXCLUSIVE */}
      <section id="exclusive-section">
        <ExclusiveSection />
      </section>

      {/* NEW ARRIVALS */}
      <section id="new-arrivals-section">
        <NewArrivals />
      </section>

      {/* APP */}
      <section id="chawkbazar-app-section">
        <ChawkBazarApp />
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials-section">
        <Testimonials />
      </section>

      {/* NEWSLETTER GALLERY */}
      <section id="newsletter-gallery-section">
        <NewsletterGallery />
      </section>
    </div>
  );
};

export default Home;