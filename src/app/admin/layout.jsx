// app/admin/layout.tsx
'use client';

import ProtectedRoute from '../../components/protectedRoutes/ProtectedRoutes';
import { useAuth0 } from '@auth0/auth0-react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Building2, Users, Trophy, LogOut } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/admin' },
  { id: 'firms', label: 'Firms', icon: Building2, href: '/admin/firms' },
  { id: 'communities', label: 'Communities', icon: Users, href: '/admin/communities' },
  { id: 'challenges', label: 'Challenges', icon: Trophy, href: '/admin/challenges' },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth0();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  // Determine active tab from current path
  const activeId = menuItems.find(item => item.href === pathname)?.id || 'dashboard';

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-linear-to-br from-purple-900 via-black to-black text-white flex">
        {/* Sidebar */}
        <aside className="w-80 bg-gray-900 border-r border-purple-800 p-8 flex flex-col">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-purple-400">Admin Panel</h1>
            <p className="text-sm text-purple-300 mt-2">
              Hello, {user?.name || user?.email}
            </p>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/20'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={22} />
                  <span className="font-semibold text-lg">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-gray-700 pt-6 mt-8">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-5 py-4 text-red-400 hover:bg-gray-800 rounded-xl transition"
            >
              <LogOut size={22} />
              <span className="font-semibold text-lg">Logout</span>
            </button>
          </div>

          <footer className="mt-8 text-center text-xs text-green-400 font-medium">
            Admin Access Confirmed
          </footer>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}