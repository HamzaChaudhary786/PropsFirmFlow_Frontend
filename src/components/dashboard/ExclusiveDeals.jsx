"use client";

import React from "react";

const ExclusiveDeals = () => {
  return (
    <section className="w-full bg-linear-to-b from-yellow-400 via-purple-600 to-yellow-200 text-black py-16 px-4 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="text-center lg:text-left flex-1">
          <p className="text-lg sm:text-xl mb-3 font-medium opacity-90">
            Stay Ahead of the Competition
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Get Exclusive Deals &<br className="hidden sm:block" /> Market
            Insights
          </h2>
          <p className="text-base sm:text-lg text-gray-800 max-w-lg mx-auto lg:mx-0">
            Join thousands of traders who get early access to the best prop firm
            deals, exclusive discounts, and market analysis delivered weekly.
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="flex-1 w-full max-w-lg bg-linear-to-r from-cyan-400/20 to-blue-500/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <form className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-[#0D0D10] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200"
            >
              Join Newsletter
            </button>
          </form>

          <p className="text-sm text-gray-900 mt-3 text-center sm:text-left">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveDeals;
