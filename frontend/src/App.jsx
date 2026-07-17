import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

// Page Components
import Home from './Pages/Home/Home';
import TermandCondition from "./Pages/TermandCondition/TermandCondition";
import MainFaq from "./Pages/MainFaq/MainFaq";

// Feature Components
import FeaturedProduct from "./Components/FeaturedProduct/FeaturedProduct";
import TopBrand from "./Components/TopBrand/TopBrand";
import SignIn from "./Components/SignIn/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar stays at the top of all pages */}
      <Navbar />

      <Routes>
        {/* Redirect empty path to home */}
        <Route path="/" element={<Navigate to="/home" />} />
        
        {/* Main Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/FeaturedProduct" element={<FeaturedProduct />} />
        <Route path="/TopBrand" element={<TopBrand />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/term" element={<TermandCondition />} />
        <Route path="/faq" element={<MainFaq />} />
      </Routes>

      {/* Footer stays at the bottom of all pages */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;