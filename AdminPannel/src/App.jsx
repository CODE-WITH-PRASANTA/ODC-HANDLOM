import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Dashboard from "./Pages/Dashboard/Dashboard"; 

//Components
import Categories from "./Components/Categories/Categories";
import Collections from "./Components/Collections/Collections";
import Customers from "./Components/Customers/Customers";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/customers" element={<Customers />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;