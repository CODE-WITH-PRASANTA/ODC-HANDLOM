import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/ODC GANDLOM LOGO.png";

const Navbar = ({ cartCount = 2 }) => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();



  const navLinks = [
    {
      title: "Home",
      sectionId: "hero-section",
    },
    {
      title: "Flash Sale",
      sectionId: "flash-sale-section",
    },
    {
      title: "Products",
      sectionId: "featured-products-section",
    },
    {
      title: "Trending",
      sectionId: "top-brands-section",
    },
    {
      title: "On Selling",
      sectionId: "selling-products-section",
    },
    {
      title: "New Arrival",
      sectionId: "new-arrivals-section",
    },
    {
      title: "Gallery",
      sectionId: "newsletter-gallery-section",
    },
    {
      title: "Testimonials",
      sectionId: "testimonials-section",
    },
  ];



  // Navbar scroll effect
  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);





  // Section ID navigation
  const handleNavClick = (e, sectionId) => {

    e.preventDefault();

    setIsMobileMenuOpen(false);



    // If already home page
    if(location.pathname === "/home") {


      const section =
        document.getElementById(sectionId);



      if(section) {

        const navbarHeight = 85;


        const scrollPosition =
          section.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;



        window.scrollTo({

          top: scrollPosition,

          behavior:"smooth"

        });

      }


      return;

    }




    // Other pages -> Home + Scroll
    navigate("/home",{

      state:{
        scrollTo:sectionId
      }

    });


  };





  // Search
  const handleSearchSubmit = (e)=>{

    e.preventDefault();


    if(searchQuery.trim()){

      setIsSearchOpen(false);


      navigate(
        `/products?search=${encodeURIComponent(searchQuery)}`
      );

    }

  };





  return (

    <>

      <nav
        className={`premium-navbar ${
          isScrolled
          ? "navbar-scrolled"
          : ""
        }`}
      >


        <div className="navbar-wrapper">



          {/* LOGO */}
<div className="navbar-logo-section">
  <Link
    to="/home"
    className="navbar-logo-link"
    onClick={(e) => handleNavClick(e, "hero-section")}
  >
    <img
      src={logo}
      alt="ODC Handloom"
      className="navbar-logo-img"
    />
  </Link>
</div>





          {/* NAV LINKS */}

          <ul
            className={`navbar-links-list ${
              isMobileMenuOpen
              ? "navbar-mobile-open"
              :""
            }`}
          >

            {
              navLinks.map((item)=>(

                <li
                  key={item.sectionId}
                  className="navbar-link-item"
                >

                  <a
                    href={`#${item.sectionId}`}
                    onClick={(e)=>
                      handleNavClick(
                        e,
                        item.sectionId
                      )
                    }
                    className="navbar-link-anchor"
                  >

                    {item.title}

                  </a>


                </li>

              ))
            }


          </ul>
                    {/* ACTION SECTION */}

          <div className="navbar-actions-section">


            {/* SEARCH BUTTON */}

            <button
              className="navbar-action-btn search-btn"
              aria-label="Search Products"
              onClick={() => setIsSearchOpen(true)}
            >

              <svg
                className="navbar-icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >

                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />

              </svg>


            </button>





            {/* SIGN IN */}

            <Link
              to="/signin"
              className="navbar-signin-btn"
            >

              Sign In

            </Link>






            {/* CART */}

            <Link
              to="/cart"
              className="navbar-action-btn navbar-cart-btn"
              aria-label="Cart"
            >

              <svg
                className="navbar-icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >

                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />

                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                />

                <path d="M16 10a4 4 0 0 1-8 0" />

              </svg>



              {
                cartCount > 0 && (

                  <span className="navbar-cart-badge">

                    {cartCount}

                  </span>

                )
              }


            </Link>







            {/* MOBILE HAMBURGER */}

            <button
              className={`navbar-hamburger ${
                isMobileMenuOpen
                ? "navbar-hamburger-active"
                : ""
              }`}
              onClick={() =>
                setIsMobileMenuOpen(
                  !isMobileMenuOpen
                )
              }
              aria-label="Toggle Menu"
            >

              <span className="navbar-hamburger-bar"></span>
              <span className="navbar-hamburger-bar"></span>
              <span className="navbar-hamburger-bar"></span>


            </button>



          </div>



        </div>


      </nav>









      {/* SEARCH MODAL */}

      {
        isSearchOpen && (

          <div
            className="navbar-search-modal-overlay"
            onClick={() =>
              setIsSearchOpen(false)
            }
          >


            <div
              className="navbar-search-modal-card"
              onClick={(e)=>
                e.stopPropagation()
              }
            >


              <form
                onSubmit={handleSearchSubmit}
                className="navbar-search-form"
              >



                <svg
                  className="search-input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >

                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                  />

                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                  />

                </svg>





                <input
                  type="text"
                  className="navbar-search-input"
                  placeholder="Search products, brands, collections..."
                  value={searchQuery}
                  onChange={(e)=>
                    setSearchQuery(
                      e.target.value
                    )
                  }
                  autoFocus
                />





                <button
                  type="button"
                  className="close-search-btn"
                  onClick={() =>
                    setIsSearchOpen(false)
                  }
                >

                  ✕

                </button>



              </form>


            </div>


          </div>

        )
      }



    </>

  );

};


export default Navbar;