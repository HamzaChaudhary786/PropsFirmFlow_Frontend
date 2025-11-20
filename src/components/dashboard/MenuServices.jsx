"use client";

import React, { useState } from "react";
import { challengesData, firmsData } from "../../constants/json/dashboard/menuServices";
import { Search, X, ChevronDown } from 'lucide-react';
import { useFirms } from "../../context/FirmsContext";
import { useRouter } from "next/navigation";
import { filterOptions } from "../../constants/json/dashboard/options";

const MenuServices = () => {
    const { firms, loading, fetchFirms, setFirms, totalFirms } = useFirms();
    const router = useRouter();

    const [activeMenu, setActiveMenu] = useState("Challenges");
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        steps: ['2 Step'],
        platform: [],
        size: ['$100K'],
        firms: [],
        rules: []
    });

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const toggleFilter = (category, value) => {
        setSelectedFilters(prev => {
            const current = prev[category];
            const isSelected = current.includes(value);

            return {
                ...prev,
                [category]: isSelected
                    ? current.filter(item => item !== value)
                    : [...current, value]
            };
        });
    };

    const removeFilter = (category, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [category]: prev[category].filter(item => item !== value)
        }));
    };

    const clearAllFilters = () => {
        setSelectedFilters({
            steps: [],
            platform: [],
            size: [],
            firms: [],
            rules: []
        });
        setSearchQuery('');
    };

    const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };
    const displayedFirms = activeTab === "top" ? firmsData.slice(0, 5) : firmsData;

    // Flatten challenges with firm details for filtering and display
    const allChallenges = firms.flatMap(firm =>
        firm.challenges.map(challenge => ({
            ...challenge,
            firmName: firm.firmName,
            logo: firm.logo,
            rating: firm.rating || 'N/A',
            reviews: firm.reviews?.length || 0,
            platforms: firm.platforms || [],
            // Assuming size, payoutFreq, accountSize, maxLoss might need mapping/adjustment based on data
            // For example: accountSize could be derived or added; here using placeholders if missing
            accountSize: challenge.accountSize || '$100K', // Placeholder based on initial filter
            steps: challenge.type?.join(', ') || 'N/A',
            profitTarget: challenge.profitTarget || 'N/A',
            maxLoss: challenge.drawdownValue || 'N/A', // Mapped from drawdownValue as max loss
            profitSplit: challenge.profitSplit || 'N/A',
            payoutFreq: challenge.payoutFreq || ["Weekly", "Bi-Weekly", "Monthly"], // Placeholder as array
            price: challenge.price || 'N/A',
            rules: challenge.tags?.split(', ') || [] // Assume tags is comma-separated string, split into array for rules filter
        }))
    );

    // Apply filters and search
    const filteredChallenges = allChallenges.filter(challenge => {
        const lowerSearch = searchQuery.toLowerCase();
        if (searchQuery && !challenge.firmName.toLowerCase().includes(lowerSearch) && !challenge.name.toLowerCase().includes(lowerSearch)) {
            return false;
        }

        if (selectedFilters.steps.length > 0) {
            const selectedSteps = selectedFilters.steps.map(s => s.replace(' ', '-'));
            if (!challenge.type?.some(t => selectedSteps.includes(t))) {
                return false;
            }
        }

        if (selectedFilters.platform.length > 0) {
            if (!selectedFilters.platform.some(p => challenge.platforms.includes(p))) {
                return false;
            }
        }

        if (selectedFilters.size.length > 0) {
            if (!selectedFilters.size.includes(challenge.accountSize)) {
                return false;
            }
        }

        if (selectedFilters.firms.length > 0) {
            if (!selectedFilters.firms.includes(challenge.firmName)) {
                return false;
            }
        }

        if (selectedFilters.rules.length > 0) {
            if (!selectedFilters.rules.some(r => challenge.rules.includes(r))) {
                return false;
            }
        }

        return true;
    });

    const handleViewChallenge = (challenge) => {
        router.push(`/view/${challenge._id}`);
    };

    return (
        <section className="bg-linear-to-tl from-black/80  to-gray-800 px-4 py-10 text-white min-h-screen min-w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6">Our Services</h2>

            {/* Menu Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
                {["Firms", "Challenges", "Community"].map((menu) => (
                    <button
                        key={menu}
                        onClick={() => toggleMenu(menu)}
                        className={`px-6 py-2 rounded-full border transition-all ${activeMenu === menu
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                            : "border-gray-500 hover:bg-blue-700 hover:text-white"
                            }`}
                    >
                        {menu}
                    </button>
                ))}
            </div>

            {/* Menu Dropdowns */}
            <div className="w-full  mt-8">
                {activeMenu === "Firms" && (
                    <>
                        <div className="min-h-screen bg-gray-950">
                            <section>
                                {/* Header Section */}
                                <div className="text-center text-white py-10 bg-linear-to-b from-gray-900 to-gray-950">
                                    {/* Title */}
                                    <h1 className="text-4xl font-bold mb-2">
                                        All{" "}
                                        <span className="bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                            Prop Firms
                                        </span>
                                    </h1>

                                    {/* Subtitle */}
                                    <p className="text-gray-400 mb-6 text-sm sm:text-base">
                                        Complete directory of all prop trading firms, sorted by rating and performance.
                                    </p>

                                    {/* Tabs */}
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => setActiveTab("top")}
                                            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${activeTab === "top"
                                                ? "bg-gray-800 text-white border border-gray-700"
                                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                }`}
                                        >
                                            Top 10 Firms
                                        </button>

                                        <button
                                            onClick={() => setActiveTab("all")}
                                            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${activeTab === "all"
                                                ? "bg-gray-800 text-white border border-gray-700"
                                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                }`}
                                        >
                                            All Firms ({firmsData.length})
                                        </button>
                                    </div>
                                </div>

                                {/* Firms Table Section */}
                                <div className="max-w-7xl mx-auto px-4 py-8">
                                    {/* 👇 Horizontal scroll wrapper */}
                                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-gray-900 rounded-lg border border-gray-800">
                                        <div className="min-w-[1000px] bg-gray-900">
                                            {/* Table Header */}
                                            <div className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-gray-800 bg-gray-900">
                                                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                                    RANK
                                                </div>
                                                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                                    FIRM
                                                </div>
                                                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                                    RATING / REVIEWS
                                                </div>
                                                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                                    COUNTRY
                                                </div>
                                                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                                    YEARS
                                                </div>
                                                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                                    PLATFORMS
                                                </div>
                                                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider text-right">
                                                    ACTIONS
                                                </div>
                                            </div>


                                            {/* Table Body */}
                                            {firms?.map((firm, index) => (
                                                <div
                                                    key={index}
                                                    className="grid grid-cols-7 gap-4 px-6 py-6 border-b border-gray-800 hover:bg-gray-800 transition-colors items-center"
                                                >
                                                    {/* Rank */}
                                                    <div className="flex items-center">
                                                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-400 to-blue-500 flex items-center justify-center">
                                                            <span className="text-gray-900 font-bold text-lg">
                                                                #{index}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Firm */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-xl">
                                                            <img src={firm?.logo?.url} alt="" />
                                                        </div>
                                                        <span className="text-white font-semibold text-base">
                                                            {firm?.firmName}
                                                        </span>
                                                    </div>

                                                    {/* Rating / Reviews */}
                                                    <div className="flex flex-col items-center gap-3">
                                                        <span className="text-white font-bold text-lg">{firm.rating}</span>
                                                        <div className="flex gap-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className="text-green-500 text-sm">
                                                                    ⭐
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="text-gray-400 text-sm">
                                                            ({firm.reviews} reviews)
                                                        </span>
                                                    </div>

                                                    {/* Country */}
                                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                                        <span className="text-2xl">{firm.countryFlag}</span>
                                                        <span className="text-gray-300 font-medium">{firm.country}</span>
                                                    </div>

                                                    {/* Years */}
                                                    <div>
                                                        <span className="text-white font-semibold text-base">
                                                            10
                                                        </span>
                                                    </div>

                                                    {/* Platforms */}
                                                    <div className="flex flex-wrap gap-1">
                                                        {firm.platforms.map((platform, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                                                            >
                                                                {platform}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex gap-2 justify-end">
                                                        <button className="px-4 py-2 bg-transparent border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                                                            View Details
                                                        </button>
                                                        <button className="px-4 py-2 bg-green-500 text-gray-900 rounded-lg hover:bg-green-600 transition-colors text-sm font-bold">
                                                            Visit Firm
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </>
                )}
                {activeMenu === "Challenges" && (
                    <>
                        <section>

                            <div className=" text-white p-8">
                                <div className="max-w-7xl mx-auto">
                                    {/* Search and Clear Filters */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="relative flex-1 max-w-xl">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                placeholder="Search firms..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full bg-[#13131a] border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-700"
                                            />
                                        </div>

                                        {hasActiveFilters && (
                                            <button
                                                onClick={clearAllFilters}
                                                className="ml-4 px-6 py-3 text-gray-400 hover:text-white transition-colors"
                                            >
                                                Clear Filters
                                            </button>
                                        )}
                                    </div>

                                    {/* Filter Dropdowns */}
                                    <div className="flex gap-4 mb-6">
                                        {Object.keys(filterOptions).map((category) => (
                                            <div key={category} className="relative">
                                                <button
                                                    onClick={() => toggleDropdown(category)}
                                                    className="flex items-center gap-2 px-6 py-3 bg-[#13131a] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors capitalize"
                                                >
                                                    {category}
                                                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === category ? 'rotate-180' : ''}`} />
                                                </button>

                                                {openDropdown === category && (
                                                    <div className="absolute top-full mt-2 w-56 bg-[#13131a] border border-gray-800 rounded-lg shadow-xl z-10 py-2">
                                                        {filterOptions[category].map((option) => (
                                                            <label
                                                                key={option}
                                                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800/50 cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedFilters[category].includes(option)}
                                                                    onChange={() => toggleFilter(category, option)}
                                                                    className="w-4 h-4 rounded border-gray-700 bg-gray-900 checked:bg-blue-600 checked:border-blue-600"
                                                                />
                                                                <span className="text-gray-300">{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Active Filter Tags */}
                                    {hasActiveFilters && (
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(selectedFilters).map(([category, values]) =>
                                                values.map((value) => (
                                                    <div
                                                        key={`${category}-${value}`}
                                                        className="flex items-center gap-2 px-4 py-2 bg-[#13131a] border border-gray-800 rounded-lg"
                                                    >
                                                        <span className="text-gray-300">{value}</span>
                                                        <button
                                                            onClick={() => removeFilter(category, value)}
                                                            className="text-gray-500 hover:text-gray-300 transition-colors"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div className="w-full p-4 sm:p- min-h-screen">
                                <div className="max-w-7xl mx-auto">
                                    <div className="bg-linear-to-tl from-black/80  to-gray-800 rounded-lg overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-gray-800">
                                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-green-500">📈</span>
                                                                FIRM / RANK
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                                            <div className="flex items-center justify-center gap-1">
                                                                ACCOUNT SIZE
                                                                <span className="text-gray-500">⌃</span>
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                                            <div className="flex items-center justify-center gap-1">
                                                                STEPS
                                                                <span className="text-gray-500">⌃</span>
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                                            <div className="flex items-center justify-center gap-1">
                                                                PROFIT TARGET
                                                                <span className="text-gray-500">⌃</span>
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                                            <div className="flex items-center justify-center gap-1">
                                                                MAX LOSS
                                                                <span className="text-gray-500">⌃</span>
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                                            PROFIT SPLIT
                                                        </th>
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <span className="text-green-500">⏱</span>
                                                                PAYOUT FREQ
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                                            <div className="flex items-center justify-center gap-1">
                                                                PRICE
                                                                <span className="text-gray-500">⌃</span>
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                                            ACTIONS
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredChallenges?.map((challenge, index) => (
                                                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                                                            <td className="px-6 py-6">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-2xl">
                                                                        <img src={challenge?.logo?.url} alt="" />
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="font-semibold text-white text-base mb-1">{challenge?.firmName} - {challenge?.name}</span>
                                                                        <div className="flex items-center gap-1">
                                                                            <span className="text-yellow-500">⭐</span>
                                                                            <span className="text-white font-medium">{challenge.rating}</span>
                                                                            <span className="text-gray-500">({challenge.reviews})</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-6 text-center text-white font-semibold text-base">
                                                                <span className="text-blue-500">💰</span> {challenge.accountSize}
                                                            </td>
                                                            <td className="px-6 py-6 text-center">
                                                                <span className="text-green-500 font-medium flex items-center justify-center gap-1">
                                                                    <span className="text-green-500">📈</span>
                                                                    {challenge.steps}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-6 text-center">
                                                                <span className="text-green-500 font-semibold flex items-center justify-center gap-1">
                                                                    <span className="text-green-500">●</span>
                                                                    {challenge.profitTarget}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-6 text-center">
                                                                <span className="text-red-500 font-semibold flex items-center justify-center gap-1">
                                                                    <span className="text-red-500">●</span>
                                                                    {challenge.maxLoss}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-6 text-center">
                                                                <span className="text-green-500 font-semibold flex items-center justify-center gap-1">
                                                                    <span className="text-green-500">%</span>
                                                                    {challenge.profitSplit}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-6 text-center">
                                                                <div className="flex flex-col items-center gap-1 text-gray-400">
                                                                    <span className="flex items-center gap-1">
                                                                        <span className="text-gray-500">⏱</span>
                                                                        {challenge.payoutFreq[0]}
                                                                    </span>
                                                                    {challenge.payoutFreq.length > 1 && challenge.payoutFreq.slice(1).map((freq, i) => (
                                                                        <span key={i}>{freq}</span>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-6 text-center">
                                                                <span className="text-green-500 font-bold text-base flex items-center justify-center gap-1">
                                                                    <span className="text-green-500">$</span>
                                                                    {challenge.price}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                <div className="flex gap-3 justify-center">
                                                                    <button className="px-6 py-2 bg-transparent border border-gray-600 text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium" onClick={() => handleViewChallenge(challenge)}>
                                                                        View
                                                                    </button>
                                                                    <button className="px-6 py-2 bg-linear-to-tl from-green-900  to-green-600 rounded hover:bg-green-600 transition-colors text-sm font-bold">
                                                                        Buy
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {activeMenu === "Community" && (
                    <>
                        <div>
                            Community
                        </div>
                    </>
                )}
            </div>
        </section >
    );
};

export default MenuServices;