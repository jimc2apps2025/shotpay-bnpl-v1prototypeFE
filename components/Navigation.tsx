'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import ShieldLogo from './ShieldLogo';

export default function Navigation() {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0C0D0C] shadow-md sticky top-0 z-50 border-b border-[#192B17]/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <ShieldLogo size="sm" className="h-10 w-10 md:h-12 md:w-12" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-white hover:text-[#4C773B] transition-colors font-medium">
              Products
            </Link>
            <Link href="/ffl-dealers" className="text-white hover:text-[#4C773B] transition-colors font-medium">
              FFL Dealers
            </Link>
            <Link href="/dashboard" className="text-white hover:text-[#4C773B] transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/cart" className="relative text-white hover:text-[#4C773B] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4C773B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
            <div className="flex items-center">
              <Image
                src="/header-image.png"
                alt="Header"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link href="/cart" className="relative text-white hover:text-[#4C773B] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4C773B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
            <div className="flex items-center">
              <Image
                src="/header-image.png"
                alt="Header"
                width={100}
                height={32}
                className="h-6 w-auto object-contain"
                priority
              />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#4C773B] transition-colors p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0C0D0C]">
            <div className="flex flex-col py-4 space-y-3">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-white hover:text-[#4C773B] hover:bg-white/5 transition-colors font-medium"
              >
                Products
              </Link>
              <Link
                href="/ffl-dealers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-white hover:text-[#4C773B] hover:bg-white/5 transition-colors font-medium"
              >
                FFL Dealers
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-white hover:text-[#4C773B] hover:bg-white/5 transition-colors font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


