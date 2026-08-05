import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/DashBoard/DashBoard";

import RefundsDashboard from "./Components/RefundsDashboard/RefundsDashboard";
import OrdersDashboard from "./Components/OdersDashboard/OdersDashboard";
import CreateOrder from "./Components/CreateOrder/CreateOrder";
import AddNewProduct from "./Components/AddNewProduct/AddNewProduct";
import PreviewProduct from "./Components/PreviewProduct/PreviewProduct";
import NewRefund from "./Components/NewRefund/NewRefund";
import NewProduct from "./Pages/NewProduct/NewProduct";
import Refunds from "./Pages/Refunds/Refunds";
import SalesCostumers from "./Components/SalesCostumers/SalesCostumers";
import SalesOrder from "./Components/SalesOrder/SalesOrder";

// Placeholder component
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
        {/* Standalone Pages */}
        <Route path="/refund" element={<RefundsDashboard />} />
        <Route path="/creatorder" element={<CreateOrder />} />
        <Route path="/addnewproduct" element={<AddNewProduct />} />
        <Route path="/previewproduct" element={<PreviewProduct />} />
        <Route path="/newrefund" element={<NewRefund />} />
        <Route path="/order" element={<OrdersDashboard />} />
        

        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
<Route path="sales/refunds" element={<Refunds/>}/>
<Route path="sales/customers" element={<SalesCostumers/>}/>
<Route path="sales/orders" element={<SalesOrder/>}/>
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Products */}
          <Route path="products/all-products" element={<NewProduct />} />
          <Route path="products/categories" element={<Page name="Categories" />} />
          <Route path="products/collections" element={<Page name="Collections" />} />
          <Route path="products/brands" element={<Page name="Brands" />} />
          <Route path="products/attributes" element={<Page name="Attributes" />} />

          {/* Sales */}
          <Route path="sales/orders" element={<Page name="Orders" />} />
          <Route path="sales/customers" element={<Page name="Customers" />} />
          <Route path="sales/coupons" element={<Page name="Coupons" />} />
          <Route path="sales/refunds" element={<Page name="Refunds" />} />
          <Route path="sales/payments" element={<Page name="Payments" />} />

          {/* Marketing */}
          <Route path="marketing/banner-sliders" element={<Page name="Banner Sliders" />} />
          <Route path="marketing/flash-sale" element={<Page name="Flash Sale" />} />
          <Route path="marketing/newsletters" element={<Page name="Newsletters" />} />
          <Route path="marketing/push-notifications" element={<Page name="Push Notifications" />} />

          {/* Reports */}
          <Route path="reports/reports" element={<Page name="Reports" />} />
          <Route path="reports/sales-analytics" element={<Page name="Sales Analytics" />} />

          {/* Settings */}
          <Route path="settings/store-settings" element={<Page name="Store Settings" />} />
          <Route path="settings/shipping-methods" element={<Page name="Shipping Methods" />} />
          <Route path="settings/payment-methods" element={<Page name="Payment Methods" />} />
          <Route path="settings/users-roles" element={<Page name="Users & Roles" />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;