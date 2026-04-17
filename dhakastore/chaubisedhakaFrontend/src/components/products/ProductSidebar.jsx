import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import Image from "../designLayouts/Image";
import { LAUNCHES } from "../../constants/index";
import {
  fetchCategories,
  fetchProductsByFilter,
  fetchFiltersAction,
} from "../../store/actions";
import api from "../../api/api";

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
  const { categories, products, loading, error, filters } = useSelector(
    (state) => state.products,
  );

  const [allProducts, setAllProducts] = useState([]);

  // Fetch categories and filters on mount
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
    dispatch(fetchFiltersAction());
  }, [dispatch, categories]);

  // Fetch all products for filter extraction
  useEffect(() => {
    const fetchAllProductsForFilters = async () => {
      try {
        const response = await api.get("/usuer/public/products", {
          params: {
            pageNumber: 0,
            pageSize: 100,
            sortBy: "productId",
            sortOrder: "desc",
            minPrice: 0,
            maxPrice: 999999,
          },
        });

        // Check different possible response structures
        const productData =
          response.data.content ||
          response.data.products ||
          response.data.data ||
          [];

        setAllProducts(Array.isArray(productData) ? productData : []);
      } catch (err) {
        console.error("Sidebar: failed to fetch products for filters", err);
        // Fallback to Redux products if available
        if (products && products.length > 0) {
          setAllProducts(products);
        }
      }
    };

    fetchAllProductsForFilters();
  }, []);

  // Extract unique values from products
  useEffect(() => {
    if (!allProducts.length) return;

    // Extract sizes - check different possible field names
    const sizes = new Set();
    const colors = new Set();
    const brands = new Set();

    allProducts.forEach((product) => {
      // Handle sizes - could be array or single value
      if (product.sizes && Array.isArray(product.sizes)) {
        product.sizes.forEach((size) => sizes.add(size));
      } else if (product.size) {
        sizes.add(product.size);
      } else if (product.availableSizes) {
        if (Array.isArray(product.availableSizes)) {
          product.availableSizes.forEach((size) => sizes.add(size));
        } else {
          sizes.add(product.availableSizes);
        }
      }

      // Handle colors
      if (product.colors && Array.isArray(product.colors)) {
        product.colors.forEach((color) => colors.add(color));
      } else if (product.color) {
        colors.add(product.color);
      } else if (product.availableColors) {
        if (Array.isArray(product.availableColors)) {
          product.availableColors.forEach((color) => colors.add(color));
        } else {
          colors.add(product.availableColors);
        }
      }

      // Handle brands
      if (product.brand) {
        brands.add(product.brand);
      } else if (product.brandName) {
        brands.add(product.brandName);
      }
    });

    setAvailableSizes(Array.from(sizes).sort());
    setAvailableColors(Array.from(colors).sort());
    setAvailableBrands(Array.from(brands).sort());
  }, [allProducts]);

  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams);

    // Handle multiple values for same filter (checkbox behavior)
    const currentValues = params.getAll(type);

    if (currentValues.includes(value)) {
      // Remove the value
      params.delete(type);
      currentValues
        .filter((v) => v !== value)
        .forEach((v) => params.append(type, v));
    } else {
      // Add the value
      params.append(type, value);
    }

    // Reset to page 0 when filters change
    params.set("page", "1");

    navigate(`${location.pathname}?${params.toString()}`);
  };

  const isChecked = (type, value) => {
    return searchParams.getAll(type).includes(value);
  };

  const PRICE_MIN = 2000;
  const PRICE_MAX = 10000;

  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || PRICE_MAX,
  );

  useEffect(() => {
    const urlMax = searchParams.get("maxPrice");
    if (urlMax !== null) setMaxPrice(Number(urlMax));
  }, [searchParams]);


  const productsList =
    allProducts.length > 0
      ? allProducts
      : products && products.length > 0
        ? products
        : LAUNCHES;

  // Get available categories (using actual categories from API)
  const categoriesToDisplay = categories || [];

  // Use filters from Redux with fallbacks
  const sizesToDisplay =
    filters?.sizes?.length > 0
      ? filters.sizes
      : ["S", "M", "L", "XL", "XXL"];
  const colorsToDisplay =
    filters?.colors?.length > 0
      ? filters.colors
      : ["Red", "Blue", "Green", "Yellow", "Black", "White"];
  const brandsToDisplay = filters?.brands || [];

  const getDiscountCount = (minDiscount) => {
    return productsList.filter((p) => {
      const pct =
        p.discount ||
        (p.price && p.specialPrice
          ? Math.round(((p.price - p.specialPrice) / p.price) * 100)
          : 0);
      return pct >= minDiscount;
    }).length;
  };

  const discountBuckets = [
    { label: "10% and above", value: 10 },
    { label: "20% and above", value: 20 },
    { label: "30% and above", value: 30 },
    { label: "40% and above", value: 40 },
    { label: "50% and above", value: 50 },
  ];

  const handlePriceChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("minPrice", PRICE_MIN);
    params.set("maxPrice", value);
    params.set("pageNumber", "0");
    navigate(`${location.pathname}?${params.toString()}`);
  };

  // Display products (use filtered products from Redux or all products)
  const displayProducts =
    products && products.length > 0 ? products : productsList.slice(0, 4);

  if (loading) {
    return (
      <div className="mt-28 max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-28 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-red-600">
          <p>Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-28 max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 py-10">
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
            {categoriesToDisplay.length > 0 ? (
              categoriesToDisplay.map((cat) => (
                <label
                  key={cat.categoryId || cat.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={isChecked(
                      "category",
                      cat.categoryName || cat.name,
                    )}
                    onChange={() =>
                      handleFilterChange(
                        "category",
                        cat.categoryName || cat.name,
                      )
                    }
                    className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-lg text-gray-700 group-hover:text-black font-medium transition-colors">
                    {cat.categoryName || cat.name}
                  </span>
                </label>
              ))
            ) : (
              <p className="text-gray-500">No categories available</p>
            )}
          </div>
        </FilterSection>

        {/* Brand Filter */}
        {brandsToDisplay.length > 0 && (
          <FilterSection title="Brand" defaultOpen={true}>
            <div className="space-y-3">
              {brandsToDisplay.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={isChecked("brand", brand)}
                    onChange={() => handleFilterChange("brand", brand)}
                    className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-lg text-gray-700 group-hover:text-black font-medium transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>
        )}

        <FilterSection title="Size">
          <div className="grid grid-cols-4 gap-2">
            {sizesToDisplay.map((size) => {
              const strSize = String(size);
              const isSelected = isChecked("size", strSize);
              return (
                <button
                  key={strSize}
                  onClick={() => handleFilterChange("size", strSize)}
                  className={`border py-2 text-xs font-medium rounded transition-colors ${
                    isSelected
                      ? "bg-black text-white border-black shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-black"
                  }`}
                >
                  {strSize}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Color">
          <div className="flex flex-wrap gap-2">
            {colorsToDisplay.map((color) => {
              const colorStr = String(color);
              const colorValue = colorStr.toLowerCase();
              const isSelected = isChecked("color", colorValue);
              return (
                <button
                  key={colorStr}
                  onClick={() => handleFilterChange("color", colorValue)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${
                    isSelected
                      ? "bg-black text-white border-black shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-black active:scale-95"
                  }`}
                >
                  {colorStr}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Price" defaultOpen={true}>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>₹{PRICE_MIN.toLocaleString("en-IN")}</span>
              <span className="font-semibold text-gray-900">
                up to ₹{maxPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              onMouseUp={() => handlePriceChange(maxPrice)}
              onTouchEnd={() => handlePriceChange(maxPrice)}
              className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black"
            />

            <div className="flex justify-between text-xs text-gray-400">
              <span>₹2,000</span>
              <span>₹10,000</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Discounts" defaultOpen={true}>
          <div className="space-y-5">
            {discountBuckets.map((d) => (
              <label
                key={d.value}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked("discount", String(d.value))}
                    onChange={() =>
                      handleFilterChange("discount", String(d.value))
                    }
                    className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                  <span className="text-base text-gray-700 font-medium group-hover:text-black transition-colors">
                    {d.label}
                  </span>
                </div>
                <span className="text-sm text-gray-400 font-medium">
                  ({getDiscountCount(d.value)})
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
                  checked={isChecked("availability", "in-stock")}
                  onChange={() =>
                    handleFilterChange("availability", "in-stock")
                  }
                  className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                />
                <span className="text-base text-gray-700 font-medium group-hover:text-black transition-colors">
                  In stock only
                </span>
              </div>
              <span className="text-sm text-gray-400 font-medium">
                ({productsList.filter((p) => p.quantity > 0).length})
              </span>
            </label>
          </div>
        </FilterSection>
      </div>

      {/* Product Image Grid */}
      <div className="flex-1">
        {displayProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <Link
                to={`/product/${product.id || product.productId}`}
                key={product.id || product.productId || Math.random()}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 block"
              >
                <Image
                  imgSrc={
                    product.image || product.productImage || product.mainImage
                  }
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  fallbackSrc="/placeholder-image.jpg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 font-bold tracking-widest uppercase py-2 px-4 border border-white rounded-sm transition-opacity">
                    View Details
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSidebar;
