import React from "react";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RefundsDashboard from "./Components/RefundsDashboard/RefundsDashboard";
import OrdersDashboard from "./Components/OdersDashboard/OdersDashboard";
import CreateOrder from "./Components/CreateOrder/CreateOrder";
import AddNewProduct from "./Components/AddNewProduct/AddNewProduct";
import PreviewProduct from "./Components/PreviewProduct/PreviewProduct";
import NewRefund from "./Components/NewRefund/NewRefund";

=======
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
>>>>>>> 0ca638502330bbfe77e4427e77f9fd7a868259ab



import Dashboard from "./Pages/DashBoard/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        
        <Route path="/refund" element={<RefundsDashboard />} />
          <Route path="/order" element={<OrdersDashboard />} />
          <Route path="/creatorder" element={<CreateOrder />} />
          <Route path="/addnewproduct" element={<AddNewProduct />} />
          <Route path="/previewproduct" element={<PreviewProduct />} />
          <Route path="/newfund" element={<NewRefund />} />


          







=======
        <Route path="/" element={<MainLayout />}>
          {/* Default redirect from root to dashboard */}
      
          
    

          {/* Redirect "/" to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard/>}/>

          {/* Shop */}
         

       

        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
>>>>>>> 0ca638502330bbfe77e4427e77f9fd7a868259ab
      </Routes>
    </BrowserRouter>
  );
}

export default App;