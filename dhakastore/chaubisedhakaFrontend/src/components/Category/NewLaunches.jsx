import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import LaunchCard from "../shared/LaunchCard";
import { LAUNCHES } from "../../constants/index";

const NewLaunches = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    const firstCard = container.querySelector("[data-launch-card]");
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = parseInt(window.getComputedStyle(container).gap) || 24;
      const scrollAmount = cardWidth + gap;
      container.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#e8ebe4] py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            New Launches
          </h2>
        </div>

        {/* ── Product Carousel — responsive with side navigation ── */}
        <div className="relative group/carousel">
          {/* Side Navigation Arrows - Consistent with CategoryShowcase */}
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous launches"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/10 backdrop-blur-md border border-black/10 flex items-center justify-center text-gray-800 shadow-xl hover:bg-black/20 transition-all opacity-0 group-hover/carousel:opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 hidden sm:flex"
          >
            <ChevronLeft size={24} />
          </button>

          <button
          
            onClick={() => scroll(1)}
            aria-label="Next launches"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/10 backdrop-blur-md border border-black/10 flex items-center justify-center text-gray-800 shadow-xl hover:bg-black/20 transition-all opacity-0 group-hover/carousel:opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 hidden sm:flex"
          >
            <ChevronRight size={24} />
          </button>

          {/* mobile view arrows - always visible on very small screens */}
          <div className="flex sm:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-2 pointer-events-none z-10">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-gray-800 pointer-events-auto"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-gray-800 pointer-events-auto"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {LAUNCHES.map((product) => (
              <div
                key={product.id}
                data-launch-card
                className="flex-shrink-0 min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] lg:w-[calc(25%-18px)] snap-start"
              >
                <LaunchCard
                  productId={product.id}
                  productName={product.productName}
                  image={product.image}
                  description={product.description}
                  quantity={product.quantity}
                  price={product.price}
                  discount={product.discount}
                  specialPrice={product.specialPrice}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  colors={product.colors}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── View All ── */}
        <div className="flex justify-center mt-8 md:mt-10">
          <Link to="/shop">
            <button className="flex items-center gap-2 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full border border-gray-800 text-gray-800 text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-200">
              View All
              <ChevronRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewLaunches;
