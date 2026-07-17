import React, { useState } from 'react';
import './FaqInbox.css';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FaqInbox = () => {
  // State to track which FAQ is currently open
  const [activeFaq, setActiveFaq] = useState(null);
  const [email, setEmail] = useState('');

  const faqData = [
    {
      id: 1,
      question: "Where is ODC Handloom located in BBSR?",
      answer: "Our physical store is located near The Clove Restaurant, Jagamara Road, Jagamara, Bhubaneswar (BBSR), Odisha - 751030. You can easily find us on Google Maps for step-by-step directions."
    },
    {
      id: 2,
      question: "Are your Sambalpuri and Odisha handlooms 100% authentic?",
      answer: "Yes, absolutely. ODC Handloom specializes in 100% authentic handwoven Odisha textiles. We source our Sambalpuri cotton sarees, Bomkai silk, Khandua, and handloom dress materials directly from master weavers across Odisha."
    },
    {
      id: 3,
      question: "How can I contact ODC Handloom BBSR customer service?",
      answer: "You can reach our customer support team directly by calling or messaging us on WhatsApp at +91 99375 05036. You can also visit our Jagamara showroom between 9:00 AM and 10:00 PM."
    },
    {
      id: 4,
      question: "Do you offer shipping outside of Bhubaneswar / Odisha?",
      answer: "Yes, we offer reliable shipping services across India. Whether you are ordering a traditional Sambalpuri saree or customized dress material, we ensure safe and prompt delivery to your doorstep."
    }
  ];

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Thank you for subscribing to ODC Handloom updates: ${email}`);
      setEmail('');
    }
  };

  // Structured Data (JSON-LD Local Business Schema) for Premium SEO indexing
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "ODC Handloom",
    "description": "Authentic Sambalpuri cotton sarees, Bomkai silk, and traditional Odisha handlooms in Jagamara, Bhubaneswar.",
    "telephone": "+919937505036",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near The Clove Restaurant, Jagamara Road",
      "addressLocality": "Bhubaneswar",
      "addressRegion": "Odisha",
      "postalCode": "751030",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.2573071,
      "longitude": 85.7984751
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "22:00"
    }
  };

  return (
    <div className="FaqInbox">
      {/* Dynamic SEO JSON-LD Injection */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      <div className="FaqInbox-wrapper">
        
        {/* FAQ Accordion Section */}
        <section className="FaqInbox-accordion-section" aria-label="ODC Handloom BBSR FAQs">
          {faqData.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <article 
                key={faq.id} 
                className={`FaqInbox-card ${isOpen ? 'FaqInbox-card-open' : ''}`}
              >
                <button 
                  className="FaqInbox-card-trigger"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="FaqInbox-question">{faq.question}</span>
                  <span className="FaqInbox-icon-wrapper">
                    {isOpen ? <FiMinus className="FaqInbox-icon" /> : <FiPlus className="FaqInbox-icon" />}
                  </span>
                </button>
                <div className={`FaqInbox-card-content ${isOpen ? 'FaqInbox-card-content-show' : ''}`}>
                  <div className="FaqInbox-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Newsletter Subscription Section */}
        <section className="FaqInbox-newsletter-section">
          <div className="FaqInbox-newsletter-container">
            <div className="FaqInbox-newsletter-info">
              <h2 className="FaqInbox-newsletter-title">Get Expert Tips In Your Inbox</h2>
              <p className="FaqInbox-newsletter-subtitle">Subscribe to our newsletter and stay updated.</p>
            </div>
            
            <form onSubmit={handleSubscribe} className="FaqInbox-form">
              <div className="FaqInbox-input-group">
                <input 
                  type="email" 
                  className="FaqInbox-input" 
                  placeholder="Write your email here" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email Address for ODC Handloom Newsletter"
                />
                <button type="submit" className="FaqInbox-submit-btn">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
};

export default FaqInbox;