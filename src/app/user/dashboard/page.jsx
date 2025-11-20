// app/dashboard/page.jsx
'use client';

import ProtectedRoute from '../../../components/protectedRoutes/ProtectedRoutes';
import { useAuth0 } from '@auth0/auth0-react';

export default function UserDashboard() {
  const { user, logout } = useAuth0();

  return (
    <ProtectedRoute allowedRoles={['user']}>
      <div className="min-h-screen bg-linear-to-tl from-black/80  to-gray-800 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Trader Dashboard</h1>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition"
            >
              Logout
            </button>
          </header>

          <p className="text-xl text-blue-300 mb-8">
            Welcome, <span className="font-medium">{user?.name ?? user?.email}</span>
          </p>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">Your Account</h3>
            <div className="space-y-2 text-sm">
              <p>Email: <span className="text-white">{user?.email}</span></p>
              <p>Role: <span className="text-green-400 font-medium">Trader</span></p>
            </div>
          </div>

          <footer className="mt-6 text-xs text-green-400">Profile synced</footer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
