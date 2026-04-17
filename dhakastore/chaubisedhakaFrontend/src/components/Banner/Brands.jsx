import { useEffect } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiltersAction } from "../../store/actions";
import { brands as mockBrands } from "../../components/Featured/mockData";

const BrandLogosStrip = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  // Use brands from store, fallback to mock brands if empty
  const brands = filters?.brands?.length > 0 ? filters.brands : mockBrands;
  const duplicatedBrands = [...brands, ...brands, ...brands];

  useEffect(() => {
    dispatch(fetchFiltersAction());
  }, [dispatch]);

  return (
    <section className="py-12 bg-white dark:bg-zinc-950 overflow-hidden border-y border-zinc-200 dark:border-zinc-800">
      <div className="mb-6">
        <h3 className="text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Shop From Top Brands
        </h3>
      </div>

      <div className="relative">
        <motion.div
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: Math.max(20, brands.length * 2), // Dynamic duration, min 20s
              ease: "linear",
            },
          }}
          className="flex gap-16 items-center"
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex-shrink-0 w-32 h-16 flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default BrandLogosStrip;
