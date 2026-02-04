/**
 * ============================================================================
 * FILE: kyc.ts
 * ============================================================================
 *
 * PURPOSE:
 *   KYC (Know Your Customer) verification API functions. Handles identity
 *   verification sessions for the firearms BNPL flow (21+ age verification).
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
 * USAGE EXAMPLES:
 * ============================================================================
 * Check KYC status:
 *   import { kycApi } from '@/lib/api/kyc';
 *   const status = await kycApi.getStatus();
 *   if (status.status !== 'VERIFIED') {
 *     const session = await kycApi.createSession();
 *     window.location.href = session.sessionUrl;
 *   }
 *
 * Poll for completion:
 *   await kycApi.pollStatus((status) => {
 *     if (status.status === 'VERIFIED') {
 *       // Proceed with checkout
 *     }
 *   });
 *
 * ============================================================================
 * KYC FLOW:
 * ============================================================================
 * 1. Check current status with getStatus()
 * 2. If not approved, create session with createSession()
 * 3. Redirect user to session URL (Persona hosted)
 * 4. User completes verification
 * 5. Persona redirects back to callback URL
 * 6. Poll status until approved/denied
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2025 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';
import type { KycStatus, KycSessionResponse, KycStatusResponse } from './types';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Polling interval for KYC status checks (ms)
 */
const POLL_INTERVAL = 3000;

/**
 * Maximum polling duration (ms)
 */
const MAX_POLL_DURATION = 300000; // 5 minutes

// ============================================================================
// KYC API FUNCTIONS
// ============================================================================

/**
 * kycApi
 *
 * @description
 *   API functions for KYC verification.
 */
export const kycApi = {
  /**
   * getStatus
   *
   * @description
   *   Get the current KYC verification status for a customer.
   *
   * @param customerId - Customer UUID (optional, uses current user if not provided)
   * @returns Current KYC status and details
   */
  async getStatus(customerId?: string): Promise<KycStatusResponse> {
    const params = customerId ? { customerId } : {};
    return apiClient.get<KycStatusResponse>(ENDPOINTS.KYC.STATUS, { params });
  },

  /**
   * createSession
   *
   * @description
   *   Create a new KYC verification session.
   *   Returns a session URL where the user should be redirected.
   *
   * @param customerId - Customer UUID
   * @param callbackUrl - URL to redirect after verification
   * @returns Session ID and URL
   */
  async createSession(
    customerId: string,
    callbackUrl: string
  ): Promise<KycSessionResponse> {
    return apiClient.post<KycSessionResponse>(ENDPOINTS.KYC.CREATE_SESSION, {
      customerId,
      callbackUrl,
    });
  },

  /**
   * isVerified
   *
   * @description
   *   Quick check if user has completed KYC verification.
   *
   * @param customerId - Customer UUID (optional)
   * @returns True if KYC status is verified
   */
  async isVerified(customerId?: string): Promise<boolean> {
    try {
      const status = await this.getStatus(customerId);
      return status.status === 'VERIFIED';
    } catch {
      return false;
    }
  },

  /**
   * needsVerification
   *
   * @description
   *   Check if user needs to complete KYC verification.
   *
   * @param customerId - Customer UUID (optional)
   * @returns True if user should be prompted for verification
   */
  async needsVerification(customerId?: string): Promise<boolean> {
    try {
      const status = await this.getStatus(customerId);
      return status.status === 'NOT_STARTED' || status.status === 'FAILED';
    } catch {
      return true;
    }
  },

  /**
   * isPending
   *
   * @description
   *   Check if KYC verification is in progress.
   *
   * @param customerId - Customer UUID (optional)
   * @returns True if verification is pending or in progress
   */
  async isPending(customerId?: string): Promise<boolean> {
    try {
      const status = await this.getStatus(customerId);
      return status.status === 'PENDING' || status.status === 'REVIEW_REQUIRED';
    } catch {
      return false;
    }
  },

  /**
   * pollStatus
   *
   * @description
   *   Poll KYC status until it reaches a terminal state (verified/failed).
   *   Useful after user completes verification to wait for result.
   *
   * @param customerId - Customer UUID (optional)
   * @param intervalMs - Polling interval in milliseconds (default: 3000)
   * @param maxDurationMs - Maximum polling duration (default: 300000)
   * @param onStatusChange - Callback for status updates
   * @returns Final KYC status
   */
  async pollStatus(
    customerId?: string,
    intervalMs?: number,
    maxDurationMs?: number,
    onStatusChange?: (status: KycStatusResponse) => void
  ): Promise<KycStatusResponse> {
    const interval = intervalMs || POLL_INTERVAL;
    const maxDuration = maxDurationMs || MAX_POLL_DURATION;
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const status = await this.getStatus(customerId);

          // Notify callback
          if (onStatusChange) {
            onStatusChange(status);
          }

          // Check for terminal states
          if (status.status === 'VERIFIED' || status.status === 'FAILED') {
            resolve(status);
            return;
          }

          // Check timeout
          if (Date.now() - startTime > maxDuration) {
            resolve(status); // Return current status on timeout
            return;
          }

          // Continue polling
          setTimeout(poll, interval);
        } catch (error) {
          reject(error);
        }
      };

      // Start polling
      poll();
    });
  },

  /**
   * getVerificationUrl
   *
   * @description
   *   Get the verification URL for starting or resuming KYC.
   *   Creates a new session if needed.
   *
   * @param customerId - Customer UUID
   * @param callbackUrl - URL to redirect after verification
   * @returns URL to redirect user for verification
   */
  async getVerificationUrl(
    customerId: string,
    callbackUrl: string
  ): Promise<string> {
    const session = await this.createSession(customerId, callbackUrl);
    return session.sessionUrl || '';
  },

  /**
   * startVerification
   *
   * @description
   *   Start the KYC verification flow.
   *   Creates a session and redirects the user.
   *
   * @param customerId - Customer UUID
   * @param returnUrl - URL to return to after verification
   */
  async startVerification(
    customerId: string,
    returnUrl?: string
  ): Promise<void> {
    const callbackUrl = returnUrl || `${window.location.origin}/kyc/callback`;
    const url = await this.getVerificationUrl(customerId, callbackUrl);

    // Store return URL for callback
    if (returnUrl) {
      sessionStorage.setItem('kyc_return_url', returnUrl);
    }

    // Redirect to verification
    window.location.href = url;
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * getKycStatusLabel
 *
 * @description
 *   Get a human-readable label for KYC status.
 *
 * @param status - KYC status code
 * @returns Human-readable label
 */
export function getKycStatusLabel(status: KycStatus): string {
  const labels: Record<string, string> = {
    NOT_STARTED: 'Not Started',
    PENDING: 'Pending Verification',
    VERIFIED: 'Verified',
    FAILED: 'Verification Failed',
    REVIEW_REQUIRED: 'Under Review',
  };

  return labels[status] || status;
}

/**
 * getKycStatusColor
 *
 * @description
 *   Get a color class for KYC status (Tailwind).
 *
 * @param status - KYC status code
 * @returns Tailwind color class
 */
export function getKycStatusColor(status: KycStatus): string {
  const colors: Record<string, string> = {
    NOT_STARTED: 'text-gray-500',
    PENDING: 'text-yellow-500',
    VERIFIED: 'text-green-500',
    FAILED: 'text-red-500',
    REVIEW_REQUIRED: 'text-blue-500',
  };

  return colors[status] || 'text-gray-500';
}

// ============================================================================
// EXPORTS
// ============================================================================

export default kycApi;
