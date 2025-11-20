"use client";

import React, { useState } from 'react'
import { specialOffer } from '../../constants/json/dashboard/specialOffer';
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import Image from 'next/image';
import { sendNewsLetter } from "../../apis/publicApi/publicApi"

const SpecialOffer = () => {
  const [newsLetter, setNewsLetter] = useState(false)
  const handleSubmitNewsLetter = async (e) => {
    e.preventDefault();

    try {
      const response = await sendNewsLetter(newsLetter);
      console.log("Newsletter sent successfully:", response);
    } catch (error) {
      console.error("Newsletter Error:", error.response?.data || error);
    }
  };

  return (
    <>
      <section className='bg-linear-to-tl from-black/80  to-gray-800 px-4 py-16 pointer-events-auto '>
        <div>
          <h1 className='text-white text-center text-3xl md:text-[54px] font-bold '>
            The Leading Prop Firm Comparison Platform
          </h1>
          <p className='text-2xl text-center text-green-50'>
            Where serious traders compare top firms — and get the best discounts.
          </p>
        </div>
        <div className='  mt-16 min-h-screen p-4 sm:p-8 rounded-xl'>
          <div className='flex flex-col sm:flex-row gap-y-5 text-center sm:text-start justify-between mb-10'>
            <h1 className=' text-green-600 font-medium '>
              Special Offers
            </h1>
            <div className='text-green-50'>
              Live promotions & codes
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side - Special Offers (60%) */}
            <div className="w-full md:w-[60%]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {specialOffer.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#161a20] rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 h-full"
                  >
                    <div className="flex items-center justify-center sm:justify-between  sm:items-start">
                      <div className="flex flex-col sm:flex-row gap-4  items-center">
                        <Image
                          src={item.iconImage}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-contain bg-black"
                        />
                        <div>
                          <h1 className="text-white text-lg font-semibold">
                            {item.name}
                          </h1>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className='text-orange-400' />

                              ))}
                            </div>
                            <span className="text-gray-300 text-sm">
                              ({item.reviews})
                            </span>
                            <span className="bg-green-700 text-white text-xs px-2 py-1 rounded-lg ml-2">
                              {item.offerTag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0f1318] rounded-xl mt-4 p-4 flex flex-col sm:flex-row text-center justify-between items-center">
                      <div>
                        <h2 className="text-green-500 text-xl font-bold">
                          {item.discount}
                        </h2>
                        <p className="text-gray-400 text-sm">Exclusive</p>
                      </div>
                      <h3 className="text-white font-semibold">{item.code}</h3>
                      <div className="flex flex-col items-center">

                        <button className="mt-2 p-2 bg-[#1b1f26] rounded-lg hover:bg-[#232830] transition">
                          <IoCopyOutline className='text-white' />

                        </button>
                      </div>
                    </div>

                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 cursor-pointer text-sm mt-3 inline-block hover:underline"
                    >
                      Visit website →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Newsletter (40%) */}
            <div className="w-full md:w-[40%] flex items-center justify-center">
              <div className="bg-[#161a20] rounded-2xl p-4 sm:p-8 w-full border border-gray-700 shadow-lg text-center">
                <h2 className="text-white text-2xl font-bold mb-2">
                  Join Our Newsletter
                </h2>
                <p className="text-gray-300 text-sm mb-6">
                  We give away over{" "}
                  <span className="text-green-500 font-semibold">
                    $500k in funded accounts
                  </span>{" "}
                  monthly to our newsletter subscribers
                </p>

                <form
                  onSubmit={handleSubmitNewsLetter}
                  className="w-full"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 mb-4 placeholder-gray-400"
                    onChange={(e) => setNewsLetter(e.target.value)}
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg mb-6 transition-all duration-200"
                  >
                    Join Newsletter & Win Accounts
                  </button>
                </form>


                <ul className="text-gray-300 text-sm space-y-1 mb-6">
                  <li>✓ Exclusive discount codes</li>
                  <li>✓ Monthly funded account giveaways</li>
                  <li>✓ Latest prop firm updates</li>
                  <li className="text-gray-400">No spam. Unsubscribe anytime.</li>
                </ul>

                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm mb-3">
                    Follow us for daily updates
                  </p>
                  <div className="flex justify-center gap-4">
                    <a
                      href="#"
                      className="bg-[#0f1318] hover:bg-green-500 hover:text-black text-green-500 p-3 rounded-full transition-all duration-200"
                    >
                      <FaXTwitter className="text-lg" />
                    </a>
                    <a
                      href="#"
                      className="bg-[#0f1318] hover:bg-green-500 hover:text-black text-green-500 p-3 rounded-full transition-all duration-200"
                    >
                      <FaInstagram className="text-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>
    </>

  )
}

export default SpecialOffer