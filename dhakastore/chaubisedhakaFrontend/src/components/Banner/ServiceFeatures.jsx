import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Truck, Award, Headphones } from "lucide-react";


const ServiceFeatures = () => {
  const features = [
    {
      icon: (
        <Truck className="w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Fast Delivery",
      description: "Quick shipping with safe doorstep delivery.",
      bgClass: "bg-blue-50/50 hover:bg-blue-100 dark:bg-blue-900/10 dark:hover:bg-blue-900/30 border-blue-100 dark:border-blue-800/50",
    },
    {
      icon: (
        <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Easy Returns",
      description: "Simple 7-day return and exchange policy.",
      bgClass: "bg-emerald-50/50 hover:bg-emerald-100 dark:bg-emerald-900/10 dark:hover:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800/50",
    },
    {
      icon: (
        <Award className="w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "Premium Quality",
      description: "Comfortable shoes made with durable materials.",
      bgClass: "bg-amber-50/50 hover:bg-amber-100 dark:bg-amber-900/10 dark:hover:bg-amber-900/30 border-amber-100 dark:border-amber-800/50",
    },
    {
      icon: (
        <Headphones className="w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "24/7 Support",
      description: "Friendly customer support whenever you need help.",
      bgClass: "bg-purple-50/50 hover:bg-purple-100 dark:bg-purple-900/10 dark:hover:bg-purple-900/30 border-purple-100 dark:border-purple-800/50",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24 bg-white dark:bg-zinc-950 border-t border-b border-gray-100 dark:border-zinc-900"
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className={`group flex flex-col items-center sm:items-start text-center sm:text-left p-6 sm:p-8 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${feature.bgClass}`}
            >
              {feature.icon}
              <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServiceFeatures;
