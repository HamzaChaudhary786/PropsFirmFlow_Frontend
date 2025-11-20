"use client";

import React from 'react'
// import FirmsForm from '../components/admin/FirmsForm'
const TradeHub = () => {
    return (
        <>
            <section className='bg-linear-to-tl from-black/80  to-gray-800 py-16 '>
                <div className='flex flex-col justify-items-center items-center gap-y-4 '>
                    <h2 className="px-3 py-2 rounded-3xl w-fit bg-green-500/20 text-green-600 font-semibold">
                        Beyond Comparisons
                    </h2>

                    <h1 className='text-[26px] text-center sm:text-4xl md:text-[70px] text-white'>
                        <span className=' font-bold'>Your Complete</span> <span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 via-blue-500 to-teal-400 font-bold">
                            Trading Hub
                        </span>
                    </h1>
                    <p className='text-center text-lg text-green-50'>
                        Explore jobs, giveaways, and tools designed to help prop traders succeed.
                    </p>
                </div>
                <div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-4 sm:p-6 lg:p-10 rounded-3xl">

                        <div
                            className="bg-[#11161D] text-center p-8 rounded-2xl shadow-lg max-w-sm border border-transparent hover:border-green-600 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] hover:scale-105 transition-all duration-300">
                            <div className="flex justify-center mb-6">
                                <div className="bg-green-900/30 p-4 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                            d="M12 12c1.657 0 3-.895 3-2s-1.343-2-3-2-3 .895-3 2 1.343 2 3 2zm0 0c-2.28 0-4 1.343-4 3v1h8v-1c0-1.657-1.72-3-4-3z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-3">Job Board</h3>
                            <p className="text-gray-400 mb-6">
                                Find trading positions at top prop firms. From junior traders to senior portfolio managers.
                            </p>
                            <button
                                className="bg-linear-to-r from-green-500 to-green-400 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
                                Browse Jobs →
                            </button>
                        </div>

                        <div
                            className="bg-[#11161D] text-center p-8 rounded-2xl shadow-lg max-w-sm border border-transparent hover:border-blue-600 hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] hover:scale-105 transition-all duration-300">
                            <div className="flex justify-center mb-6">
                                <div className="bg-blue-900/30 p-4 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-3">Giveaways</h3>
                            <p className="text-gray-400 mb-6">
                                Enter exclusive giveaways for free funded accounts and trading prizes from partner firms.
                            </p>
                            <button
                                className="bg-linear-to-r from-blue-500 to-blue-400 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
                                View Giveaways →
                            </button>
                        </div>

                        <div
                            className="bg-[#11161D] text-center p-8 rounded-2xl shadow-lg max-w-sm border border-transparent hover:border-orange-600 hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:scale-105 transition-all duration-300">
                            <div className="flex justify-center mb-6">
                                <div className="bg-orange-900/30 p-4 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                            d="M4 19h4V9H4v10zm6 0h4V4h-4v15zm6 0h4v-7h-4v7z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-3">Trading Tools</h3>
                            <p className="text-gray-400 mb-6">
                                Free calculators for lot size, margin, pip value, and risk management to improve your trading.
                            </p>
                            <button
                                className="bg-linear-to-r from-orange-500 to-orange-400 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
                                Use Tools →
                            </button>
                        </div>

                    </div>
                </div>



            </section>
        </>
    )
}

export default TradeHub