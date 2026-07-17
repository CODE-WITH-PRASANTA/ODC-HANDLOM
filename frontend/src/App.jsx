import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";


// Pages


const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar will be visible on all pages */}
      <Navbar />

      <Routes>
      

      
       
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;