import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";


import TermandCondition from "./Pages/TermandCondition/TermandCondition";
import MainFaq from "./Pages/MainFaq/MainFaq";


// Pages


const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar will be visible on all pages */}
      <Navbar />

      <Routes>
      
     <Route path="/term" element={<TermandCondition/>} />
      <Route path="/faq" element={<MainFaq />}/>
       
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;