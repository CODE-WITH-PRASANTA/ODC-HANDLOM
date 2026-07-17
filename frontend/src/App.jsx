import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import FeaturedProduct from "./Components/FeaturedProduct/FeaturedProduct";
import TopBrand from "./Components/TopBrand/TopBrand";
import SignIn from "./Components/SignIn/SignIn";

import TermandCondition from "./Pages/TermandCondition/TermandCondition";
import MainFaq from "./Pages/MainFaq/MainFaq";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/FeaturedProduct" element={<FeaturedProduct />} />
        <Route path="/TopBrand" element={<TopBrand />} />
        <Route path="/SignIn" element={<SignIn />} />

        <Route path="/term" element={<TermandCondition />} />
        <Route path="/faq" element={<MainFaq />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;