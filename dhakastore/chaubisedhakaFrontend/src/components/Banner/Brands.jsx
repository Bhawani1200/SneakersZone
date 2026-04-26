import { useEffect } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiltersAction } from "../../store/actions";
import { brands as mockBrands } from "../../components/Featured/mockData";

const BrandLogosStrip = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  const brands = filters?.brands?.length > 0 ? filters.brands : mockBrands;
  const duplicatedBrands = [...brands, ...brands, ...brands];

  useEffect(() => {
    dispatch(fetchFiltersAction());
  }, [dispatch]);

  const getBrandColor = (brand) => {
    const brandColors = {
      nike: "text-zinc-900 dark:text-zinc-100",
      adidas: "text-[#0072C6] dark:text-[#3399ff]",
      puma: "text-[#E11C24] dark:text-[#ff4d4d]",
      reebok: "text-[#E31837] dark:text-[#ff3333]",
      "new balance": "text-[#E21837] dark:text-[#ff3333]",
      vans: "text-[#C11B17] dark:text-[#ff3333]",
      converse: "text-zinc-900 dark:text-zinc-100",
      "under armour": "text-zinc-900 dark:text-zinc-100",
      asics: "text-[#001E62] dark:text-[#3366ff]",
      timberland: "text-[#ED8B00] dark:text-[#ffa31a]",
      zara: "text-zinc-900 dark:text-zinc-100",
      gucci: "text-[#006400] dark:text-[#00b300]",
      clarks: "text-[#000000] dark:text-zinc-100",
    };
    return brandColors[brand.toLowerCase()] || "text-zinc-800 dark:text-zinc-200";
  };

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-950 overflow-hidden border-y border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col items-center justify-center mb-12 gap-3">
        <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">
          Premium Partners
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 uppercase italic tracking-tighter">
          Shop From <span className="text-blue-600">Top Brands</span>
        </h2>
        <div className="w-24 h-1 bg-blue-600/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-full bg-blue-600 rounded-full" />
        </div>
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
              duration: Math.max(20, brands.length * 2),
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
              <span
                className={`text-2xl md:text-3xl font-black ${getBrandColor(brand)} hover:scale-110 transition-transform duration-300 cursor-pointer uppercase tracking-tighter block`}
              >
                {brand}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default BrandLogosStrip;
