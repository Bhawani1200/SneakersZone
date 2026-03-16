import React from "react";
import { Store, ChevronRight } from "lucide-react";
import { store } from "../../assets/images";

const Shop = () => {
  return (
    <section className="w-full bg-white py-8 md:py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-stretch">
          {/* Left Column: Image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto h-[350px] md:h-[450px] lg:h-[500px]">
            <img
              src={store}
              alt="Premium Shoe Store Interior"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Store Info Card */}
          <div className="bg-[#f2f4f1] rounded-3xl p-6 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-800 mb-6 md:mb-8">
              <Store size={36} strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-5 tracking-tight">
              Your Comfort Zone is Nearby
            </h2>

            <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto mb-8 md:mb-10 leading-relaxed">
              All your favorite styles are ready at a Chaubise Dhaka store
              nearby. Experience the quality in person.
            </p>

            <button className="group flex items-center gap-3 px-8 py-4 bg-[#2b2b2b] text-white rounded-full font-bold text-base md:text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
              <span>Find Nearest Store</span>
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
