/**
 * ============================================================================
 * FILE: auth.ts
 * ============================================================================
 *
 * PURPOSE:
 *   Authentication API functions for login, logout, registration, and
 *   session management.
 *
 * COMPONENT: Frontend
 * MODULE: API Client
 * LAYER: INFRASTRUCTURE
 *
 * DEPENDENCIES:
 *   - ./client.ts: Base API client
 *   - ./endpoints.ts: URL constants
 *   - ./types.ts: Type definitions
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
 * Login:
 *   import { authApi } from '@/lib/api/auth';
 *   const { user, accessToken } = await authApi.login({
 *     email: 'user@example.com',
 *     password: 'password123'
 *   });
 *
 * Check session:
 *   const user = await authApi.getCurrentUser();
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2025 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

import { apiClient, setAccessToken, setRefreshToken, clearTokens } from './client';
import { ENDPOINTS } from './endpoints';
import type {
  LoginRequest,
  LoginResponse,
  AuthUser,
  RefreshResponse,
} from './types';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Registration request payload
 */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'merchant';
}

/**
 * Password reset request
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Password reset confirmation
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// ============================================================================
// AUTH API FUNCTIONS
// ============================================================================

/**
 * authApi
 *
 * @description
 *   Authentication API functions for login, registration, and session management.
 */
export const authApi = {
  /**
   * login
   *
   * @description
   *   Authenticate user with email and password.
   *   Sets the access token on successful login.
   *
   * @param credentials - Login credentials
   * @returns Login response with tokens and user data
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      credentials,
      { skipAuth: true }
    );

    // Store tokens for session persistence
    setAccessToken(response.accessToken);
    if (response.refreshToken) {
      setRefreshToken(response.refreshToken);
    }

    return response;
  },

  /**
   * logout
   *
   * @description
   *   Log out the current user and clear all tokens.
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Always clear tokens, even if request fails
      clearTokens();
    }
  },

  /**
   * register
   *
   * @description
   *   Register a new user account.
   *
   * @param data - Registration data
   * @returns Login response (auto-login after registration)
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      ENDPOINTS.AUTH.REGISTER,
      data,
      { skipAuth: true }
    );

    // Store tokens for session persistence
    setAccessToken(response.accessToken);
    if (response.refreshToken) {
      setRefreshToken(response.refreshToken);
    }

    return response;
  },

  /**
   * getCurrentUser
   *
   * @description
   *   Get the currently authenticated user's data.
   *
   * @returns Current user or null if not authenticated
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      return await apiClient.get<AuthUser>(ENDPOINTS.AUTH.ME);
    } catch (error) {
      // Return null if not authenticated
      return null;
    }
  },

  /**
   * refreshToken
   *
   * @description
   *   Refresh the access token using the refresh token cookie.
   *
   * @returns New access token and expiry
   */
  async refreshToken(): Promise<RefreshResponse> {
    const response = await apiClient.post<RefreshResponse>(
      ENDPOINTS.AUTH.REFRESH,
      undefined,
      { skipAuth: true }
    );

    // Store tokens for session persistence
    setAccessToken(response.accessToken);
    if (response.refreshToken) {
      setRefreshToken(response.refreshToken);
    }

    return response;
  },

  /**
   * forgotPassword
   *
   * @description
   *   Request a password reset email.
   *
   * @param data - Email address
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, data, {
      skipAuth: true,
    });
  },

  /**
   * resetPassword
   *
   * @description
   *   Reset password using the token from email.
   *
   * @param data - Reset token and new password
   */
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, data, {
      skipAuth: true,
    });
  },

  /**
   * isAuthenticated
   *
   * @description
   *   Check if there's a valid access token.
   *   Note: This doesn't verify the token, just checks existence.
   *
   * @returns True if access token exists
   */
  isAuthenticated(): boolean {
    return !!apiClient;
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export default authApi;
