import React from 'react';
import ProductInformation from "../../Components/ProductInformation/ProductInformation";
import ProductImages from "../../Components/ProductImages/ProductImages";
import Pricingstock from "../../Components/Pricingstock/Pricingstock";
import SeoSetting from "../../Components/SeoSetting/SeoSetting";
import ProductPreview from "../../Components/ProductPreview/ProductPreview";

const Addproduct = () => {
  return (
    <div className="new-product-page">
      {/* Left Side */}
      <div className="left-content">
        <ProductInformation />
        <ProductImages />
        <Pricingstock />
        <SeoSetting />
      </div>

      {/* Right Side */}
      <div className="right-sidebar">
        <ProductPreview />
      </div>
    </div>
  );
};

export default Addproduct;