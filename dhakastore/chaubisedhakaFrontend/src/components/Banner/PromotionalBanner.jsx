import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PromotionalBanners() {
  const navigate = useNavigate();

  const banners = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
      category: "Elite Performance",
      discount: "UP TO 50% OFF",
      text: "Men's Sneaker Collection",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
      category: "Style & Comfort",
      discount: "UP TO 40% OFF",
      text: "Women's Streetwear",
    },
  ];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => navigate("/category/sale")}
              className="relative h-[250px] md:h-[350px] lg:h-[450px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl"
            >
              {/* Background Image with Parallax Effect */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.image})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                >
                  <p className="text-blue-400 font-bold mb-3 uppercase tracking-[0.2em] text-sm md:text-base">
                    {banner.category}
                  </p>
                  <h3 className="text-white text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter leading-tight">
                    {banner.text}
                  </h3>
                  <p className="text-red-500 text-2xl md:text-3xl lg:text-4xl font-black mb-8 italic">
                    {banner.discount}
                  </p>
                  <button className="flex items-center gap-3 bg-white text-black font-black px-8 py-4 rounded-xl text-lg hover:bg-blue-600 hover:text-white transition-all shadow-lg group-hover:gap-5">
                    Shop Now
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
