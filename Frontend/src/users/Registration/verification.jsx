import React from "react";
import { Link } from "react-router-dom";

export function Verification() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10 text-center">
        <form method="POST" action="/registration/success">
          <h2 className="text-2xl font-bold text-text-dark mb-2">
            Identity Verification
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Upload Aadhar Card or Kisan Card for secure trading.
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-primary transition cursor-pointer">
            <span className="material-symbols-outlined text-5xl text-gray-400">
              upload
            </span>
            <p className="text-gray-500 text-sm mt-2">Click to upload document</p>
          </div>

          <Link
            to="/registration/success"
            className="inline-block w-full bg-primary text-white py-3 rounded-lg font-bold text-center hover:bg-primary-dark transition"
          >
            Submit for Approval
          </Link>
        </form>
      </div>
    </section>
  );
}
