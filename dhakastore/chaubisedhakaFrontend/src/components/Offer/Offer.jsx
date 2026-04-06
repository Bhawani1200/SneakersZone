import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { mockProducts } from "../../components/Featured/mockData";
import ProductCard from "../shared/ProductCard";

const DealsOfTheDay = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const dealsProducts = mockProducts.filter((p) => p.discount);

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Flame className="w-10 h-10 text-red-600 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Deals of the Day
            </h2>
            <Flame className="w-10 h-10 text-red-600 animate-pulse" />
          </div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Hurry! Limited time offers — Don't miss out on these exclusive
            deals.
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-4">
            <div className="bg-white dark:bg-zinc-800 rounded-xl px-8 py-5 shadow-xl border border-red-100 dark:border-red-900/30">
              <div className="text-4xl font-extrabold text-red-600">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase mt-1">
                Hours
              </div>
            </div>
            <div className="text-3xl font-bold">:</div>
            <div className="bg-white dark:bg-zinc-800 rounded-xl px-8 py-5 shadow-xl border border-red-100 dark:border-red-900/30">
              <div className="text-4xl font-extrabold text-red-600">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase mt-1">
                Minutes
              </div>
            </div>
            <div className="text-3xl font-bold">:</div>
            <div className="bg-white dark:bg-zinc-800 rounded-xl px-8 py-5 shadow-xl border border-red-100 dark:border-red-900/30">
              <div className="text-4xl font-extrabold text-red-600">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase mt-1">
                Seconds
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-zinc-800 shadow-lg rounded-full items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-zinc-800 shadow-lg rounded-full items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Products */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {dealsProducts.map((product, index) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;
