import React, { useEffect, useState } from 'react';
import './TermPurpose.css';

const TermPurpose = () => {
  const [activeSection, setActiveSection] = useState('purpose');

  const menuItems = [
    { id: 'purpose', label: '00 PURPOSE' },
    { id: 'personal-data', label: '01 WHAT IS PERSONAL DATA?' },
    { id: 'data-collected', label: '02 PERSONAL DATA COLLECTED' },
    { id: 'accessing-data', label: '03 ACCESSING YOUR PERSONAL DATA' },
    { id: 'complaints', label: '04 COMPLAINTS' },
    { id: 'owner-controller', label: '05 OWNER AND DATA CONTROLLER' },
  ];

  // Optional: Highlight menu items as user scrolls down the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of menuItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // offset for sticky mobile menus if needed
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="TermPurpose-container">
      <div className="TermPurpose-wrapper">
        {/* Left Sidebar Navigation */}
        <aside className="TermPurpose-sidebar">
          <nav className="TermPurpose-nav">
            <ul className="TermPurpose-menu-list">
              {menuItems.map((item) => (
                <li key={item.id} className="TermPurpose-menu-item">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`TermPurpose-menu-link ${
                      activeSection === item.id ? 'TermPurpose-menu-link-active' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Right Side Content Panel */}
        <main className="TermPurpose-content">
          {/* Section 00: Purpose */}
          <section id="purpose" className="TermPurpose-section">
            <h2 className="TermPurpose-heading">Purpose</h2>
            <p className="TermPurpose-paragraph">
              Little &amp; Big is committed to protecting your privacy because we are committed to valuing people. 
              Our Privacy Policy below sets out how your personal information is collected, used and protected. 
              The <span className="TermPurpose-highlight">Demo Country Privacy Principles</span> also apply to us.
            </p>
            <p className="TermPurpose-paragraph">
              This Privacy Policy describes our policies and procedures on the collection, holding, use and disclosure 
              of your personal information and should be read together with our Terms and Conditions. By providing 
              your personal information you consent to our collection, use and disclosure of that information in 
              accordance with this Privacy Policy.
            </p>
          </section>

          {/* Section 01: What is Personal Data? */}
          <section id="personal-data" className="TermPurpose-section">
            <h2 className="TermPurpose-heading">What is Personal Data?</h2>
            <p className="TermPurpose-paragraph">
              When used in this Policy, 'personal information' has the meaning given in the Privacy Act. Generally, 
              it means any information or an opinion that could be used to identify you.
            </p>
          </section>

          {/* Section 02: Personal Data Collected */}
          <section id="data-collected" className="TermPurpose-section">
            <h2 className="TermPurpose-heading">Personal Data Collected</h2>
            <p className="TermPurpose-paragraph">
              Personal Data collected for the following purposes and using the following services:
            </p>
            <ul className="TermPurpose-list">
              <li>Google Analytics: Cookies; Usage Data</li>
              <li>Contact form: email address; first name; phone number</li>
            </ul>
          </section>

          {/* Section 03: Accessing your Personal Data */}
          <section id="accessing-data" className="TermPurpose-section">
            <h2 className="TermPurpose-heading">Accessing your Personal Data</h2>
            <p className="TermPurpose-paragraph">
              You may request access to your personal information collected by us, and ask that we correct that 
              personal information. You can ask for access or correction by contacting us and we will usually 
              respond within 30 days. If we refuse to give you access to, or correct, your personal information, 
              we will notify you in writing setting out the reasons.
            </p>
          </section>

          {/* Section 04: Complaints */}
          <section id="complaints" className="TermPurpose-section">
            <h2 className="TermPurpose-heading">Complaints</h2>
            <p className="TermPurpose-paragraph">
              If you believe your privacy has been breached or you have a complaint about how we have handled 
              your personal information, please contact us in writing. We will respond within a reasonable period 
              (usually within 30 days).
            </p>
          </section>

          {/* Section 05: Owner and Data Controller */}
          <section id="owner-controller" className="TermPurpose-section">
            <h2 className="TermPurpose-heading">Owner and Data Controller</h2>
            <div className="TermPurpose-address-block">
              <p>The Commons</p>
              <p>20-40 demo St,</p>
              <p>Jon doe NSW 2008</p>
              <p>Country</p>
            </div>
            <p className="TermPurpose-email-block">
              Email: <a href="mailto:demo@demo.com" className="TermPurpose-link">demo@demo.com</a>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TermPurpose;