import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import CategoryShowcase from "../Category/CategoryShowcase";
import NewLaunches from "../Category/NewLaunches";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions";
import Offer from "../Offer/Offer";
import FeaturedProducts from "../Featured/FeaturedProducts";
import BrandLogosStrip from "../Banner/Brands";
import { PromotionalBanners } from "../Banner/PromotionalBanner";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  const { products } = useSelector((state) => state.products);

  const newLaunchesProducts = products.filter((p) =>
    p.sections?.includes("newLaunches"),
  );
  const offerProducts = products.filter((p) => p.sections?.includes("offer"));
  const featuredProducts = products.filter((p) =>
    p.sections?.includes("featured"),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="w-full mx-auto">
      <Banner />
      <CategoryShowcase />
      <NewLaunches products={newLaunchesProducts} />

      <FeaturedProducts products={featuredProducts} />
      <Offer products={offerProducts} />
      <BrandLogosStrip />

      <PromotionalBanners />
      <Testimonials />
    </div>
  );
};

export default Home;
