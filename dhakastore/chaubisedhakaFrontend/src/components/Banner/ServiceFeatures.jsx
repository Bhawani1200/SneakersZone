import React from "react";
import { Recycle, ShieldCheck, Truck, Leaf } from "lucide-react";

const ServiceFeatures = () => {
  const features = [
    {
      icon: (
        <Recycle className="w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6 text-blue-600 dark:text-blue-500" />
      ),
      title: "Sustainable Materials",
      description:
        "We believe great style shouldn't come at the planet's expense.",
    },
    {
      icon: (
        <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6 text-blue-600 dark:text-blue-500" />
      ),
      title: "Warranty Included",
      description: "Every pair comes with a hassle-free 6-month warranty.",
    },
    {
      icon: (
        <Truck className="w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6 text-blue-600 dark:text-blue-500" />
      ),
      title: "Delivery & Shipping",
      description: "Your shoes will be dispatched within 1-2 business days.",
    },
    {
      icon: (
        <Leaf className="w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6 text-blue-600 dark:text-blue-500" />
      ),
      title: "Eco-Friendly Fabrics",
      description:
        "Crafted with sustainability in mind, our shoes feature eco-friendly fabrics.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-zinc-950 border-t border-b border-gray-100 dark:border-zinc-900">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 sm:p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors duration-300"
            >
              {feature.icon}
              <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-base md:text-lg text-rose-400 dark:text-gray-400 leading-relaxed font-large">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
