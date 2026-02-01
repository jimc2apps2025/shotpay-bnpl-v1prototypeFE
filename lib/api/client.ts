/**
 * ============================================================================
 * FILE: client.ts
 * ============================================================================
 *
 * PURPOSE:
 *   Core API client with fetch wrapper, authentication handling, and error
 *   management. Provides a consistent interface for all API interactions.
 *
 * COMPONENT: Frontend
 * MODULE: API Client
 * LAYER: INFRASTRUCTURE
 *
 * DEPENDENCIES:
 *   - ./types.ts: Type definitions
 *   - ./endpoints.ts: URL constants
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
 * Making API calls:
 *   import { apiClient } from '@/lib/api/client';
 *
 *   // GET request
 *   const orders = await apiClient.get<Order[]>('/orders');
 *
 *   // POST request
 *   const result = await apiClient.post<LoginResponse>('/auth/login', {
 *     email: 'user@example.com',
 *     password: 'password123'
 *   });
 *
 * ============================================================================
 * KEY FEATURES:
 * ============================================================================
 * - Automatic token injection
 * - Token refresh on 401 errors
 * - Request/response error handling
 * - Request timeout support
 * - Retry logic for network errors
 * - Type-safe responses
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2025 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

import { API_BASE_URL, ENDPOINTS } from "./endpoints";
import { ApiError, ApiErrorResponse, ApiResponse } from "./types";

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Default request timeout in milliseconds
 */
const DEFAULT_TIMEOUT = 30000;

/**
 * Maximum retry attempts for failed requests
 */
const MAX_RETRIES = 3;

/**
 * Retry delay in milliseconds (exponential backoff)
 */
const RETRY_DELAY = 1000;

// ============================================================================
// TOKEN MANAGEMENT
// ============================================================================

/**
 * In-memory token storage (more secure than localStorage for access tokens)
 */
let accessToken: string | null = null;

/**
 * Token refresh promise to prevent multiple simultaneous refresh requests
 */
let refreshPromise: Promise<string | null> | null = null;

/**
 * Local storage key for refresh token
 * Note: In production, consider using httpOnly cookies for refresh tokens
 */
const REFRESH_TOKEN_KEY = "shotpay_refresh_token";

/**
 * Set the access token
 */
export function setAccessToken(token: string | null): void {
  accessToken = token;
}

/**
 * Get the current access token
 */
export function getAccessToken(): string | null {
  return accessToken;
}

/**
 * Set the refresh token (persisted to localStorage)
 */
export function setRefreshToken(token: string | null): void {
  if (typeof window === "undefined") return;

  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

/**
 * Get the refresh token from localStorage
 */
export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Clear all tokens (logout)
 */
export function clearTokens(): void {
  accessToken = null;
  setRefreshToken(null);
}

// ============================================================================
// REQUEST HELPERS
// ============================================================================

/**
 * RequestOptions
 *
 * @description
 *   Options for API requests extending standard fetch options.
 */
export interface RequestOptions extends Omit<RequestInit, "body"> {
  /** Request body (will be JSON stringified) */
  body?: unknown;
  /** Query parameters */
  params?: Record<string, string | number | boolean | undefined>;
  /** Request timeout in ms */
  timeout?: number;
  /** Skip authentication header */
  skipAuth?: boolean;
  /** Number of retry attempts */
  retries?: number;
}

/**
 * Build full URL with query parameters
 */
function buildRequestUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  // Concatenate base URL with endpoint directly (new URL() doesn't work correctly
  // with absolute paths like '/auth/login' as it ignores the base URL path)
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  const url = new URL(fullUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Create abort controller with timeout
 */
function createTimeoutController(timeout: number): {
  controller: AbortController;
  timeoutId: NodeJS.Timeout;
} {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return { controller, timeoutId };
}

/**
 * Parse error response from API
 */
async function parseErrorResponse(response: Response): Promise<ApiError> {
  try {
    const data = (await response.json()) as ApiErrorResponse;
    return new ApiError(
      data.error?.message || "Unknown error",
      data.error?.code || "UNKNOWN_ERROR",
      response.status,
      data.error?.details,
      data.error?.requestId,
    );
  } catch {
    return new ApiError(
      response.statusText || "Request failed",
      "REQUEST_FAILED",
      response.status,
    );
  }
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================================
// TOKEN REFRESH
// ============================================================================

/**
 * Attempt to refresh the access token
 */
async function refreshAccessToken(): Promise<string | null> {
  // If already refreshing, wait for that promise
  if (refreshPromise) {
    return refreshPromise;
  }

  // Get the stored refresh token
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    return null;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        clearTokens();
        return null;
      }

      const data = await response.json();
      const newAccessToken = data.data?.accessToken;
      const newRefreshToken = data.data?.refreshToken;

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        // Update refresh token if a new one was issued
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }
        return newAccessToken;
      }

      return null;
    } catch {
      clearTokens();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ============================================================================
// CORE REQUEST FUNCTION
// ============================================================================

/**
 * request
 *
 * @description
 *   Core request function with authentication, retry logic, and error handling.
 *
 * @param method - HTTP method
 * @param endpoint - API endpoint path
 * @param options - Request options
 * @returns Parsed response data
 *
 * @throws ApiError on request failure
 */
async function request<T>(
  method: string,
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    body,
    params,
    timeout = DEFAULT_TIMEOUT,
    skipAuth = false,
    retries = 0,
    headers: customHeaders,
    ...fetchOptions
  } = options;

  const url = buildRequestUrl(endpoint, params);
  const { controller, timeoutId } = createTimeoutController(timeout);

  // Build headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(customHeaders as Record<string, string>),
  };

  // Add auth header if we have a token and not skipped
  if (!skipAuth && accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      credentials: "include", // Include cookies for refresh token
    });

    clearTimeout(timeoutId);

    // Handle 401 - attempt token refresh
    if (response.status === 401 && !skipAuth) {
      const newToken = await refreshAccessToken();

      if (newToken) {
        // Retry the request with new token
        return request<T>(method, endpoint, {
          ...options,
          retries: retries + 1,
        });
      }

      // Token refresh failed - throw auth error
      throw new ApiError("Session expired", "SESSION_EXPIRED", 401);
    }

    // Handle other error responses
    if (!response.ok) {
      throw await parseErrorResponse(response);
    }

    // Parse successful response
    const data = (await response.json()) as ApiResponse<T>;
    return data.data;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle abort (timeout)
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timeout", "TIMEOUT", 408);
    }

    // Handle network errors with retry
    if (
      error instanceof TypeError &&
      error.message.includes("fetch") &&
      retries < MAX_RETRIES
    ) {
      await sleep(RETRY_DELAY * Math.pow(2, retries));
      return request<T>(method, endpoint, {
        ...options,
        retries: retries + 1,
      });
    }

    // Re-throw ApiErrors as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Wrap unknown errors
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error",
      "UNKNOWN_ERROR",
      500,
    );
  }
}

// ============================================================================
// API CLIENT INTERFACE
// ============================================================================

/**
 * apiClient
 *
 * @description
 *   Main API client with typed HTTP method helpers.
 *
 * @example
 *   const orders = await apiClient.get<Order[]>('/orders');
 *   const user = await apiClient.post<User>('/auth/login', credentials);
 */
export const apiClient = {
  /**
   * GET request
   */
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>("GET", endpoint, options);
  },

  /**
   * POST request
   */
  post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return request<T>("POST", endpoint, { ...options, body });
  },

  /**
   * PUT request
   */
  put<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return request<T>("PUT", endpoint, { ...options, body });
  },

  /**
   * PATCH request
   */
  patch<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return request<T>("PATCH", endpoint, { ...options, body });
  },

  /**
   * DELETE request
   */
  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>("DELETE", endpoint, options);
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export default apiClient;
