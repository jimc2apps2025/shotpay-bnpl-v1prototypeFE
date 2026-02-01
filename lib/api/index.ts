/**
 * ============================================================================
 * FILE: index.ts
 * ============================================================================
 *
 * PURPOSE:
 *   Central export point for the API client module. Provides a clean interface
 *   for importing API functionality throughout the frontend application.
 *
 * COMPONENT: Frontend
 * MODULE: API Client
 * LAYER: INFRASTRUCTURE
 *
 * DEPENDENCIES:
 *   - All API module files in this directory
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
 * Import specific APIs:
 *   import { authApi, ordersApi, kycApi } from '@/lib/api';
 *
 * Import types:
 *   import type { OrderDetails, KycStatus, ApiError } from '@/lib/api';
 *
 * Import client directly:
 *   import { apiClient } from '@/lib/api';
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2025 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

// ============================================================================
// CLIENT EXPORTS
// ============================================================================

export {
  apiClient,
  setAccessToken,
  getAccessToken,
  clearTokens,
} from './client';

export type { RequestOptions } from './client';

// ============================================================================
// ENDPOINT EXPORTS
// ============================================================================

export { ENDPOINTS, API_BASE_URL, buildUrl, getFullUrl } from './endpoints';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export {
  ApiError,
} from './types';

export type {
  // Response types
  ApiResponse,
  ApiErrorResponse,
  ApiResult,

  // Pagination
  PaginationParams,
  PaginatedData,

  // Auth types
  LoginRequest,
  LoginResponse,
  AuthUser,
  RefreshResponse,

  // KYC types
  KycStatus,
  KycSessionResponse,
  KycStatusResponse,

  // Order types
  OrderSummary,
  OrderDetails,
  OrderItem,
  ShippingAddress,
  BillingAddress,

  // Contract types
  ContractSummary,
  ContractDetails,
  Installment,

  // BNPL types
  BnplDecisionRequest,
  BnplDecisionResponse,
  InstallmentSchedule,

  // Merchant types
  MerchantStats,
  PayoutInfo,
} from './types';

// ============================================================================
// API MODULE EXPORTS
// ============================================================================

export { authApi } from './auth';
export type { RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from './auth';

export { ordersApi } from './orders';
export type { CreateOrderRequest, OrderItemInput, ShippingInput, SchedulePreviewRequest } from './orders';

export { kycApi, getKycStatusLabel, getKycStatusColor } from './kyc';

// ============================================================================
// CONVENIENCE RE-EXPORTS
// ============================================================================

/**
 * All API modules bundled together
 */
export const api = {
  auth: (await import('./auth')).authApi,
  orders: (await import('./orders')).ordersApi,
  kyc: (await import('./kyc')).kycApi,
};
