import React from "react";
export function RestPassworld()
{
    return(
        <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

    <h2 className="text-2xl font-bold text-text-dark text-center mb-6">
      Reset Password
    </h2>

    <form method="POST" target="password/otpverify">
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">
          New Password
        </label>
        <input type="password"
          name="password1"
          className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary"
          required/>
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input type="password"
          name="password2"
          className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary"
          required/>
      </div>

      <button type="submit"
        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold">
        Update Password
      </button>

    </form>

  </div>
</section>
    );
}