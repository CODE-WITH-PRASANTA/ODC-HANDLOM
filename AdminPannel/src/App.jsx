import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RefundsDashboard from "./Components/RefundsDashboard/RefundsDashboard";
import OrdersDashboard from "./Components/OdersDashboard/OdersDashboard";
import CreateOrder from "./Components/CreateOrder/CreateOrder";
import AddNewProduct from "./Components/AddNewProduct/AddNewProduct";
import PreviewProduct from "./Components/PreviewProduct/PreviewProduct";
import NewRefund from "./Components/NewRefund/NewRefund";




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/refund" element={<RefundsDashboard />} />
          <Route path="/order" element={<OrdersDashboard />} />
          <Route path="/creatorder" element={<CreateOrder />} />
          <Route path="/addnewproduct" element={<AddNewProduct />} />
          <Route path="/previewproduct" element={<PreviewProduct />} />
          <Route path="/newfund" element={<NewRefund />} />


          







      </Routes>
    </BrowserRouter>
  );
};

export default App;