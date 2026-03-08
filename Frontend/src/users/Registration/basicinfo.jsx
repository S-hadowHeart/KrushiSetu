import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export function BasicInfo() {
    var [path, setpath] = useState(0);
    useEffect (() => {

        if (location.pathname === "/farmmer/registration") {
          setpath("/farmmer/farmdetails");
        } else {
          setpath("/buyer/buyerdetails");
        }
    },[location.pathname])
    
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">Step 2 of 5</p>
        </div>

        <form className="space-y-6" method="POST">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary"
            />
          </div>

          <Link
            to={path}
            className="inline-block w-full bg-primary text-white py-3 rounded-lg font-bold text-center hover:bg-primary-dark transition"
          >
            Continue
          </Link>
        </form>
      </div>
    </section>
  );
}
// if request.path == '/farmmer/registration' %} action="/farmmer/farmdetails" {% else %} action="/buyer/buyerdetails" {% endif %}>
