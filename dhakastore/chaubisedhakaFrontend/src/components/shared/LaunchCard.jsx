import React, { useState } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LaunchCard = ({
  productId,
  id,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  rating,
  reviewCount,
  colors = [],
  brand,
  sellerName,
  inStock = true,
  sizes = [],
}) => {
  const actualId = productId || id;
  const [colorIndex, setColorIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist");
  };

  const isAvailable = inStock !== false; // && (quantity === undefined || Number(quantity) > 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(
      addToCart(
        {
          image,
          productName,
          description,
          specialPrice,
          productId: actualId,
          price,
          // quantity,
          brand,
          sellerName,
          inStock,
          colors,
          sizes,
        },
        1,
        toast,
      ),
    );
    navigate("/checkout");
  };

  const discountPct =
    discount ||
    (price && specialPrice
      ? Math.round(((price - specialPrice) / price) * 100)
      : null);

  const displayPrice = specialPrice || price;

  const prevColor = () =>
    setColorIndex((i) => (i - 1 + colors.length) % colors.length);
  const nextColor = () => setColorIndex((i) => (i + 1) % colors.length);

  const displayImage = image
    ? image.startsWith("http")
      ? image
      : `http://localhost:8080/images/${image}`
    : "/placeholder-product.png";

  return (
    <div className="h-full bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 relative">
      {/* New Badge */}
      <span className="absolute top-3 left-3 z-10 bg-green-600 text-white text-[10px] xl:text-xs font-semibold px-2 py-0.5 rounded-sm">
        New
      </span>

      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 hover:bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:scale-110"
      >
        <Heart
          className={`w-[18px] h-[18px] transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
        />
      </button>

      {/* Product Image */}
      <Link
        to={`/product/${actualId}`}
        className="relative bg-gray-50 flex items-center justify-center h-48 sm:h-60 md:h-72 xl:h-80 2xl:h-96 overflow-hidden"
      >
        <img
          src={displayImage}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = "/placeholder-product.png";
          }}
        />
      </Link>

      {/* Card Body */}
      <div className="p-4 sm:p-5 xl:p-6 flex flex-col gap-2.5 xl:gap-4 flex-1">
        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1.5 xl:gap-2">
            <FaStar className="text-yellow-400 text-sm xl:text-base" />
            <span className="text-sm xl:text-base font-semibold text-gray-700">
              {rating}
            </span>
            {reviewCount && (
              <span className="text-xs xl:text-sm text-gray-400">
                ({reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Color Swatches Row */}
        {/* {colors.length > 0 && (
          <div className="flex items-center gap-2"> */}
        {/* Prev Arrow */}
        {/* <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                prevColor();
              }}
              className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition"
              aria-label="Previous color"
            >
              <ChevronLeft size={11} />
            </button> */}

        {/* Swatches */}
        {/* <div className="flex gap-1.5 xl:gap-2">
              {colors.slice(0, 4).map((color, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setColorIndex(idx);
                  }}
                  title={color.label || color}
                  className={`w-6 h-6 xl:w-8 xl:h-8 rounded-full border-2 transition-all duration-150 ${
                    colorIndex === idx
                      ? "border-gray-700 scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex || color }}
                />
              ))}
            </div> */}

        {/* Next Arrow */}
        {/* <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                nextColor();
              }}
              className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition"
              aria-label="Next color"
            >
              <ChevronRight size={11} />
            </button>
          </div>
        )} */}

        {/* Brand */}
        {brand && (
          <p className="text-xs xl:text-sm text-gray-500 font-semibold uppercase tracking-wider mb-[-8px]">
            {brand}{" "}
            {sellerName && (
              <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">
                by {sellerName}
              </span>
            )}
          </p>
        )}

        {/* Product Name */}
        <Link
          to={`/product/${actualId}`}
          className="text-sm xl:text-base 2xl:text-lg text-green-700 font-medium leading-tight line-clamp-2 hover:underline underline-offset-4"
        >
          {productName}
        </Link>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 xl:gap-3 flex-wrap mt-auto">
          <span className="text-base xl:text-lg 2xl:text-xl font-bold text-gray-800">
            ₹{Number(displayPrice).toLocaleString("en-IN")}
          </span>
          {specialPrice && price && (
            <>
              <span className="text-sm xl:text-base text-gray-400 line-through">
                ₹{Number(price).toLocaleString("en-IN")}
              </span>
              {discountPct && (
                <span className="text-sm xl:text-base text-green-600 font-semibold">
                  {discountPct}% Off
                </span>
              )}
            </>
          )}
        </div>

        {/* Add To Cart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCartHandler();
          }}
          disabled={!isAvailable}
          className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 xl:py-4 rounded-lg text-sm xl:text-base 2xl:text-lg font-semibold transition-colors duration-200 ${
            isAvailable
              ? "bg-gray-900 text-white hover:bg-gray-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FaShoppingCart className="text-base xl:text-lg 2xl:text-xl" />
          {isAvailable ? "Add to Cart" : "Stock Out"}
        </button>
      </div>
    </div>
  );
};

export default LaunchCard;
