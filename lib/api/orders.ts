/**
 * ============================================================================
 * FILE: orders.ts
 * ============================================================================
 *
 * PURPOSE:
 *   Order and BNPL contract API functions. Handles order retrieval,
 *   BNPL decision requests, and contract management.
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
 * Get orders:
 *   import { ordersApi } from '@/lib/api/orders';
 *   const orders = await ordersApi.getOrders({ page: 1, limit: 10 });
 *
 * Request BNPL decision:
 *   const decision = await ordersApi.requestBnplDecision({
 *     orderId: 'uuid',
 *     customerId: 'uuid',
 *     planType: 'pay_in_4'
 *   });
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2025 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';
import type {
  OrderSummary,
  OrderDetails,
  ContractDetails,
  BnplDecisionRequest,
  BnplDecisionResponse,
  InstallmentSchedule,
  PaginationParams,
  PaginatedData,
} from './types';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Order creation payload
 */
export interface CreateOrderRequest {
  items: OrderItemInput[];
  shipping: ShippingInput;
  billing?: ShippingInput;
  currency?: string;
}

/**
 * Order item input
 */
export interface OrderItemInput {
  productId: string;
  quantity: number;
  unitPrice: number;
}

/**
 * Shipping/billing address input
 */
export interface ShippingInput {
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
 * Schedule preview request
 */
export interface SchedulePreviewRequest {
  amount: number;
  planType: 'pay_in_4' | 'pay_in_6';
}

// ============================================================================
// ORDERS API FUNCTIONS
// ============================================================================

/**
 * ordersApi
 *
 * @description
 *   API functions for orders and BNPL operations.
 */
export const ordersApi = {
  // --------------------------------------------------------------------------
  // Orders
  // --------------------------------------------------------------------------

  /**
   * getOrders
   *
   * @description
   *   Get paginated list of orders for the current user.
   *
   * @param params - Pagination parameters
   * @returns Paginated order list
   */
  async getOrders(
    params?: PaginationParams
  ): Promise<PaginatedData<OrderSummary>> {
    return apiClient.get<PaginatedData<OrderSummary>>(ENDPOINTS.ORDERS.LIST, {
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },

  /**
   * getOrder
   *
   * @description
   *   Get full order details by ID.
   *
   * @param orderId - Order UUID
   * @returns Order details with items and contract info
   */
  async getOrder(orderId: string): Promise<OrderDetails> {
    return apiClient.get<OrderDetails>(ENDPOINTS.ORDERS.GET(orderId));
  },

  /**
   * createOrder
   *
   * @description
   *   Create a new order.
   *
   * @param data - Order creation data
   * @returns Created order details
   */
  async createOrder(data: CreateOrderRequest): Promise<OrderDetails> {
    return apiClient.post<OrderDetails>(ENDPOINTS.ORDERS.CREATE, data);
  },

  // --------------------------------------------------------------------------
  // BNPL Decision
  // --------------------------------------------------------------------------

  /**
   * requestBnplDecision
   *
   * @description
   *   Request a BNPL eligibility decision for an order.
   *   This checks KYC status, runs risk assessment, and returns approval status.
   *
   * @param request - Decision request with order and plan type
   * @returns Decision result with contract ID if approved
   */
  async requestBnplDecision(
    request: BnplDecisionRequest
  ): Promise<BnplDecisionResponse> {
    return apiClient.post<BnplDecisionResponse>(
      ENDPOINTS.BNPL.DECISION,
      request
    );
  },

  /**
   * previewSchedule
   *
   * @description
   *   Preview the installment schedule for an amount without creating a contract.
   *
   * @param request - Amount and plan type
   * @returns Array of scheduled payments
   */
  async previewSchedule(
    request: SchedulePreviewRequest
  ): Promise<InstallmentSchedule[]> {
    return apiClient.post<InstallmentSchedule[]>(
      ENDPOINTS.BNPL.PREVIEW,
      request
    );
  },

  // --------------------------------------------------------------------------
  // Contracts
  // --------------------------------------------------------------------------

  /**
   * getContracts
   *
   * @description
   *   Get paginated list of BNPL contracts for the current user.
   *
   * @param params - Pagination parameters
   * @returns Paginated contract list
   */
  async getContracts(
    params?: PaginationParams
  ): Promise<PaginatedData<ContractDetails>> {
    return apiClient.get<PaginatedData<ContractDetails>>(
      ENDPOINTS.CONTRACTS.LIST,
      {
        params: params as Record<string, string | number | boolean | undefined>,
      }
    );
  },

  /**
   * getContract
   *
   * @description
   *   Get full contract details by ID.
   *
   * @param contractId - Contract UUID
   * @returns Contract details with installment schedule
   */
  async getContract(contractId: string): Promise<ContractDetails> {
    return apiClient.get<ContractDetails>(ENDPOINTS.CONTRACTS.GET(contractId));
  },

  /**
   * getContractSchedule
   *
   * @description
   *   Get just the installment schedule for a contract.
   *
   * @param contractId - Contract UUID
   * @returns Array of installments
   */
  async getContractSchedule(
    contractId: string
  ): Promise<InstallmentSchedule[]> {
    return apiClient.get<InstallmentSchedule[]>(
      ENDPOINTS.CONTRACTS.SCHEDULE(contractId)
    );
  },

  /**
   * captureDownPayment
   *
   * @description
   *   Capture the down payment for an approved contract.
   *   This activates the contract and schedules installments.
   *
   * @param contractId - Contract UUID
   * @param paymentMethodId - Payment method to charge
   * @returns Updated contract details
   */
  async captureDownPayment(
    contractId: string,
    paymentMethodId: string
  ): Promise<ContractDetails> {
    return apiClient.post<ContractDetails>(
      ENDPOINTS.CONTRACTS.CAPTURE(contractId),
      { paymentMethodId }
    );
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export default ordersApi;
