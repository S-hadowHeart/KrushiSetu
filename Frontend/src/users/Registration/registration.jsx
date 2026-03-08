import React from "react";
import { Link } from "react-router-dom";
export function Register()
{
    return(
        <section
  className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12"
>
  <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-10 text-center">
    <h2 className="text-3xl font-bold text-text-dark mb-3">Join KrushiSetu</h2>
    <p className="text-gray-600 mb-10">Select how you want to use the platform</p>

    <div className="grid md:grid-cols-2 gap-8">
      
      <Link to="/farmmer/registration">
        <div    
          className="group border border-primary/20 rounded-xl p-8 hover:shadow-lg hover:border-primary transition cursor-pointer"
        >
          <div className="flex justify-center mb-4 text-primary">
            <span className="material-symbols-outlined text-5xl">agriculture</span>
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-2">Farmer / Seller</h3>
          <p className="text-gray-500 text-sm">
            List crops, receive offers, negotiate directly from buyers.
          </p>
        </div>
      </Link>

      
       <Link to="/buyer/registration">
      <div
        className="group border border-accent-orange/30 rounded-xl p-8 hover:shadow-lg hover:border-accent-orange transition cursor-pointer"
      >
        <div className="flex justify-center mb-4 text-accent-orange">
          <span className="material-symbols-outlined text-5xl"
            >shopping_basket</span
          >
        </div>
        <h3 className="text-xl font-bold text-text-dark mb-2">Buyer</h3>
        <p className="text-gray-500 text-sm">
          Browse listings, send offers, buy directly from farmers.
        </p>
      </div>
    </Link>
    </div>
  </div>
</section>
    );
}