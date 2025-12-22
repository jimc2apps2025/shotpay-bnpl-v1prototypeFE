# ShotPay - Next.js Application

This is a Next.js application built with TypeScript and Tailwind CSS, developed based on the Figma design for ShotPay.

## Features

- **Product Listings**: Browse and search through products with a modern grid layout
- **Product Details**: View detailed product information with features and specifications
- **Shopping Cart**: Add items to cart, update quantities, and view order summary
- **FFL Dealers**: Find FFL dealers near you with map integration
- **Dashboard**: View analytics, sales overview, and recent activity

## Tech Stack

- **Next.js 16.1.0** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **React 19** - UI library

## Project Structure

```
├── app/
│   ├── cart/              # Shopping cart page
│   ├── dashboard/         # Analytics dashboard
│   ├── ffl-dealers/       # FFL dealer locator
│   ├── products/          # Product pages
│   │   ├── [id]/         # Dynamic product detail pages
│   │   └── page.tsx      # Product listing page
│   ├── layout.tsx        # Root layout with navigation
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   └── Navigation.tsx    # Main navigation component
└── public/               # Static assets
```

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Pages

- `/` - Home page with navigation to all sections
- `/products` - Product listing page with search functionality
- `/products/[id]` - Individual product detail pages
- `/cart` - Shopping cart with order summary
- `/ffl-dealers` - FFL dealer locator with map view
- `/dashboard` - Analytics dashboard with stats and charts

## Build for Production

```bash
npm run build
npm start
```

## Development Notes

- The application uses mock data for demonstration purposes
- All pages are fully responsive and mobile-friendly
- Tailwind CSS is configured with custom theme variables
- Navigation is consistent across all pages
- Components are built with accessibility in mind

## Next Steps

To enhance the application, consider:
- Integrating a real backend API
- Adding authentication and user accounts
- Implementing real map functionality for FFL dealers
- Adding payment processing for checkout
- Connecting to a real product database
- Adding image uploads and management
