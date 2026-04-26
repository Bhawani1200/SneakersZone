import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Facebook,
  Instagram,
  Globe,
  MapPin,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import UserMenu from "../UserMenu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const user = useSelector((state) => state.auth?.user);
  const { cart } = useSelector((state) => state.carts);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const cartCount =
    cart?.reduce((acc, cur) => acc + Number(cur?.quantity), 0) || 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { label: "Men", path: "/products?gender=MEN" },
    { label: "Women", path: "/products?gender=WOMEN" },
    { label: "Kids", path: "/products?gender=KIDS" },
    { label: "Unisex", path: "/products?gender=UNISEX" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Sale", path: "/category/sale", highlight: true },
    { label: "Brands", path: "/category/brands" },
    { label: "Contact Us", path: "/contact", isButton: true },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -200 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-zinc-950"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 text-white py-3 text-sm hidden md:block">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center font-bold">
          <div className="flex items-center gap-10">
            <a
              href="tel:+9779800000000"
              className="flex items-center gap-3 hover:text-blue-400 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5 text-blue-500" />
              <span>+977 9800000000</span>
            </a>
            <a
              href="mailto:info@chaubisedhaka.com"
              className="flex items-center gap-3 hover:text-blue-400 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5 text-blue-500" />
              <span>info@chaubisedhaka.com</span>
            </a>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-8 pr-8 border-r border-zinc-700">
              <Link
                to="/"
                className="hover:scale-125 transition-all text-[#1877F2] hover:text-[#1877F2]/80"
                title="Facebook"
              >
                <Facebook className="w-6 h-6 fill-current" />
              </Link>
              <Link
                to="/"
                className="hover:scale-125 transition-all text-[#E4405F] hover:text-[#E4405F]/80"
                title="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link
                to="/"
                className="hover:scale-125 transition-all text-white hover:text-zinc-300"
                title="TikTok"
              >
                <FaTiktok className="w-6 h-6" />
              </Link>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span className="tracking-widest capitalize">
                Dharan-9 AcharyaLine,Nepal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Bar */}
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-5">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter uppercase">
                CHAUBISE<span className="text-blue-600">DHAKA</span>
              </h1>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8 lg:mx-16">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for your favorite products..."
                  className="w-full px-5 py-3 pl-12 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <button
                onClick={toggleDarkMode}
                className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all hover:scale-110"
              >
                {darkMode ? (
                  <Sun className="w-6 h-6 text-yellow-500" />
                ) : (
                  <Moon className="w-6 h-6 text-blue-600" />
                )}
              </button>

              <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />

              {/* User Menu / Login */}
              {user && user.id ? (
                <div className="flex items-center justify-center">
                  <UserMenu />
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex flex-col items-center hover:text-blue-600 transition-all hover:scale-105"
                >
                  <User className="w-7 h-7" />
                  <span className="hidden sm:block text-xs font-bold mt-1 uppercase">
                    Login
                  </span>
                </Link>
              )}

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative flex flex-col items-center hover:text-blue-600 transition-all hover:scale-105"
              >
                <Heart className="w-7 h-7" />
                <span className="hidden sm:block text-xs font-bold mt-1 uppercase">
                  Wishlist
                </span>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-lg">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex flex-col items-center hover:text-blue-600 transition-all hover:scale-105"
              >
                <ShoppingCart className="w-7 h-7" />
                <span className="hidden sm:block text-xs font-bold mt-1 uppercase">
                  Cart
                </span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 pl-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Desktop) */}
      <nav className="hidden lg:block border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
          <ul className="flex items-center justify-center gap-12 py-5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={
                    link.isButton
                      ? "px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-600/20 font-black tracking-widest uppercase text-sm"
                      : `text-lg font-bold uppercase tracking-widest hover:text-blue-600 dark:hover:text-blue-400 transition-all relative group ${
                          link.highlight ? "text-red-500" : ""
                        }`
                  }
                >
                  {link.label}
                  {!link.isButton && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl"
          >
            <nav className="w-full max-w-[1920px] mx-auto px-4 py-8">
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={
                        link.isButton
                          ? "inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                          : `block text-2xl font-black uppercase tracking-wider hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                              link.highlight ? "text-red-500" : ""
                            }`
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
