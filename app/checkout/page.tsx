'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BNPLOptions from '@/components/BNPLOptions';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState<'full' | 'bnpl'>('bnpl');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { items } = useCart();

  // Auto-select payment method and plan from URL parameters
  useEffect(() => {
    const paymentParam = searchParams.get('payment');
    const planParam = searchParams.get('plan');
    
    if (paymentParam === 'bnpl') {
      setPaymentMethod('bnpl');
    }
    
    if (planParam === 'pay6' || planParam === 'pay4') {
      setSelectedPlan(planParam);
    }
  }, [searchParams]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  // Redirect to cart if empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to your cart before checkout</p>
            <Link
              href="/cart"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getProductImage = (productId: number) => {
    const product = getProductById(productId);
    return product?.image || '/images/products/placeholder.svg';
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'bnpl' && !selectedPlan) {
      alert('Please select a payment plan');
      return;
    }
    // Handle order placement
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/cart" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Back to Cart
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                {/* Full Payment Option */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'full'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('full')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'full' ? 'border-green-600' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'full' && (
                          <div className="w-3 h-3 rounded-full bg-green-600"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Pay in Full</h3>
                        <p className="text-sm text-gray-600">Pay ${total.toFixed(2)} today</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* BNPL Option */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'bnpl'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('bnpl')}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'bnpl' ? 'border-green-600' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'bnpl' && (
                          <div className="w-3 h-3 rounded-full bg-green-600"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Buy Now, Pay Later</h3>
                        <p className="text-sm text-gray-600">Split your payment into installments</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        No Interest¹
                      </span>
                    </div>
                  </div>
                  
                  {paymentMethod === 'bnpl' && (
                    <BNPLOptions 
                      total={total} 
                      selectedPlan={selectedPlan}
                      onSelectPlan={setSelectedPlan}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <Image
                        src={getProductImage(item.id)}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.currentTarget.src = '/images/products/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {paymentMethod === 'bnpl' && selectedPlan && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Your Payment Schedule:</p>
                  <div className="space-y-2">
                    {selectedPlan === 'pay4' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Today (Down Payment)</span>
                          <span className="font-semibold text-gray-900">${(total / 4).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Week 2</span>
                          <span className="font-semibold text-gray-900">${(total / 4).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Week 4</span>
                          <span className="font-semibold text-gray-900">${(total / 4).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Week 6</span>
                          <span className="font-semibold text-gray-900">${(total / 4).toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    {selectedPlan === 'pay6' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Today (Down Payment)</span>
                          <span className="font-semibold text-gray-900">${(total / 6).toFixed(2)}</span>
                        </div>
                        {[2, 4, 6, 8, 10].map((week) => (
                          <div key={week} className="flex justify-between text-sm">
                            <span className="text-gray-700">Week {week}</span>
                            <span className="font-semibold text-gray-900">${(total / 6).toFixed(2)}</span>
                          </div>
                        ))}
                      </>
                    )}
                    <div className="pt-2 mt-2 border-t border-green-300">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-gray-900">Total Amount</span>
                        <span className="text-gray-900">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mt-6"
              >
                {paymentMethod === 'bnpl' ? 'Complete Purchase' : 'Place Order'}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                ¹Pay later loans are originated by WebBank or Sezzle. Refer to your loan agreement for lender information.
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Loading checkout...</h2>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

