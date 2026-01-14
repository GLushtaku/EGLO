"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  apiService,
  isApiError,
} from "./api";

type AuthState = {
  user: AuthResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const router = useRouter();
  const { locale } = useParams() as { locale: string };

  // Initialize from localStorage
  useEffect(() => {
    const token = apiService.getToken();
    if (!token) {
      setAuth((s) => ({ ...s, isAuthenticated: false, isLoading: false }));
      return;
    }

    // Debug: Log token structure
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 [useAuth] Token from localStorage:', token);
      console.log('🔍 [useAuth] User:', token.user);
      console.log('🔍 [useAuth] Roles:', token.user?.roles);
    }

    setAuth({
      user: token.user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  }, []);

  // Login
  const login = useCallback(
    async ({
      email,
      password,
      rememberMe,
    }: {
      email: string;
      password: string;
      rememberMe?: boolean;
    }) => {
      setAuth((s) => ({ ...s, isLoading: true, error: null }));
      try {
        const res: AuthResponse = await apiService.login({
          email: email,
          password: password,
          rememberMe,
        });
        
        apiService.setToken(res);
        setAuth({
          user: res.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        router.push(`/${locale}`);
        return res;
      } catch (err: unknown) {
        const msg = isApiError(err) ? err.message : "Login failed. Please try again.";
        setAuth((s) => ({ ...s, isLoading: false, error: msg }));
        throw err;
      }
    },
    [router, locale]
  );

  // Signup
  const signup = useCallback(
    async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      setAuth((s) => ({ ...s, isLoading: true, error: null }));
      try {
        const res = await apiService.signup({
          email: email,
          password: password,
        });
        setAuth((s) => ({ ...s, isLoading: false, error: null }));
        router.push(`/${locale}/login`);
        return res;
      } catch (err: unknown) {
        const msg = isApiError(err) ? err.message : "Signup failed. Please try again.";
        setAuth((s) => ({ ...s, isLoading: false, error: msg }));
        throw err;
      }
    },
    [router, locale]
  );

  // Logout
  const logout = useCallback(() => {
    try {
      apiService.logout();
    } finally {
      apiService.removeToken();
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      router.push(`/${locale}/login`);
    }
  }, [router, locale]);

  const clearError = useCallback(() => {
    setAuth((s) => ({ ...s, error: null }));
  }, []);

  return { ...auth, login, signup, logout, clearError };
}
