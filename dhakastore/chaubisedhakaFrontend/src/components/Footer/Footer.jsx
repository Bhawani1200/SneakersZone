import { Link } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300">
      {/* Main Footer Content */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-white font-black text-2xl md:text-3xl mb-8 tracking-tight">
              About Chaubisedhaka
            </h3>
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-zinc-400">
              Your premier destination for premium footwear. We bring you the
              finest collection of shoes from top brands around the world.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-zinc-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-zinc-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-zinc-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-zinc-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black text-2xl md:text-3xl mb-8 tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-4 text-lg md:text-xl">
              <li>
                <Link
                  to="/men"
                  className="hover:text-blue-400 transition-colors"
                >
                  Men's Shoes
                </Link>
              </li>
              <li>
                <Link
                  to="/women"
                  className="hover:text-blue-400 transition-colors"
                >
                  Women's Shoes
                </Link>
              </li>
              <li>
                <Link
                  to="/kids"
                  className="hover:text-blue-400 transition-colors"
                >
                  Kids' Shoes
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="hover:text-blue-400 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/sale"
                  className="hover:text-blue-400 transition-colors"
                >
                  Sale
                </Link>
              </li>
              <li>
                <Link
                  to="/brands"
                  className="hover:text-blue-400 transition-colors"
                >
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-black text-2xl md:text-3xl mb-8 tracking-tight">
              Customer Service
            </h3>
            <ul className="space-y-4 text-lg md:text-xl">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-blue-400 transition-colors"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-blue-400 transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="hover:text-blue-400 transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-blue-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="hover:text-blue-400 transition-colors"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-black text-2xl md:text-3xl mb-8 tracking-tight">
              Contact & Support
            </h3>
            <ul className="space-y-5 text-lg md:text-xl">
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <span>Thamel, Kathmandu 44600, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <a
                  href="tel:+9779800000000"
                  className="hover:text-blue-400 transition-colors"
                >
                  +977 9800000000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <a
                  href="mailto:info@chaubisedhaka.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@chaubisedhaka.com
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <p className="text-xl font-bold mb-3 text-white">Store Hours:</p>
              <p className="text-lg text-zinc-400">
                Mon - Sat: 9:00 AM - 8:00 PM
              </p>
              <p className="text-lg text-zinc-400">
                Sunday: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-lg md:text-xl text-zinc-400 font-medium">
              &copy; 2026 Chaubisedhaka. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <span className="text-lg md:text-xl text-zinc-400 font-bold">
                We Accept:
              </span>
              <div className="flex items-center gap-4">
                <div className="bg-white px-5 py-2 rounded-lg text-base font-black text-zinc-900 shadow-xl">
                  VISA
                </div>
                <div className="bg-white px-5 py-2 rounded-lg text-base font-black text-zinc-900 shadow-xl">
                  MASTERCARD
                </div>
                <div className="bg-[#19A139] px-5 py-2 rounded-lg text-base font-black text-white shadow-xl">
                  eSewa
                </div>
                <div className="bg-[#5C2D91] px-5 py-2 rounded-lg text-base font-black text-white shadow-xl">
                  Khalti
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10 mt-8 text-base md:text-lg text-zinc-500 font-black">
            <Link
              to="/privacy"
              className="hover:text-blue-500 transition-colors uppercase tracking-widest"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-blue-500 transition-colors uppercase tracking-widest"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/cookies"
              className="hover:text-blue-500 transition-colors uppercase tracking-widest"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
