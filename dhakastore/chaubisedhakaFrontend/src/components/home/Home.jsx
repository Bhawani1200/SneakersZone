import React, { useEffect } from "react";
import { motion } from "motion/react";

import Banner from "../Banner/Banner";
import CategoryShowcase from "../Category/CategoryShowcase";
import NewLaunches from "../Category/NewLaunches";
import BestSeller from "../Offer/BestSeller";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchShoeCleanerProducts } from "../../store/actions";
import Offer from "../Offer/Offer";
import FeaturedProducts from "../Featured/FeaturedProducts";
import BrandLogosStrip from "../Banner/Brands";
import { PromotionalBanners } from "../Banner/PromotionalBanner";
import Testimonials from "../Testimonials/Testimonials";
import Spinners from "../shared/Spinners";
import ServiceFeatures from "../Banner/ServiceFeatures";
import OfferBanners from "../Banner/OfferBanners";

const Home = () => {
  const {
    products: regularProducts,
    loading,
    error,
  } = useSelector((state) => state.products);
  const { shoeCleanerProducts } = useSelector((state) => state.shoeCleaner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchShoeCleanerProducts());
  }, [dispatch]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinners />
      </div>
    );
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-center">
          <p>Error loading products: {error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Ensure products is an array before filtering (fallback to empty array)
  const productList = [
    ...(regularProducts || []),
    ...(shoeCleanerProducts || []),
  ];

  // Safe filtering with optional chaining
  const newLaunchesProducts = productList.filter((p) =>
    p.sections?.includes("newLaunches"),
  );
  const offerProducts = productList.filter((p) =>
    p.sections?.includes("offer"),
  );
  const featuredProducts = productList.filter((p) =>
    p.sections?.includes("featured"),
  );

  return (
    <div className="w-full mx-auto">
      <Banner />
      {/* <CategoryShowcase /> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ServiceFeatures />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <NewLaunches products={newLaunchesProducts} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <OfferBanners />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FeaturedProducts products={featuredProducts} />
      </motion.div>

      {offerProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Offer products={offerProducts} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BrandLogosStrip />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <PromotionalBanners />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BestSeller />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Testimonials />
      </motion.div>
    </div>
  );
};

export default Home;
