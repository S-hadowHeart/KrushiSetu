import React from "react";

export function Success()
{
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="text-primary mb-6">
            <span className="material-symbols-outlined text-6xl">check_circle</span>
          </div>

          <h2 className="text-2xl font-bold text-text-dark mb-2">
            Registration Successful!
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Your account is under review. You will receive confirmation once
            verified.
          </p>

          <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition">
            Go to Dashboard
          </button>
        </div>
      </section>
    );
}