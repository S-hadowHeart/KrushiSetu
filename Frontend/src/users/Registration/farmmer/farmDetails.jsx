import React from "react";
import { Link } from "react-router-dom";

export function FarmDetails()
{
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-2xl font-bold text-text-dark mb-6">
            Farm Details
          </h2>

          <form className="grid md:grid-cols-2 gap-6" method="POST">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Farm Location
              </label>
              <input
                type="text"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Primary Crops
              </label>
              <input
                type="text"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Land Area (Acres)
              </label>
              <input
                type="number"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Experience (Years)
              </label>
              <input
                type="number"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <Link
                to="/farmmer/verification"
                
                className="inline-block w-full bg-primary text-white py-3 rounded-lg font-bold text-center hover:bg-primary-dark transition"
              >
                Continue to Verification
              </Link>
            </div>
          </form>
        </div>
      </section>
    );
}