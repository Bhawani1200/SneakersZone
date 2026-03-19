import React from "react";
import Banner from "../Banner/Banner";
import ProductsLayout from "../products/ProductsLayout";
import ProductSidebar from "../products/ProductSidebar";
import Features from "../Info/Features";
import CategoryShowcase from "../Category/CategoryShowcase";
import NewLaunches from "../Category/NewLaunches";

import Marketing from "../Info/Marketing";
import Offer from "../Offer/Offer";
// import Shop from "../shopInfo/Shop";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <CategoryShowcase />
      <NewLaunches />
      <ProductsLayout />
      <ProductSidebar />
      <Features />
      <Marketing />
      {/* <Shop /> */}
      {/* <ImageGallery /> */}
      <Offer />
    </div>
  );
};

export default Home;
