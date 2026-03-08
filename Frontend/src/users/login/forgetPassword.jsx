import React from "react";
import { Link } from "react-router-dom";

export function ForgotPassworld()
{
    return(
        <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-text-dark">
        Forgot Password?
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Enter your registered email or mobile number
      </p>
    </div>

    <form method="POST" >
 

      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700">
          Email or Mobile
        </label>
        <input type="text"
          name="identifier"
          className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary"
          placeholder="example@email.com or 9876543210"
          required/>
      </div>

  
      <Link to="/password/otpverify"
        className="inline-block text-center w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition">
        Send OTP
      </Link>
    </form>

    <div className="text-center mt-6 text-sm">
      <a href="/login" className="text-primary-dark font-medium hover:underline">
        Back to Login
      </a>
    </div>

  </div>
</section>
    );
}