import React from "react";
import { Link } from "react-router-dom";

export function BuyerDetails()
{
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark">
              Business Details
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Step 3 of 5 – Help sellers trust your business
            </p>
          </div>

          <form className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Business / Company Name
              </label>
              <input
                type="text"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="e.g., Shree Ganesh Cotton Mills Pvt Ltd"/>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Business Type
              </label>
              <select className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary">
                <option>Select Type</option>
                <option>Hotel / Restaurant</option>
                <option>Manufacturer</option>
                <option>Retailer</option>
                <option>Wholesaler</option>
                <option>Exporter</option>
                <option>NGO</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Years in Operation
              </label>
              <input
                type="number"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3"
                placeholder="e.g., 5"/>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Business Location (City)
              </label>
              <input
                type="text"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3"
                placeholder="e.g., Rajkot, Gujarat"/>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                GST Number (Optional)
              </label>
              <input
                type="text"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3"
                placeholder="Enter GSTIN if applicable"/>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Approx. Monthly Purchase Volume
              </label>
              <select className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3">
                <option>Select Volume</option>
                <option>Less than 10 Quintals</option>
                <option>10 – 50 Quintals</option>
                <option>50 – 200 Quintals</option>
                <option>200+ Quintals</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Preferred Crops
              </label>
              <input
                type="text"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-3"
                placeholder="e.g., Wheat, Cotton, Groundnut"/>
            </div>

            <div className="md:col-span-2 pt-4">
              <Link
                to="/buyer/verification"
                className="inline-block  w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold shadow-lg transition-all">
                Continue to Verification
              </Link>
            </div>
          </form>
        </div>
      </section>
    );
}