// lib/auth.js
import { useAuth0 } from '@auth0/auth0-react';

export const useAuth = () => {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  // Define admin emails (replace with Auth0 metadata or DB in production)
  const adminEmails = ['hmzsattar99@gmail.com','admin@example.com', 'super@company.com'];

  const getUserType = (email) => {
    return adminEmails.includes(email) ? 'admin' : 'user';
  };

  const user = isAuthenticated && auth0User?.email
    ? {
        email: auth0User.email,
        userType: getUserType(auth0User.email),
        name: auth0User.name || auth0User.email.split('@')[0],
        picture: auth0User.picture,
      }
    : null;

  const loginWithGoogle = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
      },
    });
  };

  const loginWithEmailPassword = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signin',
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: { returnTo: window.location.origin },
    });
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    loginWithGoogle,
    loginWithEmailPassword,
    logout: handleLogout,
    getToken: getAccessTokenSilently,
  };
};