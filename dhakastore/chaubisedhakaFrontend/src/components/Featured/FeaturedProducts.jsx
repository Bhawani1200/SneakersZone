import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/actions";
import { Pagination } from "@mui/material";
import {
  LayoutGrid,
  User,
  Baby,
  Users,
  Zap,
  Activity,
  Coffee,
  ArrowRight,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LaunchCard from "../shared/LaunchCard";
import api from "../../api/api";

const FeaturedProducts = () => {
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemsPerPage = 8;

  const { categories } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsProductLoading(true);
      try {
        const { data } = await api.get(
          "/user/public/products?pageNumber=0&pageSize=100&sortBy=productId&sortOrder=desc&minPrice=0&maxPrice=999999",
        );

        const formattedProducts = (data.content || [])
          .filter((product) => {
            const sections = Array.isArray(product.sections)
              ? product.sections.map((sec) =>
                  typeof sec === "object" ? sec.id : sec,
                )
              : typeof product.sections === "string"
                ? product.sections.split(",").map((s) => s.trim())
                : [];

            return sections.includes("featured");
          })
          .map((product) => ({
            ...product,
            productId: product.productId || product.id,
            image: product.image
              ? product.image.startsWith("http")
                ? product.image
                : `http://localhost:8080/images/${product.image}`
              : "/placeholder-product.png",
          }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setIsProductLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((p) => p.category === activeTab);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const tabs = [
    { id: "All", label: "All", icon: <LayoutGrid className="w-5 h-5" /> },
    {
      id: "Men",
      label: "Men",
      gender: "MEN",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "Women",
      label: "Women",
      gender: "WOMEN",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "Kids",
      label: "Kids",
      gender: "KIDS",
      icon: <Baby className="w-5 h-5" />,
    },
    ...(categories || []).map((cat) => ({
      id: cat.categoryId,
      label: cat.categoryName,
      categoryId: cat.categoryId,
      icon: <Zap className="w-4 h-4" />,
    })),
  ];

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    const firstCard = container.querySelector("[data-featured-card]");
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = parseInt(window.getComputedStyle(container).gap) || 24;
      const scrollAmount = cardWidth + gap;
      container.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
    }
  };

  const handleTabClick = (tab) => {
    setCurrentPage(1);
    if (tab.id === "All") {
      setActiveTab("All");
    } else {
      setActiveTab(tab.id);
      const path = tab.gender
        ? `/products?gender=${tab.gender}`
        : `/products?category=${tab.label}`;
      navigate(path);
    }
  };

  return (
    <section
      id="featured-section"
      className="py-16 md:py-24 bg-white dark:bg-zinc-950 overflow-hidden"
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center mb-16 gap-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-3">
                <span className="w-10 h-[2px] bg-blue-600/30 rounded-full" />
                <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs">
                  Exclusive Selection
                </span>
                <span className="w-10 h-[2px] bg-blue-600/30 rounded-full" />
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-gray-100 uppercase italic tracking-tighter">
                Featured <span className="text-blue-600">Products</span>
              </h2>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-center px-4">
              Step into the future of footwear. Explore our handpicked
              collection where{" "}
              <span className="text-gray-900 dark:text-gray-100 font-bold italic">
                elite performance
              </span>{" "}
              seamlessly blends with{" "}
              <span className="text-blue-600 font-bold italic">
                cutting-edge design
              </span>{" "}
              for the ultimate street statement.
            </p>
          </div>

          {/* Filter Tabs - Centered with Horizontal Scroll on Mobile */}
          <div className="w-full flex justify-center px-4 md:px-0 mb-12">
            <div className="flex overflow-x-auto pb-2 md:pb-0 scrollbar-hide max-w-full">
              <div className="inline-flex bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-1.5 gap-1.5 shadow-inner border border-zinc-200 dark:border-zinc-800">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-zinc-800 text-blue-600 shadow-md scale-[1.05]"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-white/50 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    {tab.icon && <span className="opacity-70">{tab.icon}</span>}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Display - Grid with Pagination */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-[400px]"
            >
              {isProductLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                  <p className="text-zinc-500 font-bold animate-pulse">
                    Loading amazing products...
                  </p>
                </div>
              ) : paginatedProducts.length > 0 ? (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
                    {paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product.productId || index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <LaunchCard {...product} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination Control */}
                  {filteredProducts.length > itemsPerPage && (
                    <div className="flex justify-center mt-12">
                      <Pagination
                        count={Math.ceil(
                          filteredProducts.length / itemsPerPage,
                        )}
                        page={currentPage}
                        onChange={(e, value) => {
                          setCurrentPage(value);
                          window.scrollTo({
                            top:
                              document.getElementById("featured-section")
                                ?.offsetTop - 100,
                            behavior: "smooth",
                          });
                        }}
                        color="primary"
                        size="large"
                        shape="rounded"
                        sx={{
                          "& .MuiPaginationItem-root": {
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            color: "inherit",
                          },
                          "& .Mui-selected": {
                            backgroundColor: "#2563eb !important",
                            color: "white !important",
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                  <span className="text-6xl mb-4">👟</span>
                  <p className="text-zinc-500 font-bold text-xl">
                    No products found in this category
                  </p>
                  <button
                    onClick={() => setActiveTab("All")}
                    className="mt-4 text-blue-600 font-bold hover:underline"
                  >
                    Back to all products
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={() => navigate("/products")}
              className="group flex items-center gap-3 px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-black uppercase tracking-tighter hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-xl hover:shadow-blue-500/20"
            >
              Explore Full Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
