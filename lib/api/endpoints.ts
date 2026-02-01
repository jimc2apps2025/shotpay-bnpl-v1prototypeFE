/**
 * ============================================================================
 * FILE: endpoints.ts
 * ============================================================================
 *
 * PURPOSE:
 *   Centralized API endpoint URL constants. All API paths are defined here
 *   to ensure consistency and easy updates when endpoints change.
 *
 * COMPONENT: Frontend
 * MODULE: API Client
 * LAYER: INFRASTRUCTURE
 *
 * DEPENDENCIES:
 *   None (constants file)
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
 * Using endpoints in API calls:
 *   import { ENDPOINTS } from '@/lib/api/endpoints';
 *   const response = await client.get(ENDPOINTS.AUTH.ME);
 *   const orders = await client.get(ENDPOINTS.ORDERS.LIST);
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2025 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Base API URL from environment or default
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// ============================================================================
// ENDPOINT DEFINITIONS
// ============================================================================

/**
 * All API endpoints organized by resource
 */
export const ENDPOINTS = {
  // --------------------------------------------------------------------------
  // Health & Status
  // --------------------------------------------------------------------------
  HEALTH: {
    LIVE: '/health/live',
    READY: '/health/ready',
  },

  // --------------------------------------------------------------------------
  // Authentication
  // --------------------------------------------------------------------------
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // --------------------------------------------------------------------------
  // KYC Verification
  // --------------------------------------------------------------------------
  KYC: {
    /** Create a new KYC verification session */
    CREATE_SESSION: '/kyc/session',
    /** Get current KYC status */
    STATUS: '/kyc/status',
    /** Webhook endpoint (backend only) */
    WEBHOOK: '/kyc/webhook',
  },

  // --------------------------------------------------------------------------
  // Orders
  // --------------------------------------------------------------------------
  ORDERS: {
    /** List orders with pagination */
    LIST: '/orders',
    /** Get order by ID */
    GET: (id: string) => `/orders/${id}`,
    /** Create a new order */
    CREATE: '/orders',
    /** Update order status */
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  },

  // --------------------------------------------------------------------------
  // BNPL Contracts
  // --------------------------------------------------------------------------
  CONTRACTS: {
    /** List contracts with pagination */
    LIST: '/contracts',
    /** Get contract by ID */
    GET: (id: string) => `/contracts/${id}`,
    /** Get contract schedule */
    SCHEDULE: (id: string) => `/contracts/${id}/schedule`,
    /** Capture down payment */
    CAPTURE: (id: string) => `/contracts/${id}/capture`,
  },

  // --------------------------------------------------------------------------
  // BNPL Decision
  // --------------------------------------------------------------------------
  BNPL: {
    /** Check BNPL eligibility and get decision */
    DECISION: '/bnpl/decision',
    /** Preview payment schedule */
    PREVIEW: '/bnpl/preview',
  },

  // --------------------------------------------------------------------------
  // Refunds
  // --------------------------------------------------------------------------
  REFUNDS: {
    /** List refunds */
    LIST: '/refunds',
    /** Get refund by ID */
    GET: (id: string) => `/refunds/${id}`,
    /** Create a refund request */
    CREATE: '/refunds',
    /** Get refund status */
    STATUS: (id: string) => `/refunds/${id}/status`,
  },

  // --------------------------------------------------------------------------
  // Merchant (Dashboard)
  // --------------------------------------------------------------------------
  MERCHANT: {
    /** Get merchant profile */
    PROFILE: '/merchant/profile',
    /** Get dashboard stats */
    STATS: '/merchant/stats',
    /** List merchant orders */
    ORDERS: '/merchant/orders',
    /** List merchant contracts */
    CONTRACTS: '/merchant/contracts',
    /** Get payout information */
    PAYOUTS: '/merchant/payouts',
    /** Update merchant settings */
    SETTINGS: '/merchant/settings',
    /** Connect platform (Shopify/WooCommerce) */
    CONNECT_PLATFORM: '/merchant/platform/connect',
  },

  // --------------------------------------------------------------------------
  // Customers (for Merchant Dashboard)
  // --------------------------------------------------------------------------
  CUSTOMERS: {
    /** List customers */
    LIST: '/customers',
    /** Get customer by ID */
    GET: (id: string) => `/customers/${id}`,
    /** Get customer contracts */
    CONTRACTS: (id: string) => `/customers/${id}/contracts`,
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * buildUrl
 *
 * @description
 *   Build a full URL with the API base and optional query parameters.
 *
 * @param endpoint - The API endpoint path
 * @param params - Optional query parameters
 * @returns Full URL string
 *
 * @example
 *   buildUrl(ENDPOINTS.ORDERS.LIST, { page: 1, limit: 10 })
 *   // => "http://localhost:3001/api/v1/orders?page=1&limit=10"
 */
export function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(endpoint, API_BASE_URL);

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
 * getFullUrl
 *
 * @description
 *   Get the full URL for an endpoint (base + path).
 *
 * @param endpoint - The API endpoint path
 * @returns Full URL string
 */
export function getFullUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}
