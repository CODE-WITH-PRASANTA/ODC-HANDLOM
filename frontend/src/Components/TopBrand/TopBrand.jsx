import React, { useState } from 'react';
import './TopBrand.css';

// Local banner asset
import topBrandBanner from '../../assets/topbrandbanner.webp';

const TopBrand = () => {
  // 16 curated brand items
  const brands = [
    { id: 1, logo: 'adidas', tagline: 'IMPOSSIBLE IS NOTHING', bgImage: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80' },
    { id: 2, logo: 'VINTAGE', tagline: 'CLASSIC APPAREL', bgImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
    { id: 3, logo: 'M', isRoundLogo: true, tagline: 'MINIMAL WATCHES', bgImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80' },
    { id: 4, logo: 'LEVI\'S', tagline: 'MINIMAL DENIM', bgImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80' },
    { id: 5, logo: 'CK', tagline: 'CALVIN KLEIN', bgImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80' },
    { id: 6, logo: 'CESARE', tagline: 'ITALIAN TAILORING', bgImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80' },
    { id: 7, logo: 'QB', tagline: 'FOOTWEAR CO.', bgImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80' },
    { id: 8, logo: 'PHOENIX', tagline: 'LEATHER GOODS', bgImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80' },
    { id: 9, logo: 'HOLLISTER', tagline: 'PACIFIC SURF', bgImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80' },
    { id: 10, logo: 'FANIA', tagline: 'COATS & JACKETS', bgImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80' },
    { id: 11, logo: 'HAIR VINTAGE', tagline: 'GROOMING STUDIO', bgImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80' },
    { id: 12, logo: 'Y-LINE', tagline: 'OUTERWEAR', bgImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80' },
    { id: 13, logo: 'BLUE VINTAGE', tagline: 'CUSTOM DESIGNS', bgImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' },
    { id: 14, logo: 'VA', isRoundLogo: true, tagline: 'CONVERSE EDITION', bgImage: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80' },
    { id: 15, logo: 'RETRO', tagline: 'PORTRAIT CO.', bgImage: 'https://images.unsplash.com/photo-1506744778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
    { id: 16, logo: 'H&M', tagline: 'FASHION FOR ALL', bgImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80' },
  ];

  // Pagination State (8 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBrands = brands.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Smooth scroll to top of section on page change
      const section = document.getElementById('top-brands-heading');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="top-brand-section" aria-label="Top Fashion Brands">
      <div className="top-brand-container">
        
        {/* Section Header */}
        <div className="top-brand-header" id="top-brands-heading">
          <div className="header-title-wrap">
            <span className="header-accent-dot"></span>
            <h2 className="top-brand-title">Top Brands</h2>
          </div>
          <p className="top-brand-subtitle">
            Explore world-class luxury apparel, footwear, and accessories from leading global brands.
          </p>
        </div>

        {/* Responsive Brand Grid (8 Items per Page) */}
        <div className="top-brand-grid">
          {currentBrands.map((brand) => (
            <div key={brand.id} className="brand-card">
              {/* Rotating & Zooming Background Image */}
              <div
                className="brand-bg-image"
                style={{ backgroundImage: `url(${brand.bgImage})` }}
              />

              {/* Dynamic Dark Gradient Overlay */}
              <div className="brand-overlay" />

              {/* Light Reflection Shine Effect */}
              <div className="brand-shine-fx" />

              {/* Brand Logo & Content Overlay */}
              <div className="brand-content">
                <div className="brand-logo-wrapper">
                  {brand.isRoundLogo ? (
                    <div className="round-logo">
                      <span className="round-logo-char">{brand.logo}</span>
                    </div>
                  ) : (
                    <div className="text-logo">
                      <h3 className="text-logo-main">{brand.logo}</h3>
                      {brand.tagline && (
                        <p className="text-logo-tagline">{brand.tagline}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Pagination Bar */}
        {totalPages > 1 && (
          <div className="top-brand-pagination">
            <button
              type="button"
              className="brand-page-btn brand-page-nav"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Prev</span>
            </button>

            <div className="brand-page-numbers">
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    className={`brand-page-btn brand-page-num ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="brand-page-btn brand-page-nav"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              <span>Next</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}

        {/* Promotional Banner Card */}
        <div className="promo-banner">
          <div 
            className="promo-banner-image" 
            style={{ backgroundImage: `url(${topBrandBanner})` }}
          />
          <div className="promo-banner-overlay" />
          
          <div className="promo-banner-content">
            <span className="promo-tag">LIMITED TIME OFFER</span>
            <h3 className="promo-title">Up to 50% Off On Top Fashion Brands</h3>
            <div className="promo-code-container">
              <span className="promo-code-label">USE PROMO CODE: </span>
              <span className="promo-code-val">UTKAL50</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TopBrand;