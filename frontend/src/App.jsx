import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 1. Imported Routes and Route
import FeaturedProduct from './Components/FeaturedProduct/FeaturedProduct';
// import FeaturedBanner from './Components/FeaturedBanner/FeaturedBanner';

const App = () => {
  return (
    <BrowserRouter>
      {/* 2. Wrap your Routes inside a <Routes> container */}
      <Routes>
        <Route path="/FeaturedProduct" element={<FeaturedProduct />} />
         {/* <Route path="/FeaturedBanner" element={<FeaturedBanner/>} /> */}
        
     

      </Routes>
    </BrowserRouter>
  );
};

export default App;