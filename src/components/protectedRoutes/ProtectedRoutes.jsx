'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  const userType = user?.[`${process.env.NEXT_PUBLIC_CLIENT_URL}/userType`] ?? 'user';

  useEffect(() => {
    if (isLoading) return;

    // Not logged in → redirect to login
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    // Logged in but not allowed → redirect to proper dashboard
    if (!allowedRoles.includes(userType)) {
      if (userType === 'admin') {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/user/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, userType, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading…
      </div>
    );
  }

  // If not authenticated or role not allowed, render nothing
  if (!isAuthenticated || !allowedRoles.includes(userType)) return null;

  return children;
}
