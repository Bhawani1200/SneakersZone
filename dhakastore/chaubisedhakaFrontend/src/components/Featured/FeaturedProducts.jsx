import { useState } from "react";
import { motion } from "motion/react";
import { mockProducts } from "./mockData";
import ProductCard from "../shared/ProductCard";

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts =
    activeTab === "All"
      ? mockProducts
      : mockProducts.filter((p) => p.category === activeTab);

  const tabs = ["All", "Men", "Women", "Kids"];

  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Products
          </h2>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-zinc-100 dark:bg-zinc-900 rounded-lg p-1 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid - Masonry Style */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                productName={product.name}
                image={product.image}
                description={product.brand}
                price={product.originalPrice || product.price}
                discount={product.discount}
                specialPrice={product.price}
                quantity={10}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default FeaturedProducts;
