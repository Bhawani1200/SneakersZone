import {
  FaBoxOpen,
  FaHome,
  FaShoppingCart,
  FaStore,
  FaThList,
} from "react-icons/fa";
import { image1, image2, image3 } from "./constants";

export const bannerList = [
  {
    id: 1,
    image: image1,
    title: "Timeless Elegance",
    subtitle: "Discover the beauty of traditional Nepali sarees",
    description:
      "Each piece tells a story of heritage, crafted with love and attention to detail",
  },
  {
    id: 2,
    image: image2,
    title: "Heritage Collection",
    subtitle: "Authentic traditional wear for women",
    description:
      "Embrace tradition with our handpicked collection of kurtas and ethnic wear",
  },
  {
    id: 3,
    image: image3,
    title: "Festive Splendor",
    subtitle: "Celebrate in style with our festive collection",
    description: "Perfect for weddings, festivals, and special occasions",
  },
];

export const adminNavigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: FaHome,
    current: true,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: FaShoppingCart,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FaThList,
  },
  {
    name: "Sellers",
    href: "/admin/sellers",
    icon: FaStore,
  },
  {
    name: "Shoe Cleaner",
    href: "/admin/shoe-cleaner",
    icon: FaBoxOpen,
  },
  {
    name: "Shoe Cleaner Category",
    href: "/admin/shoe-cleaner-category",
    icon: FaThList,
  },
];

export const sellerNavigation = [
  {
    name: "Orders",
    href: "/admin/orders",
    icon: FaShoppingCart,
    current: true,
  },
  {
    name: "Shoe Cleaner",
    href: "/admin/shoe-cleaner",
    icon: FaBoxOpen,
  },
];
