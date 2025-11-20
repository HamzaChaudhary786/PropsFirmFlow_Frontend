'use client';

import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

function RedirectHandler() {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();
  const pathname = usePathname();

  // Only redirect from public pages
  const redirectAllowedPaths = ['/', '/login', '/auth/callback'];

  useEffect(() => {
    if (isLoading) return;

    if (!redirectAllowedPaths.includes(pathname)) return;

    if (isAuthenticated) {
      // ❌ Remove userType check
      // const userType = user?.[`${process.env.NEXT_PUBLIC_CLIENT_URL}/userType`] ?? 'user';
      // const target = userType === 'admin' ? '/admin/dashboard' : '/user/dashboard';

      // ✅ Always redirect to public dashboard
      const target = '/dashboard';
      router.replace(target);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  return null;
}

export default function Providers({ children }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri:
          typeof window !== 'undefined' ? window.location.origin : '',
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: 'openid profile email',
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      useRefreshTokensFallback={false}
    >
      <RedirectHandler />
      {children}
    </Auth0Provider>
  );
}
