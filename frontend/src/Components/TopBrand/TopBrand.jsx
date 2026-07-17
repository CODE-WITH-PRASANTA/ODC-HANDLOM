import React from 'react';
import './TopBrand.css';

// Import your local banner asset using the relative path from this file
import topBrandBanner from '../../assets/topbrandbanner.webp';

const TopBrand = () => {
  // 16 professional brand card items matching your reference designs
  const brands = [
    { id: 1, logo: 'de', title: 'adidas', bgImage: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=500&q=80' },
    { id: 2, logo: 'V VINTAGE', title: 'Vintage', bgImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
    { id: 3, logo: 'm', isRoundLogo: true, title: 'Minimalist Watch', bgImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
    { id: 4, logo: 'MINIMAL RESTAURANT', title: 'Levi\'s Minimal', bgImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80' },
    { id: 5, logo: 'CA', title: 'Calvin Klein', bgImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80' },
    { id: 6, logo: 'CESARE', tagline: 'TAGLINE HERE', title: 'Cesare', bgImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80' },
    { id: 7, logo: 'qb', title: 'QB Shoes', bgImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80' },
    { id: 8, logo: 'PHOENIX', tagline: 'SLOGAN', title: 'Phoenix Bag', bgImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80' },
    { id: 9, logo: 'MINIMAL CRAFTSMAN', title: 'Hollister Minimal', bgImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=80' },
    { id: 10, logo: 'Fania', title: 'Fania Coat', bgImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80' },
    { id: 11, logo: 'HAIRSTORE VINTAGE', title: 'Vintage Hair', bgImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80' },
    { id: 12, logo: 'Y', title: 'Y-Line Jacket', bgImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80' },
    { id: 13, logo: 'VINTAGE DESIGN', title: 'Blue Vintage', bgImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80' },
    { id: 14, logo: 'Vintage Arts', isRoundLogo: true, title: 'Converse Shoes', bgImage: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=80' },
    { id: 15, logo: 'R', title: 'Retro Portrait', bgImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80' },
    { id: 16, logo: 'HM', title: 'H&M Fashion', bgImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80' },
  ];

  return (
    <div className="top-brand-container">
      {/* Page Heading */}
      <h2 className="top-brand-title">Top Brands</h2>

      {/* Grid containing 16 items */}
      <div className="top-brand-grid">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-card">
            {/* Smooth Zooming & Clockwise Rotating Background Image */}
            <div
              className="brand-bg-image"
              style={{ backgroundImage: `url(${brand.bgImage})` }}
            />

            {/* Overlay that darkens/changes to black smoothly on hover */}
            <div className="brand-overlay" />

            {/* Brand Logo remains constant */}
            <div className="brand-content">
              <div className="brand-logo-wrapper">
                {brand.isRoundLogo ? (
                  <div className="round-logo">
                    {brand.logo}
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

      {/* Modern Promotional Banner Container utilizing your local webp image */}
      <div className="promo-banner">
        <div 
          className="promo-banner-image" 
          style={{ backgroundImage: `url(${topBrandBanner})` }}
        />
      
          </div>
        </div>
      
  );
};

export default TopBrand;