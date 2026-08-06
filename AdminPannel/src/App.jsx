import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout Component
import MainLayout from "./Layout/MainLayout/MainLayout";

// Dashboard Page
import Dashboard from "./Pages/DashBoard/DashBoard";

// Product Components
import OrdersDashboard from "./Components/OdersDashboard/OdersDashboard";
import Collections from "./Components/Collections/Collections";
import Attribute from "./Components/Attribute/Attribute";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";

// Marketing Component
import Banner from "./Components/Banner/Banner";

// Action Components
import RefundsDashboard from "./Components/RefundsDashboard/RefundsDashboard";
import CreateOrder from "./Components/CreateOrder/CreateOrder";
import AddNewProduct from "./Components/AddNewProduct/AddNewProduct";
import PreviewProduct from "./Components/PreviewProduct/PreviewProduct";
import NewRefund from "./Components/NewRefund/NewRefund";

// Quick placeholder for pages you haven't created yet
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
        {/* ALL ROUTES INSIDE THIS MAINLAYOUT BLOCK WILL KEEP THE SIDEBAR & TOPBAR VISIBLE */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Default redirect to /dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* 1. Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* 2. PRODUCTS */}
          <Route path="products/all-products" element={<Page name="All Products" />} />
          <Route path="products/collections" element={<Collections />} />
          <Route path="products/attributes" element={<Attribute />} />
          <Route path="products/categories" element={<Categories />} />
          <Route path="products/brands" element={<Brands />} />

          {/* 3. SALES */}
          <Route path="sales/orders" element={<OrdersDashboard />} />
          <Route path="sales/customers" element={<Page name="Customers" />} />
          <Route path="sales/coupons" element={<Page name="Coupons" />} />
          <Route path="sales/refunds" element={<RefundsDashboard />} />
          <Route path="sales/payments" element={<Page name="Payments" />} />

          {/* 4. MARKETING */}
          <Route path="marketing/banner-sliders" element={<Banner />} />
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

          {/* 7. OTHER ACTION ROUTES */}
          <Route path="creatorder" element={<CreateOrder />} />
          <Route path="addnewproduct" element={<AddNewProduct />} />
          <Route path="previewproduct" element={<PreviewProduct />} />
          <Route path="newfund" element={<NewRefund />} />

        </Route>

        {/* Fallback redirect if route does not exist */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;