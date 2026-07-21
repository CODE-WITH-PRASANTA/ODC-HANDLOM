import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import RecentOrders from "./Components/RecentOrders/RecentOrders";
import PaymentMethods from "./Components/PaymentMethods/PaymentMethods";

// Layout


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/orders" element={<RecentOrders />} />       
        <Route path="/Payment" element={<PaymentMethods />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;