import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import UserMenu from "../UserMenu";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const user = useSelector((state) => state.auth?.user);
  const { cart } = useSelector((state) => state.carts);
  const cartCount =
    cart?.reduce((acc, cur) => acc + Number(cur?.quantity), 0) || 0;

  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -200 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur-lg bg-white/90 dark:bg-black/90 shadow-lg"
          : "bg-white dark:bg-black"
      }`}
    >
      {/* Top Bar */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between py-2 text-base">
            <div className="flex items-center gap-6 lg:gap-10">
              <div className="flex items-center gap-2">
                <Phone className="w-6 h-6" />
                <span>+977-9876543210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-6 h-6" />
                <span>info@chaubisedhaka.com</span>
              </div>
            </div>

            <div className="flex items-center gap-6 lg:gap-8">
              <div className="flex items-center gap-6">
                <button className="hover:text-blue-600 transition-colors">
                  <Facebook className="w-6 h-6" />
                </button>
                <button className="hover:text-blue-600 transition-colors">
                  <Instagram className="w-6 h-6" />
                </button>
                <button className="hover:text-blue-600 transition-colors">
                  <Twitter className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-700 pl-6">
                <Globe className="w-6 h-6" />
                <select className="bg-transparent outline-none cursor-pointer">
                  <option>USD</option>
                  <option>NPR</option>
                  <option>EUR</option>
                </select>
              </div>

              <button
                onClick={toggleDarkMode}
                className="hover:text-blue-600 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Bar */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between py-4 gap-4 md:gap-8 lg:gap-12 xl:gap-20">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight shrink-0 order-1"
            >
              CHAUBISE<span className="text-blue-600">DHAKA</span>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-5 sm:gap-6 lg:gap-10 shrink-0 order-2 md:order-3">
              {user && user.id ? (
                <div className="flex items-center justify-center">
                  <UserMenu />
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex flex-col items-center hover:text-blue-600 transition-colors"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden sm:block text-xs mt-1">Login</span>
                </Link>
              )}

              <Link
                to="/wishlist"
                className="relative flex flex-col items-center hover:text-blue-600 transition-colors"
              >
                <Heart className="w-6 h-6" />
                <span className="hidden sm:block text-xs mt-1">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative flex flex-col items-center hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="hidden sm:block text-xs mt-1">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-auto flex-1 max-w-none md:max-w-2xl lg:max-w-4xl mx-0 md:mx-6 lg:mx-16 xl:mx-24 order-3 md:order-2 mt-3 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for shoes, brands..."
                  className="w-full px-4 py-3 pr-12 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Navigation */}
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-16 py-5">
            <Link
              to="/category/men"
              className="text-lg uppercase tracking-wider font-bold hover:text-blue-600 transition-colors"
            >
              Men
            </Link>
            <Link
              to="/category/women"
              className="text-lg uppercase tracking-wider font-bold hover:text-blue-600 transition-colors"
            >
              Women
            </Link>
            <Link
              to="/category/kids"
              className="text-lg uppercase tracking-wider font-bold hover:text-blue-600 transition-colors"
            >
              Kids
            </Link>
            <Link
              to="/category/unisex"
              className="text-lg uppercase tracking-wider font-bold hover:text-blue-600 transition-colors"
            >
              Unisex
            </Link>
            <Link
              to="/category/new-arrivals"
              className="text-lg uppercase tracking-wider font-bold hover:text-blue-600 transition-colors text-blue-600"
            >
              New Arrivals
            </Link>
            <Link
              to="/category/sale"
              className="text-lg uppercase tracking-wider font-bold hover:text-red-600 transition-colors text-red-600"
            >
              Sale
            </Link>
            <Link
              to="/category/brands"
              className="text-lg uppercase tracking-wider font-bold hover:text-blue-600 transition-colors"
            >
              Brands
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;
