"use client";


import { deleteFirm } from '../../../apis/admin/firms/firmApi';
import FirmForm from '../../../components/admin/firms/FirmForm';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Eye, Plus, X } from 'lucide-react';
import { useFirms } from '../../../context/FirmsContext';

const FirmsPage = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { firms, loading, fetchFirms, setFirms, totalFirms } = useFirms();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingFirm, setEditingFirm] = useState(null);

    // Pagination state
    const [page, setPage] = useState(1);
    const limit = 10; // firms per page
    const totalPages = Math.ceil(totalFirms / limit);

    useEffect(() => {
        fetchFirms(page, limit); // fetch firms for the current page
    }, [page]);

    // Handle Edit
    const handleEdit = (firm) => {
        setEditingFirm(firm);
        setIsFormOpen(true);
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this firm?")) return;

        try {
            const token = await getAccessTokenSilently();
            await deleteFirm(id, token);
            setFirms(firms.filter(f => f._id !== id));
            alert("Firm deleted successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to delete firm");
        }
    };

    // Open Add Form
    const openAddForm = () => {
        setEditingFirm(null);
        setIsFormOpen(true);
    };

    // Close form and refresh list on save
    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setEditingFirm(null);
        fetchFirms(page, limit);
    };

    // Pagination handlers
    const prevPage = () => setPage((p) => Math.max(p - 1, 1));
    const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));

    useEffect(() => {
        fetchFirms(page);
    }, [page]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Firms</h1>
                <button
                    onClick={openAddForm}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    Add New Firm
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-400 italic">Loading firms...</div>
            ) : firms.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No firms found. Click <span className="font-semibold text-blue-500">"Add New Firm"</span> to create one.
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-2xl border border-gray-800/30 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                        <table className="min-w-full text-sm text-gray-300">
                            <thead>
                                <tr className="border-b border-gray-700/60 text-gray-400 uppercase text-xs tracking-wider">
                                    <th className="px-6 py-4 text-left font-semibold">Logo</th>
                                    <th className="px-6 py-4 text-left font-semibold">Firm Name</th>
                                    <th className="px-6 py-4 text-left font-semibold">CEO</th>
                                    <th className="px-6 py-4 text-left font-semibold">Website</th>
                                    <th className="px-6 py-4 text-left font-semibold">Platforms</th>
                                    <th className="px-6 py-4 text-left font-semibold text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {firms.map((firm) => (
                                    <tr key={firm._id} className="group border-b border-gray-800/40 hover:bg-white/5 transition-all duration-200">
                                        <td className="px-6 py-4">
                                            {firm.logo?.url ? (
                                                <img
                                                    src={firm.logo.url}
                                                    alt={firm.firmName || "logo"}
                                                    className="h-12 w-12 object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 border border-gray-700 rounded-lg flex items-center justify-center text-gray-600">—</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-semibold text-white">{firm.firmName}</div>
                                                {firm.tagline && <div className="text-xs text-gray-500 mt-1">{firm.tagline}</div>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{firm.ceoName || "—"}</td>
                                        <td className="px-6 py-4">
                                            {firm.website ? (
                                                <a
                                                    href={firm.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-300 transition-colors underline-offset-2 hover:underline"
                                                >
                                                    {firm.website.replace(/^https?:\/\//, '').split('/')[0]}
                                                </a>
                                            ) : (
                                                <span className="text-gray-500">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {firm.platforms?.length ? firm.platforms.join(", ") : "—"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => handleEdit(firm)} title="Edit" className="text-blue-400 hover:text-blue-300 transition-colors">
                                                    <Pencil size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(firm._id)} title="Delete" className="text-red-400 hover:text-red-300 transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                                <button onClick={() => handleEdit(firm)} title="View / Edit" className="text-green-400 hover:text-green-300 transition-colors">
                                                    <Eye size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={prevPage}
                            disabled={page === 1}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition"
                        >
                            Previous
                        </button>

                        <span className="text-gray-300">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            onClick={nextPage}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto border border-gray-800">
                        {/* Header */}
                        <div className="flex justify-between items-center sticky top-0 bg-gray-900/70 backdrop-blur-md p-5 border-b border-gray-800 rounded-t-2xl z-10">
                            <h2 className="text-2xl font-bold text-white tracking-wide">
                                {editingFirm ? "Edit Firm" : "Add New Firm"}
                            </h2>
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 transition-all duration-300"
                            >
                                <X size={22} className="text-gray-300 group-hover:text-white transform group-hover:rotate-90 transition-transform duration-300" />
                                <span className="absolute opacity-0 group-hover:opacity-100 text-xs text-white bg-black px-2 py-1 rounded-md -bottom-8 transition-all duration-300">
                                    Close
                                </span>
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            <FirmForm initialData={editingFirm} onSuccess={handleFormSuccess} onCancel={() => setIsFormOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FirmsPage;
