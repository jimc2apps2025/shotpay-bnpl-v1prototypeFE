'use client';

/**
 * ============================================================================
 * FILE: app/kyc/callback/page.tsx
 * ============================================================================
 *
 * PURPOSE:
 *   Handles the callback after KYC verification is completed.
 *   Polls for verification result and redirects accordingly.
 *
 * COMPONENT: Frontend
 * MODULE: Pages
 * LAYER: PRESENTATION
 *
 * ============================================================================
 * VERSION HISTORY:
 * ============================================================================
 * Version  | Date       | Author        | Change Description
 * ---------|------------|---------------|------------------------------------
 * 1.0.0    | 2026-02-01 | Drew Thomsen  | Initial implementation
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2026 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { kycApi } from '@/lib/api/kyc';
import type { KycStatusResponse } from '@/lib/api/types';
import { KYCStatusBadge } from '@/components/KYCStatusBadge';
import { useAuth } from '@/contexts/AuthContext';

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function KYCCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [status, setStatus] = useState<KycStatusResponse | null>(null);
  const [message, setMessage] = useState('Checking verification status...');
  const [error, setError] = useState<string | null>(null);

  // Get return URL from query params or session storage
  const returnUrl =
    searchParams.get('return') ||
    (typeof window !== 'undefined'
      ? sessionStorage.getItem('kyc_return_url')
      : null) ||
    '/checkout';

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      pollVerificationStatus();
    }
  }, [user, authLoading, isAuthenticated]);

  const pollVerificationStatus = async () => {
    try {
      setMessage('Verifying your identity...');

      // Poll for status updates
      const finalStatus = await kycApi.pollStatus(
        user?.id,
        2000, // Poll every 2 seconds
        60000, // Max 1 minute
        (currentStatus) => {
          setStatus(currentStatus);
          updateMessage(currentStatus);
        }
      );

      setStatus(finalStatus);
      handleFinalStatus(finalStatus);
    } catch (err) {
      console.error('Polling error:', err);
      setError('Unable to check verification status. Please try again.');
    }
  };

  const updateMessage = (currentStatus: KycStatusResponse) => {
    switch (currentStatus.status) {
      case 'pending':
        setMessage('Processing your verification...');
        break;
      case 'review_required':
        setMessage('Your verification is under review...');
        break;
      case 'verified':
        setMessage('Verification complete!');
        break;
      case 'failed':
        setMessage('Verification could not be completed.');
        break;
      default:
        setMessage('Checking verification status...');
    }
  };

  const handleFinalStatus = (finalStatus: KycStatusResponse) => {
    // Clear stored return URL
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('kyc_return_url');
    }

    // Redirect after a short delay to show the result
    setTimeout(() => {
      if (finalStatus.status === 'verified') {
        router.push(returnUrl);
      } else if (finalStatus.status === 'failed') {
        router.push('/kyc?status=failed');
      } else if (finalStatus.status === 'review_required') {
        // Stay on page, show review message
      } else {
        // Still pending after timeout - redirect to KYC page
        router.push('/kyc');
      }
    }, 2000);
  };

  const handleRetry = () => {
    router.push('/kyc');
  };

  const handleContinue = () => {
    router.push(returnUrl);
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Verified - success state
  if (status?.status === 'verified') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Successful</h1>
            <p className="text-gray-600 mb-6">
              Your identity has been verified. You can now complete your purchase.
            </p>
            <KYCStatusBadge status="verified" size="lg" className="mb-6" />
            <button
              onClick={handleContinue}
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Failed state
  if (status?.status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-4">
              {status.failureReason || 'We were unable to verify your identity.'}
            </p>
            <KYCStatusBadge status="failed" size="lg" className="mb-6" />
            {status.canRetry && (
              <button
                onClick={handleRetry}
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            )}
            {!status.canRetry && (
              <p className="text-sm text-red-600">
                Maximum attempts reached. Please contact support for assistance.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Review required state
  if (status?.status === 'review_required') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Under Review</h1>
            <p className="text-gray-600 mb-6">
              Your verification is being reviewed manually. This usually takes a few minutes but may take up to 24 hours.
            </p>
            <KYCStatusBadge status="review_required" size="lg" className="mb-6" />
            <p className="text-sm text-gray-500">
              We'll notify you by email once the review is complete.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default - loading/polling state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing</h1>
          <p className="text-gray-600 mb-4">{message}</p>
          {status && (
            <KYCStatusBadge status={status.status} size="lg" />
          )}
        </div>
      </div>
    </div>
  );
}
