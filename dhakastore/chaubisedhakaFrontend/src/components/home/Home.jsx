import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
// import ProductsLayout from "../products/ProductsLayout";
// import ProductSidebar from "../products/ProductSidebar";
// import Features from "../Info/Features";
import CategoryShowcase from "../Category/CategoryShowcase";
import NewLaunches from "../Category/NewLaunches";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/actions";

import Offer from "../Offer/Offer";
import FeaturedProducts from "../Featured/FeaturedProducts";
import BrandLogosStrip from "../Banner/Brands";
import DealsOfTheDay from "../Offer/Offer";
import { PromotionalBanners } from "../Banner/PromotionalBanner";
import Testimonials from "../Testimonials/Testimonials";

// import Shop from "../shopInfo/Shop";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="w-full mx-auto">
      <Banner />
      <CategoryShowcase />
      <NewLaunches />
      {/* <ProductsLayout />
      <ProductSidebar />
      <Features /> */}

      <FeaturedProducts />
      <Offer />
      <BrandLogosStrip />
      {/* <DealsOfTheDay /> */}
      <PromotionalBanners />
      <Testimonials />
    </div>
  );
};

export default Home;
