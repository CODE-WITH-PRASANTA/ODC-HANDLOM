import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout Component
import MainLayout from "./Layout/MainLayout/MainLayout";

// Dashboard Page
import Dashboard from "./Pages/DashBoard/DashBoard";
import NewProduct from "./Pages/NewProduct/NewProduct";
import Refunds from "./Pages/Refunds/Refunds";

// Product Components
import Collections from "./Components/Collections/Collections";
import Attribute from "./Components/Attribute/Attribute";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import AddNewProduct from "./Components/AddNewProduct/AddNewProduct";
import PreviewProduct from "./Components/PreviewProduct/PreviewProduct";

// Sales Components
import OrdersDashboard from "./Components/OdersDashboard/OdersDashboard";
import RefundsDashboard from "./Components/RefundsDashboard/RefundsDashboard";
import NewRefund from "./Components/NewRefund/NewRefund";
import SalesCostumers from "./Components/SalesCostumers/SalesCostumers";
import SalesOrder from "./Components/SalesOrder/SalesOrder";
import CreateOrder from "./Components/CreateOrder/CreateOrder"; // <-- IMPORTED HERE

// Marketing Components
import Banner from "./Components/Banner/Banner";
import FlashSale from "../../frontend/src/Components/FlashSale/FlashSale";
import Flashsale from "./Components/Flashsale/Flashsale";

// Placeholder Component for pages without unique views yet
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
        {/* MAIN APPLICATION LAYOUT WRAPPER */}
        <Route path="/" element={<MainLayout />}>
          {/* Default Route Redirect */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* 1. Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* 2. Products */}
          <Route path="products/all-products" element={<NewProduct />} />
          <Route path="products/add-new" element={<AddNewProduct />} />
          <Route path="products/preview" element={<PreviewProduct />} />
          <Route path="products/collections" element={<Collections />} />
          <Route path="products/attributes" element={<Attribute />} />
          <Route path="products/categories" element={<Categories />} />
          <Route path="products/brands" element={<Brands />} />

          {/* 3. Sales & Orders */}
          <Route path="sales/orders" element={<OrdersDashboard />} />
          <Route path="sales/create-order" element={<CreateOrder />} /> {/* <-- ROUTE ADDED HERE */}
          <Route path="sales/refunds" element={<Refunds />} />
          <Route path="sales/new-refund" element={<NewRefund />} />
          <Route path="sales/customers" element={<SalesCostumers />} />
          <Route path="sales/coupons" element={<Page name="Coupons" />} />
          <Route path="sales/payments" element={<Page name="Payments" />} />

          {/* 4. Marketing */}
          <Route path="marketing/banner-sliders" element={<Banner />} />
          <Route path="marketing/flash-sale" element={<Flashsale/>}/>
          <Route path="marketing/newsletters" element={<Page name="Newsletters" />} />
          <Route path="marketing/push-notifications" element={<Page name="Push Notifications" />} />

          {/* 5. Reports */}
          <Route path="reports/reports" element={<Page name="Reports" />} />
          <Route path="reports/sales-analytics" element={<Page name="Sales Analytics" />} />

          {/* 6. Settings */}
          <Route path="settings/store-settings" element={<Page name="Store Settings" />} />
          <Route path="settings/shipping-methods" element={<Page name="Shipping Methods" />} />
          <Route path="settings/payment-methods" element={<Page name="Payment Methods" />} />
          <Route path="settings/users-roles" element={<Page name="Users & Roles" />} />
        </Route>

        {/* Fallback 404 Route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;