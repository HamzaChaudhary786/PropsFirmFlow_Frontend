"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Twitter } from "lucide-react";
import logo from "../../../public/assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0B0F13] text-gray-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 border-b border-slate-800 pb-10">
          {/* Left Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={logo}
                alt="PropFirmFlow Logo"
                width={160}
                height={77}
                className="w-40 h-auto sm:w-[200px]"
                priority
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              The ultimate destination for comparing prop trading firms. Find the best fees,
              rules, and profit splits to accelerate your trading career.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="bg-green-600/10 border border-green-500/20 p-2 rounded-lg hover:bg-green-600/20 transition-all duration-200"
              >
                <Twitter className="text-green-500 w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-green-600/10 border border-green-500/20 p-2 rounded-lg hover:bg-green-600/20 transition-all duration-200"
              >
                <Instagram className="text-green-500 w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Columns (Quick Links + Legal) */}
          <div className="md:col-span-1 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:justify-end sm:gap-16 lg:gap-24">
              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <a href="#" className="hover:text-green-500 transition-colors duration-200">
                      Reviews
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500 transition-colors duration-200">
                      Trading Tools
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500 transition-colors duration-200">
                      Jobs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500 transition-colors duration-200">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="mt-8 sm:mt-0">
                <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <a href="#" className="hover:text-green-500 transition-colors duration-200">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500 transition-colors duration-200">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500 transition-colors duration-200">
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500 transition-colors duration-200">
                      Disclaimer
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-sm text-gray-500">
          <p>© 2025 Prop Firm Markets. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-gray-400">Made for traders, by traders.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
