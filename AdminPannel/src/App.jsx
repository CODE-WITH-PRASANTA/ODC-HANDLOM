import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout & Pages
import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/DashBoard/DashBoard";

// Components
import RefundsDashboard from "./Components/RefundsDashboard/RefundsDashboard";
import CreateOrder from "./Components/CreateOrder/CreateOrder";
import AddNewProduct from "./Components/AddNewProduct/AddNewProduct";
import PreviewProduct from "./Components/PreviewProduct/PreviewProduct";
import NewRefund from "./Components/NewRefund/NewRefund";
import OrdersDashboard from "./Components/OdersDashboard/OdersDashboard";

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
        {/* Main Application Layout Wrapper */}
        <Route path="/" element={<MainLayout />}>
          {/* Default redirect to /dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* 1. Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* 2. PRODUCTS */}
          <Route path="products/all-products" element={<Page name="All Products" />} />
          <Route path="products/add-new" element={<AddNewProduct />} />
          <Route path="products/preview" element={<PreviewProduct />} />
          <Route path="products/categories" element={<Page name="Categories" />} />
          <Route path="products/collections" element={<Page name="Collections" />} />
          <Route path="products/brands" element={<Page name="Brands" />} />
          <Route path="products/attributes" element={<Page name="Attributes" />} />

          {/* 3. SALES & ORDERS */}
          <Route path="sales/orders" element={<OrdersDashboard />} />
          <Route path="sales/create-order" element={<CreateOrder />} />
          <Route path="sales/refunds" element={<RefundsDashboard />} />
          <Route path="sales/new-refund" element={<NewRefund />} />
          <Route path="sales/customers" element={<Page name="Customers" />} />
          <Route path="sales/coupons" element={<Page name="Coupons" />} />
          <Route path="sales/payments" element={<Page name="Payments" />} />

          {/* 4. MARKETING */}
          <Route path="marketing/banner-sliders" element={<Page name="Banner Sliders" />} />
          <Route path="marketing/flash-sale" element={<Page name="Flash Sale" />} />
          <Route path="marketing/newsletters" element={<Page name="Newsletters" />} />
          <Route path="marketing/push-notifications" element={<Page name="Push Notifications" />} />

          {/* 5. REPORTS */}
          <Route path="reports/reports" element={<Page name="Reports" />} />
          <Route path="reports/sales-analytics" element={<Page name="Sales Analytics" />} />

          {/* 6. SETTINGS */}
          <Route path="settings/store-settings" element={<Page name="Store Settings" />} />
          <Route path="settings/shipping-methods" element={<Page name="Shipping Methods" />} />
          <Route path="settings/payment-methods" element={<Page name="Payment Methods" />} />
          <Route path="settings/users-roles" element={<Page name="Users & Roles" />} />
        </Route>

        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;