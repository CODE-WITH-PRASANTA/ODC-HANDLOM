import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, HeartHandshake, Truck, Award, ArrowRight } from 'lucide-react';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    date: 'May 20, 2025',
    category: 'Weaving Stories',
    title: 'The Timeless Art of Handloom',
    description: 'Handloom is more than just fabric—it\'s a tradition passed down through generations.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop',
    date: 'May 15, 2025',
    category: 'Style Guide',
    title: '5 Handloom Looks for Every Occasion',
    description: 'From casual outings to festive celebrations, handloom fits every moment beautifully.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
    date: 'May 10, 2025',
    category: 'Sustainability',
    title: 'Sustainable Fashion, Woven Responsibly',
    description: 'Handloom is eco-friendly, ethical, and empowers rural communities.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    date: 'May 05, 2025',
    category: 'News & Events',
    title: 'New Summer Collection Now Live!',
    description: 'Light, airy, and handcrafted with love—explore our latest collection.',
  }
];

const categories = ['All Posts', 'Weaving Stories', 'Style Guide', 'Sustainability', 'News & Events'];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All Posts');

  const filteredPosts = activeCategory === 'All Posts' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="blog-page-wrapper">
      
      {/* Hero / Header Section */}
      <section className="blog-hero">
        <div className="blog-hero-container">
          <p className="blog-subtitle">OUR BLOG</p>
          <h1 className="blog-title">Stories Woven With Tradition</h1>
          <p className="blog-description">
            Discover the art, culture, and craftsmanship behind handloom.<br />
            Explore stories that celebrate our weavers, styles, and sustainability.
          </p>

          {/* Decorative Divider */}
          <div className="hero-divider">
            <span className="divider-line"></span>
            <span className="divider-icon">❖</span>
            <span className="divider-line"></span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="blog-main-container">
        
        {/* Navigation Categories / Filter Buttons */}
        <div className="filter-buttons-container">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="blog-cards-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="card-top-content">
                {/* Image Container */}
                <div className="card-image-wrapper">
                  <img src={post.image} alt={post.title} className="card-image" />
                </div>

                {/* Card Content */}
                <div className="card-body">
                  <div className="card-meta">
                    <span>{post.date}</span>
                    <span className="meta-dot">•</span>
                    <span>{post.category}</span>
                  </div>

                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-description">{post.description}</p>
                </div>
              </div>

                    {/* Read More Link */}
                      <div className="card-footer">
                     <Link to="/blog-details" className="read-more-btn">
                       Read More
                   <ArrowRight className="arrow-icon" />
                     </Link>
                      </div>
            </div>
          ))}
        </div>

        {/* Bottom Feature Highlights Bar */}
        <div className="features-banner">
          <div className="features-grid">
            
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Award className="feature-icon" />
              </div>
              <div className="feature-text">
                <h4>Authentic Handloom</h4>
                <p>Pure craftsmanship from skilled weavers</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Leaf className="feature-icon" />
              </div>
              <div className="feature-text">
                <h4>Sustainable Fashion</h4>
                <p>Eco-friendly fabrics and natural dyes</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <HeartHandshake className="feature-icon" />
              </div>
              <div className="feature-text">
                <h4>Support Artisans</h4>
                <p>Empowering weavers and their families</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Truck className="feature-icon" />
              </div>
              <div className="feature-text">
                <h4>Worldwide Shipping</h4>
                <p>Delivering handloom love across the globe</p>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Blog;