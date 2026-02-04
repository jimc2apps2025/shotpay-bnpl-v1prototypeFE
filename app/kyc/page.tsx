'use client';

/**
 * ============================================================================
 * FILE: app/kyc/page.tsx
 * ============================================================================
 *
 * PURPOSE:
 *   Main KYC verification page. Displays current verification status and
 *   allows users to start or resume identity verification.
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
 * 1.1.0    | 2026-02-04 | Drew Thomsen  | SP-002: Align KycStatus with backend
 * 1.2.0    | 2026-02-04 | Drew Thomsen  | Add Suspense boundary for useSearchParams
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2026 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { kycApi } from '@/lib/api/kyc';
import type { KycStatusResponse } from '@/lib/api/types';
import { KYCStatusBadge } from '@/components/KYCStatusBadge';
import { useAuth } from '@/contexts/AuthContext';

// ============================================================================
// LOADING FALLBACK
// ============================================================================

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading verification status...</p>
      </div>
    </div>
  );
}

// ============================================================================
// INNER COMPONENT (uses useSearchParams)
// ============================================================================

function KYCVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [kycStatus, setKycStatus] = useState<KycStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  // Get return URL from query params
  const returnUrl = searchParams.get('return') || '/checkout';

  // Load KYC status on mount
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/auth/login?return=/kyc?return=${encodeURIComponent(returnUrl)}`);
      return;
    }

    if (user) {
      loadKycStatus();
    }
  }, [user, authLoading, isAuthenticated]);

  const loadKycStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const status = await kycApi.getStatus(user?.id);
      setKycStatus(status);
    } catch (err) {
      setError('Failed to load verification status');
      console.error('KYC status error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartVerification = async () => {
    if (!user) return;

    try {
      setStarting(true);
      setError(null);

      const callbackUrl = `${window.location.origin}/kyc/callback?return=${encodeURIComponent(returnUrl)}`;
      await kycApi.startVerification(user.id, callbackUrl);
    } catch (err) {
      setError('Failed to start verification. Please try again.');
      console.error('Start verification error:', err);
      setStarting(false);
    }
  };

  const handleContinue = () => {
    router.push(returnUrl);
  };

  // Loading state
  if (authLoading || loading) {
    return <LoadingFallback />;
  }

  // Verified state - allow continue
  if (kycStatus?.status === 'VERIFIED') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Identity Verified</h1>
            <p className="text-gray-600 mb-6">
              Your identity has been verified. You can now proceed with your purchase.
            </p>
            <KYCStatusBadge status="VERIFIED" size="lg" className="mb-6" />
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
  if (kycStatus?.status === 'FAILED') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-4">
              {kycStatus.failureReason || 'We were unable to verify your identity.'}
            </p>
            <KYCStatusBadge status="FAILED" size="lg" className="mb-6" />
            {kycStatus.canRetry && (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  You have {kycStatus.attemptsRemaining} attempt(s) remaining.
                </p>
                <button
                  onClick={handleStartVerification}
                  disabled={starting}
                  className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {starting ? 'Starting...' : 'Try Again'}
                </button>
              </>
            )}
            {!kycStatus.canRetry && (
              <p className="text-sm text-red-600">
                Maximum verification attempts reached. Please contact support.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default - start verification
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Identity Verification</h1>
            <p className="text-gray-600">
              To complete your purchase, we need to verify you are 21 years of age or older.
            </p>
          </div>

          {kycStatus && (
            <div className="mb-6 text-center">
              <KYCStatusBadge status={kycStatus.status} size="lg" />
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Government ID</h3>
                <p className="text-sm text-gray-600">Take a photo of your driver's license or passport</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Selfie Verification</h3>
                <p className="text-sm text-gray-600">Take a selfie to match with your ID photo</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Age Verification</h3>
                <p className="text-sm text-gray-600">We'll confirm you are 21+ years old</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleStartVerification}
            disabled={starting}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {starting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Starting Verification...
              </span>
            ) : (
              'Start Verification'
            )}
          </button>

          <p className="mt-4 text-xs text-center text-gray-500">
            Your information is securely processed by our identity verification partner.
            We do not store your ID photos.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE COMPONENT (with Suspense boundary)
// ============================================================================

export default function KYCVerificationPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <KYCVerificationContent />
    </Suspense>
  );
}
