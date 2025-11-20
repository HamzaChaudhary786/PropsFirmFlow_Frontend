"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

const ReviewModal = ({ firm, onClose, onSubmit }) => {
    const [form, setForm] = useState({
        displayName: "",
        title: "",
        review: "",
        ratings: {
            payoutSpeed: 0,
            transparency: 0,
            price: 0,
            customerSupport: 0,
            platforms: 0,
            tradingConditions: 0,
        },
    });

    const ratingCategories = [
        { key: "payoutSpeed", label: "Payout Speed" },
        { key: "transparency", label: "Transparency on Rules" },
        { key: "price", label: "Prices" },
        { key: "customerSupport", label: "Customer Support" },
        { key: "platforms", label: "Platforms Available" },
        { key: "tradingConditions", label: "Trading Conditions" },
    ];

    const handleRating = (key, value) => {
        setForm({
            ...form,
            ratings: { ...form.ratings, [key]: value },
        });
    };

    const handleSubmit = () => {
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3">
            <div className="bg-[#0f0f0f] w-full max-w-2xl rounded-xl shadow-lg p-6 text-gray-200 
        max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Write a Review for {firm?.name}
                    </h2>
                    <button onClick={onClose}>
                        <X className="text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Display Name */}
                <label className="text-sm font-medium">Display Name *</label>
                <input
                    type="text"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-2 mt-1 mb-4"
                    placeholder="How should your name appear?"
                    value={form.displayName}
                    onChange={(e) =>
                        setForm({ ...form, displayName: e.target.value })
                    }
                />

                {/* Review Title */}
                <label className="text-sm font-medium">Review Title</label>
                <input
                    type="text"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-2 mt-1 mb-4"
                    placeholder="Brief summary of your experience"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />

                {/* Ratings */}
                <h3 className="font-semibold mb-2">Rate Different Aspects</h3>

                {ratingCategories.map((item) => (
                    <div
                        key={item.key}
                        className="flex justify-between items-center py-2"
                    >
                        <span>{item.label}</span>

                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`cursor-pointer text-2xl ${form.ratings[item.key] > i
                                        ? "text-yellow-400"
                                        : "text-gray-600"
                                        }`}
                                    onClick={() => handleRating(item.key, i + 1)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Review Text */}
                <label className="text-sm font-medium mt-4 block">Your Review</label>
                <textarea
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 mt-1 h-32"
                    placeholder="Share your experience..."
                    value={form.review}
                    onChange={(e) =>
                        setForm({ ...form, review: e.target.value })
                    }
                />

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
