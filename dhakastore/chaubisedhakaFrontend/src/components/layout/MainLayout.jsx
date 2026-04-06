import React from "react";
import Navigation from "../Navbar/Navigation";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
