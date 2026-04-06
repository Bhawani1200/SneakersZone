import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import {
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from "lucide-react";
import { addToCart, fetchProductById } from "../../store/actions";
import toast from "react-hot-toast";

const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("");

  const { product, isLoading, errorMessage } = useSelector((state) => ({
    product: state.products.productDetails,
    isLoading: state.errors.isLoading,
    errorMessage: state.errors.errorMessage,
  }));

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!product) return;
    dispatch(
      addToCart(
        {
          ...product,
          productId: product.productId || product.id,
          size: selectedSize,
        },
        1,
        toast,
      ),
    );
    navigate("/checkout");
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist");
  };

  if (!product) {
    return (
      <div className="pt-[180px] min-h-screen bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {isLoading ? "Loading..." : "Product Not Found"}
            </h2>
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Derive display values
  const currentPrice = product.specialPrice || product.price || 0;
  const originalPrice =
    product.specialPrice && product.specialPrice < product.price
      ? product.price
      : null;
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const mainImage =
    product.image || (product.images && product.images[0]) || "";

  const defaultFeatures = [
    "Premium leather upper",
    "Air-Sole unit for cushioning",
    "Padded collar for support",
    "Rubber outsole for traction",
    "Classic Wings logo",
  ];
  const features =
    product.features && product.features.length
      ? product.features
      : defaultFeatures;

  return (
    <div className="pt-[180px] min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {mainImage ? (
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
                <img
                  src={mainImage}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl" />
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-blue-600 font-medium mb-2">
              {product.brand || "Brand"}
            </p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 dark:text-white">
              {product.productName}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                ({product.reviewCount || 128} reviews)
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-black dark:text-white">
                रु
                {Number(currentPrice).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              {originalPrice && (
                <>
                  <span className="text-2xl text-gray-500 line-through">
                    रु
                    {Number(originalPrice).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-8">
              {product.description || "No description available."}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-bold mb-4 dark:text-white">Select Size</h3>
              <div className="grid grid-cols-6 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedSize === size
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                        : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:text-gray-300"
                    }`}
                  >
                    {size.replace("US ", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className="flex-1 bg-blue-600 text-white py-4 rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </span>
              </button>
              <button
                onClick={handleAddToWishlist}
                className="w-14 h-14 border-2 border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors dark:text-gray-300"
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-blue-600" />
                <span className="dark:text-gray-300">
                  Free shipping on orders over $100
                </span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-blue-600" />
                <span className="dark:text-gray-300">30-day return policy</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="dark:text-gray-300">1-year warranty</span>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
              <h3 className="font-bold mb-4 dark:text-white">
                Product Features
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
