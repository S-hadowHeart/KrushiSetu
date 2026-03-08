import React from "react";
import { Link } from "react-router-dom";

export function OtpVerify(){
    return(
        <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

    <h2 className="text-2xl font-bold text-text-dark mb-2">
      Verify OTP
    </h2>
    <p className="text-gray-500 text-sm mb-6">
      Enter the 6-digit OTP sent to your email/mobile
    </p>

    <form method="POST" action="reset" >

      <input type="text"
        name="otp"
        maxlength="6"
        className="w-full text-center text-2xl tracking-widest rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary mb-6"
        placeholder="------"
        required/>

      <Link 
        to="/password/reset"
        className="inline-block text-center w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold">
        Verify OTP
      </Link>
    </form>

  </div>
</section>
    );
}