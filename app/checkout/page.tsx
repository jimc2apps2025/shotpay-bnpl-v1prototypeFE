'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import BNPLOptions from '@/components/BNPLOptions';
import ProductImage from '@/components/ProductImage';
import ShieldLogo from '@/components/ShieldLogo';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'full' | 'bnpl'>('bnpl');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-select payment method and plan from URL params
  useEffect(() => {
    const payment = searchParams.get('payment');
    const plan = searchParams.get('plan');
    
    if (payment === 'bnpl') {
      setPaymentMethod('bnpl');
      setSelectedPlan(plan || 'pay4'); // Default to pay4
    } else if (payment === 'full') {
      setPaymentMethod('full');
      setSelectedPlan(null);
    }
  }, [searchParams]);

  // Redirect to products if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/products');
    }
  }, [items.length, router]);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const platformServicesFee = paymentMethod === 'bnpl' ? 1.00 : 0;
  const donationFee = 1.00;
  const total = subtotal + tax + shipping + platformServicesFee + donationFee;

  const handlePlaceOrder = async () => {
    if (!selectedPlan && paymentMethod !== 'full') {
      alert('Please select a payment plan');
      return;
    }
    
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      router.push('/?order=success');
    }, 2000);
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-[#FCFCFC] py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <Link href="/cart" className="text-[#4C773B] hover:text-[#192B17] text-sm font-medium">
            ← Back to Cart
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#0C0D0C] mb-6 sm:mb-8 uppercase">Checkout</h1>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-[#192B17]/10">
              <h2 className="text-xl font-bold text-[#0C0D0C] mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setPaymentMethod('full');
                    setSelectedPlan(null);
                  }}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    paymentMethod === 'full'
                      ? 'border-[#4C773B] bg-[#4C773B]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Full Payment</h3>
                      <p className="text-sm text-gray-600">Pay the full amount now</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'full' ? 'border-[#4C773B]' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'full' && (
                        <div className="w-3 h-3 rounded-full bg-[#4C773B]"></div>
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setPaymentMethod('bnpl');
                    setSelectedPlan(selectedPlan || 'pay4');
                  }}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    paymentMethod === 'bnpl'
                      ? 'border-[#4C773B] bg-[#4C773B]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ShieldLogo size="sm" className="h-8 w-8 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Pay in Installments</h3>
                        <p className="text-sm text-gray-600">Split your payment into 4 or 6 interest-free payments</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'bnpl' ? 'border-[#4C773B]' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'bnpl' && (
                        <div className="w-3 h-3 rounded-full bg-[#4C773B]"></div>
                      )}
                    </div>
                  </div>
                </button>
              </div>

              {/* Payment Plan Options */}
              {paymentMethod === 'bnpl' && (
                <BNPLOptions
                  total={subtotal + tax + shipping + platformServicesFee + donationFee}
                  selectedPlan={selectedPlan}
                  onSelectPlan={setSelectedPlan}
                />
              )}
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-[#192B17]/10">
              <h2 className="text-xl font-bold text-[#0C0D0C] mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C773B]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C773B]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C773B]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C773B]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C773B]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C773B]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 border border-[#192B17]/10 sticky top-4">
              <h2 className="text-xl font-bold text-[#0C0D0C] mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => {
                  const product = getProductById(item.id);
                  return (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-16 h-16 relative flex-shrink-0 bg-white rounded">
                        <ProductImage
                          src={item.image || product?.image || '/images/products/placeholder.svg'}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-[#4C773B]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {platformServicesFee > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Platform Services Fee</span>
                    <span>${platformServicesFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Non For profit donation</span>
                  <span>${donationFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold text-[#0C0D0C]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || (!selectedPlan && paymentMethod !== 'full')}
                className={`w-full mt-6 py-3 rounded-lg font-bold transition-all ${
                  isProcessing || (!selectedPlan && paymentMethod !== 'full')
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-[#4C773B] text-white hover:bg-[#192B17] shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4C773B] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
