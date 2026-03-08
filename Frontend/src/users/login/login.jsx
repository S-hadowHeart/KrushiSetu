import React from "react";

export function Login()
{
    return(
        
<section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

    
    <div className="relative hidden md:flex flex-col justify-center items-center p-10 bg-cover bg-center"
         style={{
           backgroundImage:`
             linear-gradient(rgba(16,34,16,0.6), rgba(16,34,16,0.8)),
             url('images/home/farm.png')` }}
         >
      
      <div className="text-center text-white z-10">
        <h2 className="text-4xl font-black mb-4">Welcome Back to KrushiSetu</h2>
        <p className="text-gray-200 text-sm max-w-sm">
          Continue building transparent trade relationships across Saurashtra.
          Empower farmers. Trade with trust.
        </p>
      </div>

      <div className="absolute bottom-6 text-xs text-gray-300">
        Serving Rajkot • Amreli • Junagadh
      </div>
    </div>

    
    <div className="p-8 md:p-12 flex flex-col justify-center">

      <div className="mb-8 text-center md:text-left">
        <h3 className="text-2xl font-bold text-text-dark">Login to Your Account</h3>
        <p className="text-gray-500 text-sm mt-1">
          Enter your credentials to continue
        </p>
      </div>

      <form className="space-y-6" method="POST">
        

        <div>
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <div className="mt-2 relative">
            <input type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              placeholder="you@example.com"
              required/>
          </div>
        </div>

       
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="mt-2 relative">
            <input type="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              placeholder="••••••••"
              required/>
          </div>
        </div>

       
        <div>
          <label className="text-sm font-medium text-gray-700">Login As</label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <button type="button"
              className="rounded-lg border border-primary bg-primary/10 py-2 text-primary-dark font-semibold hover:bg-primary hover:text-white transition">
              Farmer / Seller
            </button>
            <button type="button"
              className="rounded-lg border border-accent-orange bg-orange-50 py-2 text-accent-orange font-semibold hover:bg-accent-orange hover:text-white transition">
              Buyer
            </button>
          </div>
        </div>

        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="rounded border-gray-300"/>
            Remember me
          </label>
          <a href="password/forgot" className="text-primary-dark font-medium hover:underline">
            Forgot password?
          </a>
        </div>

        
        <button type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all">
          Login Securely
        </button>

      </form>

      
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-xs text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

    
      <p className="text-sm text-center text-gray-600">
        Don’t have an account?
        <a href="/registration" className="text-primary-dark font-semibold hover:underline">
          Create Account
        </a>
      </p>

    </div>
  </div>
</section>

    );
}