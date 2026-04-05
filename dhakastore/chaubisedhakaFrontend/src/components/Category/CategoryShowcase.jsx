import React, { useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/actions";

const GENDER_METADATA = [
  {
    key: "MEN",
    type: "gender",
    label: "MEN",
    description: "Explore performance-ready styles for him.",
    bg: "from-slate-900 via-slate-800 to-slate-700",
    image: "https://images.pexels.com/photos/4313491/pexels-photo-4313491.jpeg",
  },
  {
    key: "WOMEN",
    type: "gender",
    label: "WOMEN",
    description: "Discover bold and versatile looks for her.",
    bg: "from-indigo-800 via-indigo-600 to-purple-500",
    image: "https://images.pexels.com/photos/3214308/pexels-photo-3214308.jpeg",
  },
  {
    key: "KIDS",
    type: "gender",
    label: "KIDS",
    description: "Fun, colorful comfort for little feet.",
    bg: "from-amber-400 via-yellow-300 to-orange-400",
    image:
      "https://images.pexels.com/photos/29283077/pexels-photo-29283077.jpeg",
  },
  {
    key: "UNISEX",
    type: "gender",
    label: "UNISEX",
    description: "Clean silhouettes for every wardrobe.",
    bg: "from-emerald-700 via-emerald-600 to-teal-500",
    image: "https://images.pexels.com/photos/6213961/pexels-photo-6213961.jpeg",
  },
];

const CATEGORY_MAP = {
  SNEAKERS: {
    label: "SNEAKERS",
    description: "Trendy sneakers for your daily adventures.",
    bg: "from-neutral-800 via-neutral-700 to-neutral-600",
    image: "https://images.pexels.com/photos/7500608/pexels-photo-7500608.jpeg",
  },
  CLOTHING: {
    label: "CLOTHING",
    description: "Premium apparel for every occasion.",
    bg: "from-blue-800 via-blue-700 to-blue-600",
    image: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg",
  },
  ACCESSORIES: {
    label: "ACCESSORIES",
    description: "Complement your look with our curated extras.",
    bg: "from-stone-700 via-stone-600 to-stone-500",
    image: "https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg",
  },
};

const DEFAULT_CATEGORY_METADATA = {
  description: "Explore our latest collections and specialized fits.",
  bg: "from-gray-800 via-gray-700 to-gray-600",
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
        label: metadata.label || cat.categoryName.toUpperCase(),
        description: metadata.description,
        bg: metadata.bg,
        image: metadata.image,
      };
    }),
  ];

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    const firstCard = container.querySelector("[data-category-card]");
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = parseInt(window.getComputedStyle(container).gap) || 24;
      const scrollAmount = cardWidth + gap;
      container.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-12 xl:px-16">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-gray-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl">
              Find your perfect fit across our specialized collections.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Scroll arrows — show when more than 4 cards */}
            {combinedCategories.length > 4 && (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => scroll(-1)}
                  aria-label="Previous categories"
                  className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-500 transition shadow-sm"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll(1)}
                  aria-label="Next categories"
                  className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-500 transition shadow-sm"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-sm sm:text-base font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View All
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>

        {/* Category Cards */}
        <div className="relative group/carousel">
          {/* Side Navigation Arrows */}
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous categories"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl hover:bg-white/20 transition-all opacity-0 group-hover/carousel:opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 hidden sm:flex"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll(1)}
            aria-label="Next categories"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl hover:bg-white/20 transition-all opacity-0 group-hover/carousel:opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 hidden sm:flex"
          >
            <ChevronRight size={24} />
          </button>

          {/* mobile view arrows */}
          <div className="flex sm:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-2 pointer-events-none z-10">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden pb-3 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {combinedCategories.map((category) => (
              <Link
                key={category.key}
                to={`/products?${category.type === "gender" ? "gender" : "category"}=${category.key}`}
                data-category-card
                className="group relative flex-shrink-0 min-w-full sm:min-w-[45%] md:min-w-[calc(25%-18px)] md:w-[calc(25%-18px)] snap-start"
              >
                <div
                  className={`relative h-80 sm:h-80 md:h-[22rem] lg:h-[24rem] rounded-[30px] overflow-hidden shadow-lg bg-gradient-to-br ${category.bg}`}
                >
                  <img
                    src={category.image}
                    alt={category.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 md:p-8">
                    <p className="text-[11px] tracking-[0.28em] text-white/80 uppercase mb-1">
                      {category.type === "gender" ? "GENDER" : "CATEGORY"}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-[0.16em] mb-2">
                      {category.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 max-w-xs mb-4">
                      {category.description}
                    </p>
                    <div className="inline-flex items-center text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-white/90">
                      Explore Now
                      <ChevronRight
                        size={16}
                        className="ml-1 transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
