"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllFirm } from "../apis/admin/firms/firmApi";

const FirmsContext = createContext();

export const FirmsProvider = ({ children }) => {
    const [firms, setFirms] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination states
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // items per page
    const [totalFirms, setTotalFirms] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch firms function with pagination
    const fetchFirms = async (pageNumber = page, limitNumber = limit) => {
        try {
            setLoading(true);
            const data = await getAllFirm( pageNumber, limitNumber);
            setFirms(data.firms || []);
            setTotalFirms(data.total || 0);
            setTotalPages(data.pages || 1);
            setPage(data.page || pageNumber);
        } catch (err) {
            console.error("Error fetching firms:", err);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch on mount
    useEffect(() => {
        fetchFirms();
    }, []);

    return (
        <FirmsContext.Provider
            value={{
                firms,
                loading,
                fetchFirms,
                setFirms,
                page,
                setPage,
                limit,
                totalFirms,
                totalPages,
            }}
        >
            {children}
        </FirmsContext.Provider>
    );
};

// Custom hook
export const useFirms = () => useContext(FirmsContext);
