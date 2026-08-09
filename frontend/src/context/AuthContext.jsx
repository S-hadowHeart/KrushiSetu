import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/auth.api';
import { profileApi } from '../api/profile.api';
import { setAccessToken } from '../lib/tokenStore';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // 'loading' = attempting silent session restore on first paint
  const [status, setStatus] = useState('loading');

  // On first load, try to silently restore a session using the httpOnly
  // refresh-token cookie. If there's no valid cookie this simply fails and we
  // fall back to "logged out" — no error is shown to the user.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { token } = await authApi.refresh();
        if (cancelled) return;
        setAccessToken(token);
        const { user: profile } = await profileApi.getProfile();
        if (cancelled) return;
        setUser(profile);
        setStatus('authenticated');
      } catch {
        if (cancelled) return;
        setAccessToken(null);
        setUser(null);
        setStatus('unauthenticated');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user: loggedInUser } = await authApi.login({ email, password });
    setAccessToken(token);
    setUser(loggedInUser);
    setStatus('authenticated');
    return loggedInUser;
  }, []);

  const register = useCallback(async (payload) => {
    return authApi.register(payload);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setAccessToken(null);
      setUser(null);
      setStatus('unauthenticated');
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    const { user: profile } = await profileApi.getProfile();
    setUser(profile);
    return profile;
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      isAuthenticated: status === 'authenticated' && !!user,
      isLoading: status === 'loading',
      login,
      register,
      logout,
      refreshProfile,
    }),
    [user, status, login, register, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
