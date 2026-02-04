/**
 * ============================================================================
 * FILE: types.ts
 * ============================================================================
 *
 * PURPOSE:
 *   Type definitions for API responses, errors, and common structures.
 *   Provides type safety for all API interactions in the frontend.
 *
 * COMPONENT: Frontend
 * MODULE: API Client
 * LAYER: INFRASTRUCTURE
 *
 * DEPENDENCIES:
 *   None (base types file)
 *
 * ============================================================================
 * VERSION HISTORY:
 * ============================================================================
 * Version  | Date       | Author        | Change Description
 * ---------|------------|---------------|------------------------------------
 * 1.0.0    | 2025-01-31 | Drew Thomsen  | Initial implementation
 * 1.1.0    | 2026-02-04 | Drew Thomsen  | SP-002: Align KycStatus with backend
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
 * LICENSE: Proprietary
 * Copyright (c) 2025 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Standard API success response wrapper
 */
export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
    requestId?: string;
  };
}

/**
 * Union type for all API responses
 */
export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

// ============================================================================
// ERROR TYPES
// ============================================================================

/**
 * Custom API error class with typed error data
 */
export class ApiError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly details?: Record<string, string[]>;
  public readonly requestId?: string;

  constructor(
    message: string,
    code: string,
    status: number,
    details?: Record<string, string[]>,
    requestId?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
    this.requestId = requestId;
  }

  /**
   * Check if error is due to authentication failure
   */
  isAuthError(): boolean {
    return this.status === 401 || this.code === 'UNAUTHORIZED';
  }

  /**
   * Check if error is due to forbidden access
   */
  isForbidden(): boolean {
    return this.status === 403 || this.code === 'FORBIDDEN';
  }

  /**
   * Check if error is due to resource not found
   */
  isNotFound(): boolean {
    return this.status === 404 || this.code === 'NOT_FOUND';
  }

  /**
   * Check if error is due to validation failure
   */
  isValidationError(): boolean {
    return this.status === 400 || this.code === 'VALIDATION_ERROR';
  }

  /**
   * Check if error is a server error
   */
  isServerError(): boolean {
    return this.status >= 500;
  }
}

// ============================================================================
// PAGINATION TYPES
// ============================================================================

/**
 * Pagination parameters for list requests
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

/**
 * Paginated response data
 */
export interface PaginatedData<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

// ============================================================================
// AUTH TYPES
// ============================================================================

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response with tokens
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

/**
 * Authenticated user data
 */
export interface AuthUser {
  id: string;
  email: string;
  role: 'customer' | 'merchant' | 'admin';
  merchantId?: string;
  customerId?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Token refresh response
 */
export interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

// ============================================================================
// KYC TYPES
// ============================================================================

/**
 * KYC verification status
 * IMPORTANT: These values MUST match the backend enum exactly (UPPERCASE)
 * Source of truth: shotpay-backend/src/constants/enums.ts (KycStatus enum)
 */
export type KycStatus =
  | 'NOT_STARTED'
  | 'PENDING'
  | 'VERIFIED'
  | 'FAILED'
  | 'REVIEW_REQUIRED';

/**
 * KYC session creation response
 */
export interface KycSessionResponse {
  sessionId: string;
  sessionUrl: string;
  expiresAt: string;
}

/**
 * KYC status check response
 * Source of truth: Backend GET /kyc/status endpoint
 */
export interface KycStatusResponse {
  status: KycStatus;
  verifiedAt?: string;
  failureReason?: string;
  canRetry?: boolean;
  attemptsRemaining?: number;
}

// ============================================================================
// ORDER TYPES
// ============================================================================

/**
 * Order summary for lists
 */
export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
}

/**
 * Full order details
 */
export interface OrderDetails extends OrderSummary {
  items: OrderItem[];
  shipping: ShippingAddress;
  billing?: BillingAddress;
  bnplContract?: ContractSummary;
}

/**
 * Order line item
 */
export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl?: string;
}

/**
 * Shipping address
 */
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
}

/**
 * Billing address
 */
export interface BillingAddress extends ShippingAddress {}

// ============================================================================
// CONTRACT TYPES
// ============================================================================

/**
 * BNPL contract summary
 */
export interface ContractSummary {
  id: string;
  status: string;
  planType: 'pay_in_4' | 'pay_in_6';
  orderTotal: number;
  downPayment: number;
  remainingBalance: number;
  nextPaymentDate?: string;
  nextPaymentAmount?: number;
}

/**
 * Full contract details with schedule
 */
export interface ContractDetails extends ContractSummary {
  createdAt: string;
  activatedAt?: string;
  installments: Installment[];
}

/**
 * Single installment
 */
export interface Installment {
  id: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  status: 'scheduled' | 'due' | 'paid' | 'failed' | 'overdue' | 'waived';
  paidAt?: string;
}

// ============================================================================
// BNPL DECISION TYPES
// ============================================================================

/**
 * BNPL decision request
 */
export interface BnplDecisionRequest {
  orderId: string;
  customerId: string;
  planType: 'pay_in_4' | 'pay_in_6';
}

/**
 * BNPL decision response
 */
export interface BnplDecisionResponse {
  approved: boolean;
  contractId?: string;
  declineReason?: string;
  schedule?: InstallmentSchedule[];
}

/**
 * Installment schedule preview
 */
export interface InstallmentSchedule {
  installmentNumber: number;
  amount: number;
  dueDate: string;
}

// ============================================================================
// MERCHANT TYPES
// ============================================================================

/**
 * Merchant dashboard stats
 */
export interface MerchantStats {
  totalOrders: number;
  totalRevenue: number;
  activeContracts: number;
  pendingPayouts: number;
  overdueContracts: number;
}

/**
 * Merchant payout info
 */
export interface PayoutInfo {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  scheduledDate: string;
  completedAt?: string;
}
