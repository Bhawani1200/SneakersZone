import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function PromotionalBanners() {
  const banners = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1638953173691-671b6c2692fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9lJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU0ODc1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Men's Collection",
      discount: "Up to 40% OFF",
      text: "Premium Leather Shoes",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1621996659490-3275b4d0d951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbnMlMjBmYXNoaW9uJTIwaGVlbHN8ZW58MXx8fHwxNzc1NDg3NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Women's Heels",
      discount: "Up to 35% OFF",
      text: "Step Into Elegance",
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
