import axios from "axios";
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
import GoogleCallback from "./components/auth/GoogleCallback";
import Checkout from "./components/checkout/Checkout";
import AdminLayout from "./components/admin/AdminLayout";
import PaymentSuccess from "./components/checkout/PaymentSuccess";
import DashBoard from "./components/admin/dashboard/DashBoard";
import AdminProduct from "./components/admin/product/AdminProduct";
import Sellers from "./components/admin/sellers/Sellers";
import Category from "./components/admin/categories/Category";
import Orders from "./components/admin/orders/Orders";
import ShoeCleaner from "./components/admin/shoecleaner/ShoeCleaner";
import ShoeCleanerCategory from "./components/admin/shoecleaner/ShoeCleanerCategory";
import Offers from "./components/admin/offers/Offers";
import Navigation from "./components/Navbar/Navigation";

import Home from "./components/home/Home";
import ProductDetails from "./components/products/ProductDetails";
import NewLaunches from "./components/Category/NewLaunches";

import MainLayout from "./components/layout/MainLayout";
import DealsOfTheDay from "./components/Offer/Offer";

// import { FloatingWhatsApp } from "react-floating-whatsapp";
import { color } from "framer-motion";
// import whatsappIcon from "./assets/logo/whatsapp.jpg";

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
              <Route path="/new-arrivals" element={<NewLaunches />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/category/sale" element={<DealsOfTheDay />} />

              <Route path="/" element={<PrivateRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route
                  path="/payment/failure"
                  element={
                    <div className="flex justify-center items-center h-screen">
                      Payment Failed
                    </div>
                  }
                />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route path="/" element={<PrivateRoute publicPage />}></Route>

            <Route path="/" element={<PrivateRoute adminOnly />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="" element={<DashBoard />} />
                <Route path="products" element={<AdminProduct />} />
                <Route path="offers" element={<Offers />} />
                <Route path="sellers" element={<Sellers />} />

                <Route path="shoe-cleaner" element={<ShoeCleaner />} />
                <Route
                  path="shoe-cleaner-category"
                  element={<ShoeCleanerCategory />}
                />
                <Route path="orders" element={<Orders />} />
                <Route path="categories" element={<Category />} />
              </Route>
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-center" />

        {/* <FloatingWhatsApp
          phoneNumber="+977 9810357550"
          accountName="SneakersZone"
          avatar={whatsappIcon}
          chatMessage="Hello! How can I help you with your shoe needs today? 👟"
          placeHolder="Type your message..."
          messageDelay={3000}
          darkMode={false}
          allowClickAway={true}
          allowEsc={true}
          chatboxHeight={400}
          notification={true}
          notificationDelay={5000}
          notificationsound={true}
          notificationLoop={3000}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
            pointerEvents: "auto",
          }}
          buttonStyle={{
            backgroundColor: "#25D366",
            color: "white",
            pointerEvents: "auto",
          }}
          chatboxStyle={{
            backgroundColor: "#00A884",
            pointerEvents: "auto",
          }}
          onClick={() => console.log("Whatsapp button clicked!!!")}
          onSubmit={(event, inputValue) =>
            console.log("User submitted:", inputValue)
          }
          onClose={() => console.log("Chat box closed...")}
        /> */}
      </MyContext.Provider>
    </React.Fragment>
  );
}

export default App;
export { MyContext };
