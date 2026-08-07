import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout & Pages
import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/DashBoard/DashBoard";
import NewProduct from "./Pages/NewProduct/NewProduct";
import Refunds from "./Pages/Refunds/Refunds";

// Components
import RefundsDashboard from "./Components/RefundsDashboard/RefundsDashboard";
import OrdersDashboard from "./Components/OdersDashboard/OdersDashboard";
import CreateOrder from "./Components/CreateOrder/CreateOrder";
import AddNewProduct from "./Components/AddNewProduct/AddNewProduct";
import PreviewProduct from "./Components/PreviewProduct/PreviewProduct";
import NewRefund from "./Components/NewRefund/NewRefund";
import SalesCostumers from "./Components/SalesCostumers/SalesCostumers";
import SalesOrder from "./Components/SalesOrder/SalesOrder";

// Quick placeholder component for unbuilt pages
const Page = ({ name }) => (
  <div style={{ padding: "20px", background: "#fff", borderRadius: "10px" }}>
    <h2>{name} Page</h2>
    <p>This page is ready for your content!</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone Pages (Outside Main Layout) */}
        <Route path="/refund" element={<RefundsDashboard />} />
        <Route path="/creatorder" element={<CreateOrder />} />
        <Route path="/addnewproduct" element={<AddNewProduct />} />
        <Route path="/previewproduct" element={<PreviewProduct />} />
        <Route path="/newrefund" element={<NewRefund />} />
        <Route path="/order" element={<OrdersDashboard />} />

        {/* Main Application Layout Wrapper */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* 1. Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* 2. Products */}
          <Route path="products/all-products" element={<NewProduct />} />
          <Route path="products/add-new" element={<AddNewProduct />} />
          <Route path="products/preview" element={<PreviewProduct />} />
          <Route path="products/categories" element={<Page name="Categories" />} />
          <Route path="products/collections" element={<Page name="Collections" />} />
          <Route path="products/brands" element={<Page name="Brands" />} />
          <Route path="products/attributes" element={<Page name="Attributes" />} />

          {/* 3. Sales & Orders */}
          <Route path="sales/orders" element={<SalesOrder />} />
          <Route path="sales/create-order" element={<CreateOrder />} />
          <Route path="sales/refunds" element={<Refunds />} />
          <Route path="sales/new-refund" element={<NewRefund />} />
          <Route path="sales/customers" element={<SalesCostumers />} />
          <Route path="sales/coupons" element={<Page name="Coupons" />} />
          <Route path="sales/payments" element={<Page name="Payments" />} />

          {/* 4. Marketing */}
         
        </Route>

        {/* Fallback 404 route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;