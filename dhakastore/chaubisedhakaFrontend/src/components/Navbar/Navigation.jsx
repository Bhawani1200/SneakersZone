import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { MdStorefront } from "react-icons/md";
import UserMenu from "../UserMenu";

const Navigation = () => {
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Set target date for the sale (example: 5 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  return (
    <header className="w-full flex flex-col font-bodyFont relative">
      {/* Top Banner (Holi Splash Sale) */}
      <div className="w-full bg-gradient-to-r from-purple-800 via-[#e11d48] to-[#ea580c] py-2 lg:py-2.5 flex items-center justify-center text-white text-sm sm:text-base md:text-lg px-2 md:px-4 font-medium">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-5">
          <span className="uppercase tracking-widest text-center">
            HOLI SPLASH SALE, Ends In:
          </span>
          {/* Timer blocks */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <TimerBlock value={formatNumber(timeLeft.days)} label="Day" />
            <span className="font-bold text-lg md:text-xl mb-1">:</span>
            <TimerBlock value={formatNumber(timeLeft.hours)} label="Hours" />
            <span className="font-bold text-lg md:text-xl mb-1">:</span>
            <TimerBlock value={formatNumber(timeLeft.minutes)} label="Min" />
            <span className="font-bold text-lg md:text-xl mb-1">:</span>
            <TimerBlock value={formatNumber(timeLeft.seconds)} label="Sec" />
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="w-full bg-[#5A0000] text-[#D1D1D1] text-xs sm:text-sm md:text-base py-2 md:py-2.5 flex justify-start items-center z-10 overflow-hidden">
        <div className="w-full whitespace-nowrap">
          <span className="font-medium tracking-wider inline-block animate-marquee">
            Get EXTRA 10% OFF On Orders Above रु1299* Code: CAM10 | Get EXTRA
            15% OFF On Orders Above रु1999* Code: CAM15
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-[#f8f8f8] border-b border-gray-200 px-4 xl:px-12 py-3 flex justify-between items-center h-[80px] md:h-[90px] xl:h-[100px] sticky top-0 z-50">
        {/* Mobile Hamburger Menu Icon */}
        <div
          className="lg:hidden flex items-center justify-center cursor-pointer text-[#111] hover:text-gray-600 mr-4"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FiX className="text-3xl" />
          ) : (
            <FiMenu className="text-3xl" />
          )}
        </div>

        {/* Logo */}
        <div className="flex-1 lg:flex-none flex justify-center lg:justify-start cursor-pointer mix-blend-multiply mr-auto lg:mr-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bodyFont tracking-[0.2em] md:tracking-[0.25em] text-[#111] font-medium">
            SNEAKERSZONE
          </h1>
        </div>

        {/* Desktop Menu Items */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-semibold text-[#111] xl:ml-8">
          <NavItem title="NEW" />
          <NavItem title="MEN" />
          <NavItem title="WOMEN" />
          <NavItem title="OFFERS" />
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-5 xl:gap-8 ml-auto">
          {/* Search Bar - Hidden on mobile, shown on tablet/desktop */}
          <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-full px-5 py-2.5 w-[260px] lg:w-[320px] xl:w-[420px] hover:border-gray-400 focus-within:border-gray-800 transition-colors shadow-sm">
            <FiSearch className="text-gray-500 text-xl flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Holi Splash Sale"
              className="bg-transparent outline-none border-none text-sm xl:text-base w-full ml-3 text-primeColor placeholder:text-gray-500 font-medium"
            />
          </div>

          {/* Mobile Search Icon */}
          <div className="md:hidden flex flex-col items-center justify-center cursor-pointer text-[#111] hover:text-gray-600 transition-colors">
            <FiSearch className="text-2xl" />
          </div>

          {/* Account */}
          {user && user.id ? (
            <div className="hidden sm:flex items-center justify-center">
              <UserMenu />
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex flex-col items-center justify-center cursor-pointer text-[#111] hover:text-gray-600 transition-colors group"
            >
              <FiUser className="text-2xl xl:text-[28px] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] xl:text-xs mt-1.5 font-semibold tracking-wider">
                ACCOUNT
              </span>
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="flex flex-col items-center justify-center cursor-pointer text-[#111] hover:text-gray-600 transition-colors group relative"
          >
            <FiShoppingCart className="text-2xl xl:text-[28px] group-hover:scale-110 transition-transform" />
            {/* Optional badge indicator */}
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
            <span className="text-[11px] xl:text-xs mt-1.5 font-semibold tracking-wider">
              CART
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Dropdown items */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col z-[100]">
          {/* Mobile Search Input */}
          <div className="p-4 border-b border-gray-100 flex md:hidden items-center bg-gray-50 rounded-md mx-4 mt-4 py-3">
            <FiSearch className="text-gray-500 text-xl mr-3" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-base font-medium"
            />
          </div>

          <MobileNavItem title="NEW" />
          <MobileNavItem title="MEN" />
          <MobileNavItem title="WOMEN" />
          <MobileNavItem title="OFFERS" />

          <div className="mt-4 bg-gray-50 p-4 border-t border-gray-100 grid grid-cols-2 gap-4">
            {user ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-md bg-white"
              >
                <FiUser className="text-lg" />{" "}
                {user?.firstName || user?.name || "Profile"}
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-md bg-white"
              >
                <FiUser className="text-lg" /> Account
              </Link>
            )}
            <Link
              to="/stores"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-gray-700 flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-md bg-white"
            >
              <MdStorefront className="text-lg" /> Stores
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const TimerBlock = ({ value, label }) => (
  <div className="bg-white text-black flex flex-col items-center justify-center w-[40px] sm:w-[46px] h-[44px] sm:h-[50px] rounded-sm shadow-sm md:shadow-md">
    <span className="font-bold text-base sm:text-lg md:text-xl leading-tight md:leading-none md:mb-0.5">
      {value}
    </span>
    <span className="text-[10px] md:text-xs uppercase leading-none text-gray-500 font-bold tracking-wider">
      {label}
    </span>
  </div>
);

const NavItem = ({ title }) => (
  <div className="flex items-center gap-1.5 cursor-pointer text-gray-800 hover:text-black transition-colors py-2 relative group">
    <span className="tracking-widest uppercase">{title}</span>
    <FiChevronDown className="text-sm mb-0.5 transition-transform group-hover:rotate-180" />
    <span className="absolute left-0 bottom-0 w-full h-[2.5px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
  </div>
);

const MobileNavItem = ({ title }) => (
  <div className="flex justify-between items-center py-5 px-6 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-800">
    <span className="tracking-widest font-semibold text-base">{title}</span>
    <FiChevronRight className="text-gray-400 text-lg" />
  </div>
);

export default Navigation;
