# ShotPay BNPL Frontend

Buy Now Pay Later (BNPL) consumer-facing application for the firearms industry. Built with Next.js 16, React 19, and TypeScript.

## Overview

ShotPay provides firearms retailers with compliant BNPL payment options. This frontend connects to the ShotPay backend API for:

- **KYC Verification** - Age 21+ verification via Persona
- **BNPL Checkout** - Pay-in-4 or Pay-in-6 installment plans
- **Customer Dashboard** - View contracts and payment schedules
- **Merchant Dashboard** - Analytics, orders, payouts

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.0 | React framework with App Router |
| React | 19 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4 | Styling |

---

## Quick Start

### Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:3001`

### Installation

```bash
# Navigate to frontend directory
cd shotpay-bnpl-v1prototypeFE

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Project Structure

```
shotpay-bnpl-v1prototypeFE/
├── app/
│   ├── auth/                    # Authentication pages
│   │   ├── login/page.tsx       # Login form
│   │   ├── signup/page.tsx      # Registration form
│   │   └── forgot-password/     # Password reset
│   ├── kyc/                     # KYC verification
│   │   └── page.tsx             # Initiate verification
│   ├── cart/                    # Shopping cart
│   ├── checkout/                # Checkout flow
│   ├── products/                # Product browsing
│   │   ├── page.tsx             # Product listing
│   │   └── [id]/page.tsx        # Product detail
│   ├── dashboard/               # Merchant dashboard
│   ├── ffl-dealers/             # FFL dealer locator
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
│
├── components/
│   ├── Navigation.tsx           # Main navigation
│   └── KYCStatusBadge.tsx       # KYC status display
│
├── contexts/
│   └── AuthContext.tsx          # Authentication state
│
├── lib/
│   └── api/                     # API client layer
│       ├── client.ts            # Base fetch wrapper
│       ├── types.ts             # API response types
│       ├── endpoints.ts         # URL constants
│       ├── auth.ts              # Auth API calls
│       ├── orders.ts            # Order API calls
│       └── kyc.ts               # KYC API calls
│
├── middleware.ts                # Route protection
└── public/                      # Static assets
```

---

## Available Routes

### Public Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/products` | Product listing with search |
| `/products/[id]` | Product detail page |
| `/cart` | Shopping cart |
| `/auth/login` | Login form |
| `/auth/signup` | Registration form |
| `/auth/forgot-password` | Password reset |

### Protected Routes (Require Auth)

| Route | Description |
|-------|-------------|
| `/checkout` | BNPL checkout flow |
| `/kyc` | KYC verification |
| `/dashboard` | Merchant analytics |

---

## API Integration

### Configuration

Set the backend URL in your environment:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### API Client Usage

```typescript
import { apiClient } from '@/lib/api/client';

// Login
const { token, user } = await apiClient.auth.login(email, password);

// Get KYC status
const status = await apiClient.kyc.getStatus();

// Create BNPL decision
const decision = await apiClient.orders.createBnplDecision({
  orderId: '...',
  plan: 'PAY_IN_4',
  customerId: '...'
});
```

---

## Authentication Flow

1. User submits login form
2. Frontend calls `POST /auth/login`
3. Backend returns JWT token + user data
4. Token stored in AuthContext (memory)
5. Refresh token stored in httpOnly cookie
6. Protected routes check auth state via middleware

### Token Refresh

The API client automatically handles token refresh on 401 responses.

---

## KYC Flow

1. User clicks "Verify Identity" on checkout
2. Frontend calls `POST /kyc/session`
3. Backend creates Persona session, returns URL
4. User redirected to Persona hosted flow
5. User completes verification
6. Persona redirects to `/kyc?status=completed`
7. Frontend polls status until verified

---

## BNPL Checkout Flow

```
1. Customer adds items to cart
2. Proceeds to checkout
3. System checks KYC status
   └─ If not verified → Redirect to KYC
4. Customer selects BNPL plan (Pay-in-4 or Pay-in-6)
5. System runs risk check
   └─ If declined → Show reason
6. Customer reviews schedule
7. Customer enters payment method
8. Down payment captured
9. Contract created, schedule displayed
```

---

## Development

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Build

```bash
npm run build
```

---

## Implementation Status

### Completed ✅

| Feature | Status |
|---------|--------|
| Product browsing UI | ✅ Complete |
| Shopping cart | ✅ Complete |
| BNPL plan selection UI | ✅ Complete |
| Merchant dashboard UI | ✅ Complete |
| Auth pages (login/signup) | ✅ Complete |
| KYC initiation page | ✅ Complete |
| API client layer | ✅ Complete |
| Auth context | ✅ Complete |
| Route protection middleware | ✅ Complete |

### Pending

| Feature | Status | Notes |
|---------|--------|-------|
| Checkout API integration | 🔄 Pending | UI exists, needs API wiring |
| KYC status polling | 🔄 Pending | Needs live Persona account |
| Payment method entry | 🔄 Pending | COMP-004 blocker |
| Contract display | 🔄 Pending | Needs backend contract flow |

---

## Environment Variables

```bash
# Required
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Optional (for production)
NEXT_PUBLIC_PERSONA_TEMPLATE_ID=tmpl_xxx
```

---

## Architecture Notes

### State Management

- **Auth State**: React Context (`AuthContext`)
- **Cart State**: localStorage persistence
- **Server State**: Direct API calls (no cache layer yet)

### Styling

- Tailwind CSS for all styling
- Custom theme variables in `globals.css`
- Mobile-first responsive design

### Navigation

- Consistent header across all pages
- Protected routes redirect to `/auth/login`
- Post-login redirect to original destination

---

## Author

Drew Thomsen

---

## Related Documentation

- Backend: `../shotpay-backend/README.md`
- API Specification: `../docs/API_SPECIFICATION.md`
- Architecture: `../docs/TECHNICAL_ARCHITECTURE.md`
