"use client";

import React from "react";
import { DollarSign, RotateCw, Lock, TrendingUp } from "lucide-react";

const WhyChoose = () => {
  const benefits = [
    {
      icon: <RotateCw className="w-8 h-8 text-green-400" />,
      title: "Free Reset",
      description:
        "With our Free Reset Challenge, if you get funded but lose an account within the first 10 days, we’ll provide a free challenge to help you get back on track — no extra cost, no hidden fees, just a second chance to succeed.",
    },
    {
      icon: <Lock className="w-8 h-8 text-green-400" />,
      title: "No Trailing Drawdowns",
      description:
        "We’re the only firm offering no trailing drawdown with our Instant Funding Challenge, so you never worry about your max drawdown trailing closely behind. Our drawdown is fixed at 5%, giving you true flexibility to breathe.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Up to 90% Profit Split",
      description:
        "Keep up to 90% of the trading profits you make from day 1 of your funded accounts — maximize your performance and earnings from the very start.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-400" />,
      title: "Payout on Demand",
      description:
        "Take control of your earnings. As soon as all trading conditions are met, you can request your payout — no waiting weeks. Receive your funds almost instantly, typically within 24 hours. Fast, flexible, and entirely on your terms.",
    },
  ];

  return (
    <section className="bg-[#0B0F0E] text-white py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center mb-14">
        <p className="text-green-400 uppercase tracking-widest mb-3 text-sm">
          Benefits
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
          Why <span className="text-green-400">Choose</span> Sure Leverage?
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Experience the SLP Advantage — on-demand payouts, flexible funding, 
          and tailor-made programs built to elevate your trading performance.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="relative bg-linear-to-br from-[#0F1716] to-[#0A1210] border border-green-800/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_15px_rgba(0,255,150,0.1)] 
                       hover:shadow-[0_0_25px_rgba(0,255,150,0.2)] transition-all duration-300"
          >
            {/* Icon Glow */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-green-500/20 rounded-full blur-xl"></div>

            <div className="relative flex items-center sm:items-start flex-col gap-4">
              <div className="flex items-center justify-center w-14 h-14 bg-green-500/10 rounded-xl border border-green-500/20">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Optional floating number box (like your image example) */}
              {index === 3 && (
                <div className="absolute bottom-6 right-6 bg-green-900/40 border border-green-700/50 text-green-300 text-sm px-4 py-2 rounded-lg shadow-inner">
                  $63,406.62
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
