import React from "react";
import { Routes, Route } from "react-router-dom";
import { Error_404 } from "../pages/404";

export default function NotFoundRoute()
{
    return (
       <Routes>
            <Route path="*" element={<Home />} />
            
          </Routes>
    );
}