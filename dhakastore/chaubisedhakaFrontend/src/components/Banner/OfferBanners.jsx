import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import offer2 from "../../assets/images/products/offer2.jpg";
import offer3 from "../../assets/images/products/offer3.jpg";

const OfferBanners = () => {
  return (
    <section className="py-8 bg-white dark:bg-zinc-950">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Banner */}
          <div className="relative rounded-2xl overflow-hidden h-80 group">
            <div className="absolute inset-0 bg-gray-200 overflow-hidden">
              <img
                src={offer2}
                alt="Formal Shoes"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="self-start bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-sm">
                20% OFF
              </div>

              <div>
                <h3 className="text-white text-3xl font-bold mb-4 max-w-xs leading-tight">
                  Explore All <br /> Formal Shoes
                </h3>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Banner */}
          <div className="relative rounded-2xl overflow-hidden h-80 group">
            <div className="absolute inset-0 bg-gray-200 overflow-hidden">
              <img
                src={offer3}
                alt="Running Shoes"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="self-start bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-sm">
                25% OFF
              </div>

              <div>
                <h3 className="text-white text-3xl font-bold mb-4 max-w-xs leading-tight">
                  Grab The Latest <br /> Running Shoes
                </h3>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferBanners;
