import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Flame, Loader2 } from "lucide-react";
import LaunchCard from "../shared/LaunchCard";
import api from "../../api/api";

const DealsOfTheDay = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOfferProducts = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(
          "/user/public/products?pageNumber=0&pageSize=100&sortBy=productId&sortOrder=desc&minPrice=0&maxPrice=999999",
        );

        const formattedProducts = (data.content || [])
          .filter((product) => product.sections && product.sections.includes("offer"))
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
        console.error("Failed to fetch offer products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOfferProducts();
  }, []);

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
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const dealsProducts = products;

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-zinc-950 dark:to-zinc-900 overflow-hidden">
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

        <div className="relative group">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white dark:bg-zinc-800 shadow-2xl rounded-full items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all hover:scale-110 border border-zinc-200 dark:border-zinc-700 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white dark:bg-zinc-800 shadow-2xl rounded-full items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all hover:scale-110 border border-zinc-200 dark:border-zinc-700 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Scrollable Products */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 min-h-[300px]">
              <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
              <p className="text-zinc-500 font-bold animate-pulse">
                Fetching Daily Deals...
              </p>
            </div>
          ) : dealsProducts.length > 0 ? (
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide scroll-smooth pb-8 -mx-2 sm:-mx-3"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {dealsProducts.map((product) => (
                <div
                  key={product.productId}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-2 sm:px-3 pt-6"
                >
                  <LaunchCard {...product} tag="Limited Deal" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900/50 rounded-3xl border border-dashed border-red-200 dark:border-red-900">
              <Flame className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-4" />
              <p className="text-zinc-500 font-bold text-xl">
                No active deals at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;
