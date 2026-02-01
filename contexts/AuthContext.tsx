/**
 * ============================================================================
 * FILE: AuthContext.tsx
 * ============================================================================
 *
 * PURPOSE:
 *   React context for managing authentication state throughout the application.
 *   Handles login, logout, session persistence, and provides user data to
 *   child components.
 *
 * COMPONENT: Frontend
 * MODULE: Contexts
 * LAYER: PRESENTATION
 *
 * DEPENDENCIES:
 *   - react: React hooks and context
 *   - @/lib/api: API client and auth functions
 *
 * ============================================================================
 * VERSION HISTORY:
 * ============================================================================
 * Version  | Date       | Author        | Change Description
 * ---------|------------|---------------|------------------------------------
 * 1.0.0    | 2025-01-31 | Drew Thomsen  | Initial implementation
 *
 * ============================================================================
 * AUTHOR INFORMATION:
 * ============================================================================
 * Original Author: Drew Thomsen
 * Email: drew@shotpay.com
 * Created: 2025-01-31
 *
 * Last Modified By: Drew Thomsen
 * Last Modified: 2025-01-31
 *
 * ============================================================================
 * USAGE EXAMPLES:
 * ============================================================================
 * Wrap app with provider:
 *   <AuthProvider>
 *     <App />
 *   </AuthProvider>
 *
 * Use in components:
 *   const { user, login, logout, isAuthenticated } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return <LoginForm onSubmit={login} />;
 *   }
 *
 *   return <Dashboard user={user} onLogout={logout} />;
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2025 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  authApi,
  setAccessToken,
  clearTokens,
  ApiError,
} from '@/lib/api';
import type { AuthUser, LoginRequest } from '@/lib/api';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Authentication state
 */
export interface AuthState {
  /** Currently authenticated user, null if not authenticated */
  user: AuthUser | null;
  /** Whether authentication check is in progress */
  isLoading: boolean;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Last authentication error */
  error: string | null;
}

/**
 * Authentication context value
 */
export interface AuthContextValue extends AuthState {
  /** Log in with email and password */
  login: (credentials: LoginRequest) => Promise<void>;
  /** Log out the current user */
  logout: () => Promise<void>;
  /** Refresh the current session */
  refreshSession: () => Promise<void>;
  /** Clear any authentication errors */
  clearError: () => void;
  /** Check if user has a specific role */
  hasRole: (role: AuthUser['role']) => boolean;
  /** Check if user is a customer */
  isCustomer: boolean;
  /** Check if user is a merchant */
  isMerchant: boolean;
  /** Check if user is an admin */
  isAdmin: boolean;
}

// ============================================================================
// CONTEXT
// ============================================================================

/**
 * Default context value
 */
const defaultValue: AuthContextValue = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  login: async () => {},
  logout: async () => {},
  refreshSession: async () => {},
  clearError: () => {},
  hasRole: () => false,
  isCustomer: false,
  isMerchant: false,
  isAdmin: false,
};

/**
 * Auth context
 */
const AuthContext = createContext<AuthContextValue>(defaultValue);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

/**
 * AuthProvider props
 */
export interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider
 *
 * @description
 *   Provides authentication state and methods to child components.
 *   Automatically checks for existing session on mount.
 */
export function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  // State
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Derived state
  const isAuthenticated = user !== null;
  const isCustomer = user?.role === 'customer';
  const isMerchant = user?.role === 'merchant';
  const isAdmin = user?.role === 'admin';

  /**
   * Check for existing session on mount
   */
  useEffect(() => {
    checkSession();
  }, []);

  /**
   * Check for existing session
   */
  const checkSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const currentUser = await authApi.getCurrentUser();
      setUser(currentUser);
    } catch {
      // Session doesn't exist or is invalid
      setUser(null);
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Log in with credentials
   */
  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authApi.login(credentials);
      setUser(response.user);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Login failed. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Log out current user
   */
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authApi.logout();
    } catch {
      // Ignore logout errors
    } finally {
      setUser(null);
      clearTokens();
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh the current session
   */
  const refreshSession = useCallback(async () => {
    try {
      const response = await authApi.refreshToken();
      setAccessToken(response.accessToken);
      // Re-fetch user data
      const currentUser = await authApi.getCurrentUser();
      setUser(currentUser);
    } catch {
      // Refresh failed - log out
      setUser(null);
      clearTokens();
    }
  }, []);

  /**
   * Clear authentication error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Check if user has a specific role
   */
  const hasRole = useCallback(
    (role: AuthUser['role']): boolean => {
      return user?.role === role;
    },
    [user]
  );

  /**
   * Context value
   */
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      error,
      login,
      logout,
      refreshSession,
      clearError,
      hasRole,
      isCustomer,
      isMerchant,
      isAdmin,
    }),
    [
      user,
      isLoading,
      isAuthenticated,
      error,
      login,
      logout,
      refreshSession,
      clearError,
      hasRole,
      isCustomer,
      isMerchant,
      isAdmin,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * useAuth
 *
 * @description
 *   Hook to access authentication context.
 *   Must be used within an AuthProvider.
 *
 * @returns Authentication context value
 * @throws Error if used outside of AuthProvider
 *
 * @example
 *   const { user, login, logout, isAuthenticated } = useAuth();
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

/**
 * RequireAuth props
 */
export interface RequireAuthProps {
  children: React.ReactNode;
  /** Fallback component when not authenticated */
  fallback?: React.ReactNode;
  /** Required role (optional) */
  role?: AuthUser['role'];
  /** Redirect path when not authenticated */
  redirectTo?: string;
}

/**
 * RequireAuth
 *
 * @description
 *   Component that only renders children if user is authenticated.
 *   Optionally requires a specific role.
 *
 * @example
 *   <RequireAuth fallback={<LoginPage />}>
 *     <ProtectedContent />
 *   </RequireAuth>
 *
 *   <RequireAuth role="merchant" fallback={<AccessDenied />}>
 *     <MerchantDashboard />
 *   </RequireAuth>
 */
export function RequireAuth({
  children,
  fallback = null,
  role,
}: RequireAuthProps): React.ReactElement | null {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  // Check authentication
  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  // Check role if specified
  if (role && !hasRole(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * RequireGuest props
 */
export interface RequireGuestProps {
  children: React.ReactNode;
  /** Fallback component when authenticated */
  fallback?: React.ReactNode;
}

/**
 * RequireGuest
 *
 * @description
 *   Component that only renders children if user is NOT authenticated.
 *   Useful for login/signup pages.
 *
 * @example
 *   <RequireGuest fallback={<Navigate to="/dashboard" />}>
 *     <LoginPage />
 *   </RequireGuest>
 */
export function RequireGuest({
  children,
  fallback = null,
}: RequireGuestProps): React.ReactElement | null {
  const { isAuthenticated, isLoading } = useAuth();

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  // Show fallback if authenticated
  if (isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default AuthContext;
