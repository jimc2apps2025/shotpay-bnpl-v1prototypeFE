/**
 * ============================================================================
 * FILE: middleware.ts
 * ============================================================================
 *
 * PURPOSE:
 *   Next.js middleware for route protection. Runs on the edge before page
 *   rendering to check authentication status and redirect unauthorized users.
 *
 * COMPONENT: Frontend
 * MODULE: Authentication
 * LAYER: INFRASTRUCTURE
 *
 * DEPENDENCIES:
 *   - next/server: NextRequest, NextResponse for middleware handling
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
 * PROTECTED ROUTES:
 * ============================================================================
 * - /dashboard/* - Merchant dashboard (requires merchant role)
 * - /checkout - Checkout page (requires authentication)
 * - /account/* - Customer account pages (requires authentication)
 * - /orders/* - Order history (requires authentication)
 *
 * ============================================================================
 * PUBLIC ROUTES:
 * ============================================================================
 * - / - Homepage
 * - /products/* - Product browsing
 * - /cart - Shopping cart
 * - /auth/* - Authentication pages
 * - /ffl-dealers - FFL dealer locator
 *
 * ============================================================================
 * LICENSE: Proprietary
 * Copyright (c) 2025 2A Apps / ShotPay. All rights reserved.
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Routes that require authentication
 */
const PROTECTED_ROUTES = [
  '/checkout',
  '/account',
  '/orders',
];

/**
 * Routes that require merchant role
 */
const MERCHANT_ROUTES = [
  '/dashboard',
];

/**
 * Routes that should redirect authenticated users away
 * (e.g., login page when already logged in)
 */
const GUEST_ONLY_ROUTES = [
  '/auth/login',
  '/auth/signup',
];

/**
 * Cookie name for access token
 */
const ACCESS_TOKEN_COOKIE = 'shotpay_access_token';

/**
 * Cookie name for refresh token
 */
const REFRESH_TOKEN_COOKIE = 'shotpay_refresh_token';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if a path matches any route pattern
 */
function matchesRoute(path: string, routes: string[]): boolean {
  return routes.some((route) => {
    // Exact match
    if (path === route) return true;
    // Prefix match (for nested routes)
    if (path.startsWith(route + '/')) return true;
    return false;
  });
}

/**
 * Parse JWT payload without verification
 * (verification happens on the backend)
 */
function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
function isTokenExpired(payload: Record<string, unknown>): boolean {
  const exp = payload.exp as number | undefined;
  if (!exp) return true;

  // Add 30 second buffer for network latency
  return Date.now() >= (exp * 1000) - 30000;
}

// ============================================================================
// MIDDLEWARE
// ============================================================================

/**
 * Next.js Middleware
 *
 * @description
 *   Runs before every matching request to check authentication status.
 *   Redirects unauthorized users to login page.
 */
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Get tokens from cookies
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  // Parse access token if present
  let isAuthenticated = false;
  let userRole: string | null = null;

  if (accessToken) {
    const payload = parseJwtPayload(accessToken);
    if (payload && !isTokenExpired(payload)) {
      isAuthenticated = true;
      userRole = payload.role as string || null;
    }
  }

  // If access token is expired but refresh token exists,
  // allow the request - the client will refresh the token
  if (!isAuthenticated && refreshToken) {
    const refreshPayload = parseJwtPayload(refreshToken);
    if (refreshPayload && !isTokenExpired(refreshPayload)) {
      // Token might be refreshable - let the request through
      // The client-side auth context will handle refresh
      isAuthenticated = true;
    }
  }

  // Handle guest-only routes (redirect authenticated users)
  if (matchesRoute(pathname, GUEST_ONLY_ROUTES)) {
    if (isAuthenticated) {
      // Redirect to appropriate dashboard
      const redirectUrl = userRole === 'merchant' ? '/dashboard' : '/products';
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  // Handle merchant-only routes
  if (matchesRoute(pathname, MERCHANT_ROUTES)) {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== 'merchant' && userRole !== 'admin') {
      // Redirect non-merchants to home
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  // Handle protected routes
  if (matchesRoute(pathname, PROTECTED_ROUTES)) {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Allow all other routes
  return NextResponse.next();
}

// ============================================================================
// MATCHER CONFIGURATION
// ============================================================================

/**
 * Configure which routes the middleware applies to
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * - API routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
};
