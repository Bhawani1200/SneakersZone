import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import Image from "../designLayouts/Image";
import { LAUNCHES } from "../../constants/index";
import { fetchCategories } from "../../store/actions";

const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-gray-900 hover:text-blue-600 transition-colors"
      >
        <span className="text-xl tracking-tight uppercase">{title}</span>
        {isOpen ? (
          <FiChevronUp className="text-gray-400" />
        ) : (
          <FiChevronDown className="text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

const ProductSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { categories, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams);
    if (params.get(type) === value) {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const isChecked = (type, value) => {
    return searchParams.get(type) === value;
  };

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4499);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 py-10">
      {/* Filter Sidebar */}
      <div className="w-[320px] hidden lg:block pr-8 py-2">
        <FilterSection title="Gender" defaultOpen={true}>
          <div className="space-y-3">
            {["MEN", "WOMEN", "KIDS", "UNISEX"].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={isChecked("gender", opt)}
                  onChange={() => handleFilterChange("gender", opt)}
                  className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-lg text-gray-700 group-hover:text-black font-medium transition-colors">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Product type | Category" defaultOpen={true}>
          <div className="space-y-3">
            {categories?.map((cat) => (
              <label
                key={cat.categoryId}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={isChecked("category", cat.categoryName)}
                  onChange={() => handleFilterChange("category", cat.categoryName)}
                  className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-lg text-gray-700 group-hover:text-black font-medium transition-colors">
                  {cat.categoryName}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
        {/* <FilterSection title="Collections | Usage"></FilterSection> */}

        <FilterSection title="Size">
          <div className="grid grid-cols-4 gap-2">
            {["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"].map((size) => (
              <button
                key={size}
                className="border border-gray-200 py-2 text-xs font-medium rounded hover:border-black transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Color">
          <div className="flex flex-wrap gap-3">
            {["#000", "#fff", "#ff0000", "#0000ff", "#008000", "#ffff00"].map(
              (color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ),
            )}
          </div>
        </FilterSection>

        <FilterSection title="Price" defaultOpen={true}>
          <div className="space-y-4">
            <div className="relative h-1 bg-gray-200 rounded-full mt-6 mb-8 mx-2">
              <div
                className="absolute h-full bg-black rounded-full"
                style={{
                  left: `${(minPrice / 4499) * 100}%`,
                  right: `${100 - (maxPrice / 4499) * 100}%`,
                }}
              />
              <input
                type="range"
                min="0"
                max="4499"
                value={minPrice}
                onChange={handleMinChange}
                className="absolute inset-0 w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
              />
              <input
                type="range"
                min="0"
                max="4499"
                value={maxPrice}
                onChange={handleMaxChange}
                className="absolute inset-0 w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium whitespace-nowrap">
                  ₹
                </span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={handleMinChange}
                  className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-2xl text-base focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <span className="text-gray-400 font-medium text-sm px-1">to</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium whitespace-nowrap">
                  ₹
                </span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxChange}
                  className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-2xl text-base focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Discounts" defaultOpen={true}>
          <div className="space-y-5">
            {[
              { label: "30% and above", count: 402 },
              { label: "40% and above", count: 314 },
              { label: "50% and above", count: 206 },
              { label: "60% and above", count: 97 },
              { label: "70% and above", count: 30 },
            ].map((d) => (
              <label
                key={d.label}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                  <span className="text-base text-gray-700 font-medium group-hover:text-black transition-colors">
                    {d.label}
                  </span>
                </div>
                <span className="text-sm text-gray-400 font-medium">
                  ({d.count})
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Availability" defaultOpen={true}>
          <div className="py-2">
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                />
                <span className="text-base text-gray-700 font-medium group-hover:text-black transition-colors">
                  In stock only
                </span>
              </div>
              <span className="text-sm text-gray-400 font-medium">(542)</span>
            </label>
          </div>
        </FilterSection>
      </div>

      {/* Product Image Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(products?.length > 0 ? products : LAUNCHES).slice(0, 4).map((product) => (
            <Link
              to={`/product/${product.id || product.productId}`}
              key={product.id || product.productId}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 block"
            >
              <Image
                imgSrc={product.image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 font-bold tracking-widest uppercase py-2 px-4 border border-white rounded-sm transition-opacity">
                  View Details
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
