import React,{ useState } from "react";
import { NavLink } from 'react-router-dom';

export function NavBar(){
    return(
        
         <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-primary/20 bg-background-light/95 backdrop-blur-md px-6 py-4 lg:px-10">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary-dark">
          <span className="material-symbols-outlined text-3xl">agriculture</span>
        </div>
        <h2 className="text-text-dark text-xl font-extrabold tracking-tight">
          KrushiSetu
        </h2>
      </div>

      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
        <nav className="flex items-center gap-6">
        {
            [
                {name: "Home" , path : "/"},
                {name: "About", path : "/about"},
                {name: "Contact us" ,  path: "/contactus"},
                {name: "Login" , path :"/login"},
                {name: "Register" , path: "/registration"},
            ].map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                        `text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary-dark font-bold"
                    : "text-text-dark/80 hover:text-primary-dark"
                }`
                
                    }
                >
                    {link.name}
                </NavLink>
            ))}
          <div className="h-4 w-px bg-gray-300 mx-2"></div>
        </nav>

        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50 transition-colors">
          <span className="material-symbols-outlined text-gray-500 text-[20px]">
            language
          </span>
          <span className="text-text-dark text-xs font-bold">EN/GUJ</span>
        </button>
      </div>

      <button className="md:hidden flex items-center justify-center p-2 text-text-dark">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>


    );
}