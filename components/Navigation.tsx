'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function Navigation() {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <nav className="bg-[#FCFCFC] shadow-md sticky top-0 z-50 border-b border-[#192B17]/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-[#0C0D0C] uppercase tracking-tight">
            shotpay
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/products" className="text-[#0C0D0C] hover:text-[#4C773B] transition-colors font-medium">
              Products
            </Link>
            <Link href="/ffl-dealers" className="text-[#0C0D0C] hover:text-[#4C773B] transition-colors font-medium">
              FFL Dealers
            </Link>
            <Link href="/dashboard" className="text-[#0C0D0C] hover:text-[#4C773B] transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/cart" className="relative text-[#0C0D0C] hover:text-[#4C773B] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4C773B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}


