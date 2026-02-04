'use client';

/**
 * ============================================================================
 * FILE: KYCStatusBadge.tsx
 * ============================================================================
 *
 * PURPOSE:
 *   Displays the customer's KYC verification status as a colored badge.
 *   Used in checkout flow, account pages, and dashboards.
 *
 * COMPONENT: Frontend
 * MODULE: Components
 * LAYER: PRESENTATION
 *
 * ============================================================================
 * VERSION HISTORY:
 * ============================================================================
 * Version  | Date       | Author        | Change Description
 * ---------|------------|---------------|------------------------------------
 * 1.0.0    | 2026-02-01 | Drew Thomsen  | Initial implementation
 * 1.1.0    | 2026-02-04 | Drew Thomsen  | SP-002: Align KycStatus with backend
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2026 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

import React from 'react';
import { getKycStatusLabel, getKycStatusColor } from '@/lib/api/kyc';
import type { KycStatus } from '@/lib/api/types';

// ============================================================================
// TYPES
// ============================================================================

interface KYCStatusBadgeProps {
  status: KycStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ============================================================================
// STATUS ICONS
// ============================================================================

const StatusIcons: Record<string, React.ReactNode> = {
  NOT_STARTED: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  PENDING: (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  VERIFIED: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  FAILED: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  REVIEW_REQUIRED: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
};

// ============================================================================
// BACKGROUND COLORS
// ============================================================================

const StatusBgColors: Record<string, string> = {
  NOT_STARTED: 'bg-gray-100',
  PENDING: 'bg-yellow-100',
  VERIFIED: 'bg-green-100',
  FAILED: 'bg-red-100',
  REVIEW_REQUIRED: 'bg-blue-100',
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * KYCStatusBadge
 *
 * @description
 *   Displays KYC verification status as a colored badge with optional icon.
 *
 * @example
 *   <KYCStatusBadge status="verified" showIcon />
 *   <KYCStatusBadge status="pending" size="lg" />
 */
export function KYCStatusBadge({
  status,
  showIcon = true,
  size = 'md',
  className = '',
}: KYCStatusBadgeProps) {
  const label = getKycStatusLabel(status);
  const textColor = getKycStatusColor(status);
  const bgColor = StatusBgColors[status] || 'bg-gray-100';
  const icon = StatusIcons[status];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${bgColor} ${textColor} ${sizeClasses[size]} ${className}
      `}
    >
      {showIcon && icon}
      {label}
    </span>
  );
}

export default KYCStatusBadge;
