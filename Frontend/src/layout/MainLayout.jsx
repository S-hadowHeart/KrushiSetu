import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../component/navbar";
import { Footer } from "../component/footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
