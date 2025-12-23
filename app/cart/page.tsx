'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import Toast from '@/components/Toast';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [removingId, setRemovingId] = useState<number | null>(null);

  const getProductImage = (productId: number) => {
    const product = getProductById(productId);
    return product?.image || '/images/products/placeholder.svg';
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove(id);
    } else {
      updateQuantity(id, newQuantity);
      setToastMessage('Cart updated');
      setShowToast(true);
    }
  };

  const handleRemove = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      const item = items.find((i) => i.id === id);
      removeFromCart(id);
      setRemovingId(null);
      if (item) {
        setToastMessage(`${item.name} removed from cart`);
        setShowToast(true);
      }
    }, 300);
  };

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  return (
    <>
      <div className="min-h-screen bg-[#FCFCFC] py-4 sm:py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0C0D0C] mb-4 sm:mb-8 uppercase">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center border border-[#192B17]/10">
              <svg
                className="w-24 h-24 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-[#0C0D0C] mb-2">Your cart is empty</h2>
              <p className="text-[#192B17] mb-6">Start shopping to add items to your cart</p>
              <Link
                href="/products"
                className="inline-block bg-[#4C773B] text-white px-6 py-3 rounded-lg hover:bg-[#192B17] transition-colors font-bold"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 border border-[#192B17]/10">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold">Cart Items ({items.length})</h2>
                    <button
                      onClick={() => {
                        items.forEach((item) => handleRemove(item.id));
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#192B17]/10 pb-4 transition-all gap-4 ${
                          removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          <Link href={`/products/${item.id}`} className="flex-shrink-0">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg overflow-hidden hover:opacity-80 transition-opacity">
                              <Image
                                src={getProductImage(item.id)}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                  e.currentTarget.src = '/images/products/placeholder.svg';
                                }}
                              />
                            </div>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link href={`/products/${item.id}`}>
                              <h3 className="font-bold text-[#0C0D0C] hover:text-[#4C773B] transition-colors truncate">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-[#192B17]">${item.price.toFixed(2)} each</p>
                            {item.fflRequired && (
                              <span className="inline-block mt-1 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                                FFL Required
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end sm:ml-4 gap-3 sm:gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2 border border-[#192B17]/20 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#192B17]/5 transition-colors rounded-l-lg touch-manipulation"
                              aria-label="Decrease quantity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#192B17]/5 transition-colors rounded-r-lg touch-manipulation"
                              aria-label="Increase quantity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right sm:min-w-[100px]">
                            <p className="font-bold text-[#0C0D0C] text-base sm:text-lg">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-[#192B17]/70">
                                ${item.price.toFixed(2)} × {item.quantity}
                              </p>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors touch-manipulation"
                            aria-label="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1 mt-6 sm:mt-8 lg:mt-0">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-4 border border-[#192B17]/10">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#0C0D0C]">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-[#192B17]">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#192B17]">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <span className="text-[#4C773B] font-bold">Free</span> : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {subtotal < 100 && (
                      <p className="text-sm text-[#192B17]/70">
                        Add ${(100 - subtotal).toFixed(2)} more for free shipping
                      </p>
                    )}
                    <div className="flex justify-between text-[#192B17]">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-[#192B17]/10 pt-3 flex justify-between text-lg font-bold text-[#0C0D0C]">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full bg-[#4C773B] text-white py-3 rounded-lg hover:bg-[#192B17] transition-colors font-bold mb-4 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Proceed to Checkout
                  </Link>

                  <div className="pt-4 border-t border-[#192B17]/10">
                    <p className="text-xs text-[#192B17]/70 text-center">
                      <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Secure checkout with SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Toast
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
