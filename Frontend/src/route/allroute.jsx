import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { About } from "../pages/about";
import { ContactUs } from "../pages/contactUs";


export default function AllRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contactus" element={<ContactUs />} />
      
    </Routes>
  );
}
