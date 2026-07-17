import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 1. Imported Routes and Route
import FeaturedProduct from './Components/FeaturedProduct/FeaturedProduct';
import TopBrand from './Components/TopBrand/TopBrand';
import SignIn from './Components/SignIn/SignIn';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";


// Pages


const App = () => {
  return (
    <BrowserRouter>
      {/* 2. Wrap your Routes inside a <Routes> container */}
      <Routes>
        <Route path="/FeaturedProduct" element={<FeaturedProduct />} />
        <Route path="/TopBrand" element={<TopBrand/>} />
        <Route path="/SignIn" element={<SignIn/>} />
        
     

      </Routes>
      {/* Navbar will be visible on all pages */}
      <Navbar />

      <Routes>
      

      
       
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;