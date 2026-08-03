import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaClock, 
  FaFacebookF, 
  FaPinterestP, 
  FaInstagram, 
  FaEnvelope,
  FaFeatherAlt,
  FaBookOpen,
  FaLeaf,
  FaNewspaper
} from 'react-icons/fa';
import './BlogDetails.css';

const categoriesData = [
  { id: 'weaving-stories', name: 'Weaving Stories', icon: <FaFeatherAlt /> },
  { id: 'style-guide', name: 'Style Guide', icon: <FaBookOpen /> },
  { id: 'sustainability', name: 'Sustainability', icon: <FaLeaf /> },
  { id: 'news-events', name: 'News & Events', icon: <FaNewspaper /> }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Handwoven Cotton Saree',
    price: '₹1,699',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Linen Handloom Kurta',
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Handloom Dupatta',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=300&auto=format&fit=crop'
  }
];

const relatedPosts = [
  {
    id: 1,
    date: 'May 15, 2025',
    title: '5 Handloom Looks for Every Occasion',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 2,
    date: 'May 10, 2025',
    title: 'Natural Dyes in Handloom: Back to Our Roots',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 3,
    date: 'May 05, 2025',
    title: 'Summer Style with Handloom Fabrics',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 4,
    date: 'Apr 28, 2025',
    title: 'Sustainable Fashion: Why Handloom is the Future',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=500&auto=format&fit=crop'
  }
];

const BlogDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState('weaving-stories');
  const [email, setEmail] = useState('');

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="bd-wrapper">
      <div className="bd-container">
        
        {/* Top Full Banner Image */}
        <div className="bd-hero-banner">
          <img 
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1400&auto=format&fit=crop" 
            alt="Handloom Weaving Craft" 
          />
        </div>

        {/* Main Content Layout Grid */}
        <div className="bd-main-grid">
          
          {/* Left / Main Blog Article Section */}
          <article className="bd-article-card">
            
            <div className="bd-category-badge">WEAVING STORIES</div>
            
            <h1 className="bd-article-title">The Timeless Art of Handloom</h1>
            
            <div className="bd-meta-info">
              <span><FaCalendarAlt className="meta-icon" /> May 20, 2025</span>
              <span><FaUser className="meta-icon" /> By Weave & Roots</span>
              <span><FaClock className="meta-icon" /> 5 min read</span>
            </div>

            <p className="bd-intro-text">
              Handloom is more than just fabric—it's a tradition passed down through generations.
              Each weave carries the story of our culture, our artisans, and our roots.
            </p>

            {/* Content Section 1 */}
            <div className="bd-content-row">
              <div className="bd-text-col">
                <h2 className="bd-section-heading">A Heritage Woven with Love</h2>
                <p>
                  Handloom weaving is one of the oldest crafts in the world. In India, it's not just a skill—it's a way of life. From the rhythmic clack of the loom to the intricate patterns, every piece is handcrafted with patience, precision, and passion.
                </p>
              </div>
              <div className="bd-img-col">
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop" 
                  alt="Weaving Shuttles" 
                />
              </div>
            </div>

            {/* Content Section 2 */}
            <div className="bd-content-row reverse">
              <div className="bd-img-col">
                <img 
                  src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600&auto=format&fit=crop" 
                  alt="Saree Fabrics" 
                />
              </div>
              <div className="bd-text-col">
                <h2 className="bd-section-heading">Why Handloom Matters</h2>
                <p>
                  In a world of fast fashion, handloom stands for sustainability, authenticity, and support for rural communities. It empowers weavers, preserves traditional techniques, and gives us textiles that are eco-friendly and long-lasting.
                </p>
              </div>
            </div>

            {/* Content Section 3 */}
            <div className="bd-content-row">
              <div className="bd-text-col">
                <h2 className="bd-section-heading">More Than Just Clothing</h2>
                <p>
                  When you choose handloom, you don't just wear a beautiful piece of clothing—you carry a piece of heritage with you. Every saree, kurta, or stole is a celebration of our culture and craftsmanship.
                </p>
              </div>
              <div className="bd-img-col">
                <img 
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop" 
                  alt="Model wearing Handloom" 
                />
              </div>
            </div>

            <p className="bd-outro-text">
              Let's keep this timeless art alive—support handloom, support artisans, support India.
            </p>

            {/* Social Share Bar */}
            <div className="bd-share-bar">
              <span className="share-label">Share:</span>
              <div className="share-icons">
                <button aria-label="Facebook"><FaFacebookF /></button>
                <button aria-label="Pinterest"><FaPinterestP /></button>
                <button aria-label="Instagram"><FaInstagram /></button>
                <button aria-label="Email"><FaEnvelope /></button>
              </div>
            </div>

          </article>

          {/* Right Sidebar Section */}
          <aside className="bd-sidebar">
            
            {/* About Author Box */}
            <div className="bd-sidebar-card text-center">
              <h3 className="sidebar-title">About the Author</h3>
              <div className="author-logo-circle">
                <span className="author-logo-icon">❖</span>
              </div>
              <h4 className="author-name">Weave & Roots</h4>
              <p className="author-desc">
                We are a handloom clothing store passionate about preserving traditions and supporting handcrafted excellence.
              </p>
            </div>

            {/* Categories Box (Working) */}
            <div className="bd-sidebar-card">
              <h3 className="sidebar-title">Categories</h3>
              <ul className="categories-list">
                {categoriesData.map((cat) => (
                  <li 
                    key={cat.id} 
                    className={`category-item ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    <span className="category-icon">{cat.icon}</span>
                    <span className="category-name">{cat.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Products Box */}
            <div className="bd-sidebar-card">
              <h3 className="sidebar-title">Featured Products</h3>
              <div className="featured-products-list">
                {featuredProducts.map((prod) => (
                  <div key={prod.id} className="product-item">
                    <img src={prod.image} alt={prod.name} className="product-img" />
                    <div className="product-info">
                      <h4 className="product-name">{prod.name}</h4>
                      <span className="product-price">{prod.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Inspired / Newsletter Box */}
            <div className="bd-sidebar-card newsletter-card">
              <h3 className="sidebar-title left-align">Stay Inspired</h3>
              <p className="newsletter-desc">
                Get stories, updates & offers straight to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="subscribe-btn">Subscribe</button>
              </form>
            </div>

          </aside>

        </div>

        {/* You May Also Like Section */}
        <section className="bd-related-section">
          <h2 className="related-heading">You May Also Like</h2>
          <div className="related-grid">
            {relatedPosts.map((post) => (
              <div key={post.id} className="related-card">
                <div className="related-img-wrapper">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="related-card-body">
                  <span className="related-date">{post.date}</span>
                  <h3 className="related-title">{post.title}</h3>
                  <a href="#read" className="related-read-more">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default BlogDetails;