import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/actions";

const GENDER_METADATA = [
  {
    key: "MEN",
    type: "gender",
    label: "Men",
    description: "Explore performance-ready styles for him.",
    bg: "from-slate-900 via-slate-800 to-slate-700",
    gradient: "from-blue-600/80 to-transparent",
    image: "https://images.pexels.com/photos/4313491/pexels-photo-4313491.jpeg",
  },
  {
    key: "WOMEN",
    type: "gender",
    label: "Women",
    description: "Discover bold and versatile looks for her.",
    bg: "from-indigo-800 via-indigo-600 to-purple-500",
    gradient: "from-pink-600/80 to-transparent",
    image: "https://images.pexels.com/photos/3214308/pexels-photo-3214308.jpeg",
  },
  {
    key: "KIDS",
    type: "gender",
    label: "Kids",
    description: "Fun, colorful comfort for little feet.",
    bg: "from-amber-400 via-yellow-300 to-orange-400",
    gradient: "from-yellow-600/80 to-transparent",
    image:
      "https://images.pexels.com/photos/29283077/pexels-photo-29283077.jpeg",
  },
  {
    key: "UNISEX",
    type: "gender",
    label: "Unisex",
    description: "Clean silhouettes for every wardrobe.",
    bg: "from-emerald-700 via-emerald-600 to-teal-500",
    gradient: "from-purple-600/80 to-transparent",
    image: "https://images.pexels.com/photos/6213961/pexels-photo-6213961.jpeg",
  },
];

const CATEGORY_MAP = {
  SNEAKERS: {
    label: "Sneakers",
    description: "Trendy sneakers for your daily adventures.",
    bg: "from-neutral-800 via-neutral-700 to-neutral-600",
    gradient: "from-red-600/80 to-transparent",
    image: "https://images.pexels.com/photos/7500608/pexels-photo-7500608.jpeg",
  },
  CLOTHING: {
    label: "Clothing",
    description: "Premium apparel for every occasion.",
    bg: "from-blue-800 via-blue-700 to-blue-600",
    gradient: "from-cyan-600/80 to-transparent",
    image: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg",
  },
  ACCESSORIES: {
    label: "Accessories",
    description: "Complement your look with our curated extras.",
    bg: "from-stone-700 via-stone-600 to-stone-500",
    gradient: "from-gray-600/80 to-transparent",
    image: "https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg",
  },
};

const DEFAULT_CATEGORY_METADATA = {
  description: "Explore our latest collections and specialized fits.",
  bg: "from-gray-800 via-gray-700 to-gray-600",
  gradient: "from-green-600/80 to-transparent",
  image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
};

const CategoryShowcase = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const combinedCategories = [
    ...GENDER_METADATA,
    ...(categories || []).map((cat) => {
      const metadata =
        CATEGORY_MAP[cat.categoryName.toUpperCase()] ||
        DEFAULT_CATEGORY_METADATA;
      return {
        key: cat.categoryName,
        type: "category",
        label: metadata.label || cat.categoryName,
        description: metadata.description,
        bg: metadata.bg,
        image: metadata.image,
        gradient: metadata.gradient,
      };
    }),
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const card = scrollRef.current.firstElementChild;
      const scrollAmount = card ? card.offsetWidth + 24 : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 lg:mb-12 gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
            Shop by Category
          </h2>
        </div>

        <div className="relative group/carousel">
          {/* Side Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            aria-label="Previous categories"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/20 flex items-center justify-center text-gray-800 dark:text-gray-100 shadow-xl hover:bg-white/90 dark:hover:bg-black/80 transition-all opacity-0 group-hover/carousel:opacity-100 hidden sm:flex"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll("right")}
            aria-label="Next categories"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/20 flex items-center justify-center text-gray-800 dark:text-gray-100 shadow-xl hover:bg-white/90 dark:hover:bg-black/80 transition-all opacity-0 group-hover/carousel:opacity-100 hidden sm:flex"
          >
            <ChevronRight size={24} />
          </button>

          {/* mobile view arrows - always visible on very small screens */}
          <div className="flex sm:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-2 pointer-events-none z-10">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-gray-800 dark:text-gray-100 shadow-lg pointer-events-auto"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-gray-800 dark:text-gray-100 shadow-lg pointer-events-auto"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {combinedCategories.map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex-shrink-0 min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] lg:w-[calc(25%-18px)] h-[320px] sm:h-96 lg:h-[450px] rounded-2xl sm:rounded-[32px] overflow-hidden snap-start"
              >
                <Link
                  to={`/products?${category.type === "gender" ? "gender" : "category"}=${category.key}`}
                >
                  <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700">
                    <img
                      src={category.image}
                      alt={category.label}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.gradient}`}
                    />
                  </div>

                  <div className="relative h-full flex flex-col justify-end p-6 lg:p-8 z-10 w-full">
                    <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3">
                      {category.label}
                    </h3>
                    <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-medium text-sm sm:text-base">
                        Explore
                      </span>
                      <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }}>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 -z-10"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
