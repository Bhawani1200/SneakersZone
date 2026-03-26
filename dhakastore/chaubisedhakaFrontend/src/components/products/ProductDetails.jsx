import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { LAUNCHES } from "../../constants/index";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("41");

  useEffect(() => {
    const foundProduct = LAUNCHES.find((p) => String(p.id) === String(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImageIdx(0);
      setSelectedSize("41");
    } else {
      setProduct(null);
    }
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart(
        {
          ...product,
          productId: product.id,
        },
        1,
        toast,
      ),
    );
    navigate("/checkout");
  };

  const galleryImages = useMemo(() => {
    const base = product?.image ? [product.image] : [];
    const extra = Array.isArray(product?.images) ? product.images : [];
    const merged = [...base, ...extra].filter(Boolean);
    // Ensure at least a few thumbnails even if we only have one image
    if (merged.length === 1) {
      return [merged[0], merged[0], merged[0], merged[0], merged[0], merged[0]];
    }
    return merged;
  }, [product]);

  const mainImage =
    galleryImages[
      Math.min(activeImageIdx, Math.max(0, galleryImages.length - 1))
    ];

  const sizes = useMemo(
    () => ["40.5", "41", "42", "43", "43.5", "44", "44.5", "45", "46"],
    [],
  );

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8">
      {!product ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Product Not Found
            </h2>
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Left: Gallery */}
            <div className="w-full">
              <div className="flex flex-row gap-4">
                {/* Vertical thumbnails */}
                <div className="flex flex-col gap-3 w-20 sm:w-24 shrink-0">
                  {galleryImages.slice(0, 4).map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={[
                        "w-full aspect-[64/85] rounded-lg overflow-hidden border bg-white",
                        idx === activeImageIdx
                          ? "border-gray-900"
                          : "border-gray-200 hover:border-gray-400",
                      ].join(" ")}
                      aria-label={`Select image ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="flex-1 bg-[#f3f3ef] rounded-3xl overflow-hidden">
                  <div className="w-full aspect-[548/712]">
                    <img
                      src={mainImage}
                      alt={product.productName}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Extra thumbnails when more than 4 images (for small screens) */}
              <div className="mt-4 flex items-center gap-3 lg:hidden">
                {galleryImages.slice(0, 4).map((src, idx) => (
                  <button
                    key={`${src}-${idx}`}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={[
                      "w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border bg-white",
                      idx === activeImageIdx
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400",
                    ].join(" ")}
                    aria-label={`Select image ${idx + 1}`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </button>
                ))}

                {galleryImages.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setActiveImageIdx(4)}
                    className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-900 hover:border-gray-400"
                  >
                    +{galleryImages.length - 4} more
                  </button>
                )}
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-full">
              <div className="text-sm sm:text-base font-semibold text-gray-500 mb-3">
                {product.brand || "Reebok"}
              </div>

              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                {product.productName}
              </h1>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="currentColor"
                      className={
                        i < Math.round(product.rating || 4)
                          ? "text-amber-500"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-base text-gray-500">
                  {product.reviewCount || 0} reviews
                </span>
              </div>

              <div className="mt-7 text-4xl font-semibold text-gray-900">
                $
                {Number(
                  product.specialPrice || product.price || 199,
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>

              {/* Color */}
              <div className="mt-8">
                <div className="text-base text-gray-500">
                  Color <span className="mx-2 text-gray-300">•</span>{" "}
                  <span className="text-gray-700 font-medium">White</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {galleryImages.slice(0, 3).map((src, idx) => (
                    <button
                      key={`color-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={[
                        "w-14 h-14 rounded-xl border bg-white overflow-hidden",
                        idx === activeImageIdx
                          ? "border-gray-900"
                          : "border-gray-200 hover:border-gray-400",
                      ].join(" ")}
                      aria-label={`Select color option ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-contain object-center"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <div className="text-base text-gray-500">
                    Size <span className="mx-2 text-gray-300">•</span>{" "}
                    <span className="text-gray-700 font-medium">EU Men</span>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-4"
                  >
                    Size guide
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-5 gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={[
                        "h-11 rounded-lg border text-sm font-semibold transition-colors",
                        selectedSize === s
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 bg-white text-gray-900 hover:border-gray-400",
                      ].join(" ")}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-9 flex items-center gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                  className="flex-1 h-14 rounded-xl bg-black text-white font-semibold flex items-center justify-center gap-3 text-base sm:text-lg hover:bg-gray-900 active:scale-[0.99] disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  {product.quantity > 0 ? "Add to cart" : "Out of stock"}
                </button>

                <button
                  type="button"
                  className="w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center hover:border-gray-400"
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} className="text-gray-700" />
                </button>
              </div>

              <div className="mt-5 text-sm text-gray-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                Free delivery on orders over $30.0
              </div>

              {/* Back link (optional) */}
              <div className="mt-10">
                <Link
                  to="/shop"
                  className="text-base text-gray-500 hover:text-gray-700 underline underline-offset-4"
                >
                  Back to shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
