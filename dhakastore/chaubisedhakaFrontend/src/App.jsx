import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/products/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Checkout from "./components/checkout/Checkout";
import AdminLayout from "./components/admin/AdminLayout";
import DashBoard from "./components/admin/dashboard/DashBoard";
import AdminProduct from "./components/admin/product/AdminProduct";
import Sellers from "./components/admin/sellers/Sellers";
import Category from "./components/admin/categories/Category";
import Orders from "./components/admin/orders/Orders";
import axios from "axios";
import Navigation from "./components/Navbar/Navigation";
import Home from "./components/home/Home";
import ProductDetails from "./components/products/ProductDetails";

import MainLayout from "./components/layout/MainLayout";

const MyContext = createContext();
function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  const getCountry = async (url) => {
    const response = await axios.get(url).then((res) => {
      setCountryList(res.data.data);
    });
  };
  const values = {
    countryList,
    selectedCountry,
    setSelectedCountry,
  };
  return (
    <React.Fragment>
      <MyContext.Provider value={values}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/shop" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/" element={<PrivateRoute />}>
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Route>
            {/* PrivateRoute added */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute publicPage />}></Route>

            <Route path="/" element={<PrivateRoute adminOnly />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="" element={<DashBoard />} />
                <Route path="products" element={<AdminProduct />} />
                <Route path="sellers" element={<Sellers />} />
                <Route path="orders" element={<Orders />} />
                <Route path="categories" element={<Category />} />
              </Route>
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-center" />
      </MyContext.Provider>
    </React.Fragment>
  );
}

export default App;
export { MyContext };
