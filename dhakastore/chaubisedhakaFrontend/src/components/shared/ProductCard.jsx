import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import ProductViewModal from "./ProductViewModal";
import trauncateText from "../../utils/trauncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  brand,
  sellerName,
  inStock = true,
}) => {
  const isAvailable = inStock !== false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductView = () => {
    navigate(`/product/${productId}`);
  };

  const addToCartHandler = (cartItems) => {
    dispatch(addToCart(cartItems, 1, toast));
    navigate("/checkout");
  };

  return (
    <div className="group flex flex-col bg-stone-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-transparent hover:border-stone-200">
      {/* Image Container */}
      <div
        onClick={() =>
          handleProductView({
            productId,
            productName,
            image,
            description,
            quantity,
            price,
            discount,
            specialPrice,
          })
        }
        className="relative aspect-square overflow-hidden cursor-pointer"
      >
        <img
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={image}
          alt={productName}
        />
        {/* Tag / Badge */}
        {tag && (
          <div className="absolute top-4 left-4 bg-blue-50/80 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider z-10">
            {tag}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 bg-white rounded-t-[32px] -mt-8 relative z-10 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
            <span className="text-amber-500">★</span>
            <span className="text-[11px] font-bold text-amber-900">4.75</span>
          </div>
          <span className="text-[11px] text-gray-400 font-medium">(152)</span>
        </div>

        <h3
          onClick={() =>
            handleProductView({
              productId,
              productName,
              image,
              description,
              quantity,
              price,
              discount,
              specialPrice,
            })
          }
          className="text-base font-bold text-gray-900 mb-1 cursor-pointer hover:text-blue-600 transition-colors line-clamp-1"
        >
          {productName}
        </h3>

        <p className="text-xs text-gray-500 mb-4 line-clamp-1 font-medium italic">
          {description?.slice(0, 30)}...
        </p>

        {/* Price and Cart */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-gray-900">
              रु{Number(specialPrice || price).toLocaleString()}
            </span>
            {specialPrice && (
              <span className="text-xs text-gray-400 line-through font-medium">
                रु{Number(price).toLocaleString()}
              </span>
            )}
            {discount > 0 && (
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight">
                {discount}% OFF
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCartHandler({
                image,
                productName,
                description,
                specialPrice,
                productId,
                price,
                // quantity,
              });
            }}
            disabled={!isAvailable}
            className={`flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:bg-black hover:text-white hover:border-black disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <FiShoppingCart className="scale-110" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
