'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProductById, products } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductImage from '@/components/ProductImage';
import { useCart } from '@/contexts/CartContext';
import Toast from '@/components/Toast';
import ShieldLogo from '@/components/ShieldLogo';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productId = parseInt(id);
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!product) {
    notFound();
  }

  // Get related products (same category, exclude current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      fflRequired: product.fflRequired,
    });
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handlePayIn6Click = () => {
    // Add product to cart if not already there
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      fflRequired: product.fflRequired,
    });
    // Navigate to checkout with BNPL and Pay in 6 pre-selected
    router.push('/checkout?payment=bnpl&plan=pay6');
  };

  return (
    <>
      <div className="min-h-screen bg-[#FCFCFC] py-4 sm:py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="mb-4 sm:mb-6 text-xs sm:text-sm">
            <ol className="flex items-center space-x-2 text-[#192B17] overflow-x-auto">
              <li><Link href="/" className="hover:text-[#0C0D0C]">Home</Link></li>
              <li>/</li>
              <li><Link href="/products" className="hover:text-[#0C0D0C]">Products</Link></li>
              <li>/</li>
              <li><span className="text-[#0C0D0C] truncate max-w-[150px] sm:max-w-none">{product.name}</span></li>
            </ol>
          </nav>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 sm:mb-8 border border-[#192B17]/10">
            <div className="md:flex">
              {/* Product Image */}
              <div className="md:w-1/2">
                <div className="aspect-square relative bg-[#192B17]/5">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    width={800}
                    height={800}
                    priority
                    className="w-full h-full"
                  />
                  {product.fflRequired && (
                    <span className="absolute top-4 right-4 bg-red-600 text-white text-sm px-3 py-1 rounded z-10 shadow-lg">
                      FFL Required
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="absolute top-4 left-4 bg-gray-600 text-white text-sm px-3 py-1 rounded z-10 shadow-lg">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="md:w-1/2 p-4 sm:p-6 md:p-8">
                <div className="mb-2 sm:mb-3">
                  <span className="text-xs sm:text-sm text-[#4C773B] uppercase tracking-wide font-bold">{product.category}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0C0D0C] mb-3 sm:mb-4">{product.name}</h1>
                <div className="flex items-baseline space-x-3 mb-2 sm:mb-3">
                  <p className="text-3xl sm:text-4xl font-bold text-[#4C773B]">${product.price.toFixed(2)}</p>
                  {product.inStock && (
                    <span className="text-xs sm:text-sm text-[#4C773B] bg-[#4C773B]/10 px-2 py-1 rounded font-medium">In Stock</span>
                  )}
                </div>
                
                {/* BNPL Monthly Payment */}
                <button
                  onClick={handlePayIn6Click}
                  className="w-full mb-4 sm:mb-6 p-3 sm:p-4 bg-[#0C0D0C] border border-[#4C773B]/30 rounded-lg hover:border-[#4C773B]/50 hover:bg-[#0C0D0C]/90 transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ShieldLogo size="sm" className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-xs sm:text-sm text-white font-bold">Pay in 6</p>
                          <span className="text-[10px] sm:text-xs text-white/70">by</span>
                          <p className="text-xs sm:text-sm text-white font-bold">ShotPay</p>
                        </div>
                        <p className="text-xs text-white/70">6 monthly payments • No interest</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg sm:text-xl font-bold text-[#4C773B]">
                        ${(product.price / 6).toFixed(2)}<span className="text-xs sm:text-sm font-normal text-white/70">/mo</span>
                      </p>
                      <p className="text-xs text-white/70">Total: ${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </button>

                {/* Quantity Selector */}
                {product.inStock && (
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-sm font-medium text-[#192B17] mb-2">Quantity</label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg border border-[#192B17]/20 hover:bg-[#192B17]/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center touch-manipulation"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-20 text-center border border-[#192B17]/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4C773B] text-[#0C0D0C]"
                      />
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 10}
                        className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg border border-[#192B17]/20 hover:bg-[#192B17]/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center touch-manipulation"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 py-3 sm:py-3 px-6 rounded-lg transition-all font-bold touch-manipulation ${
                      product.inStock
                        ? 'bg-[#4C773B] text-white hover:bg-[#192B17] shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        : 'bg-[#192B17]/20 text-[#192B17]/60 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button className="px-6 py-3 border-2 border-[#192B17]/20 rounded-lg hover:bg-[#192B17]/5 transition-colors font-bold text-[#0C0D0C] touch-manipulation">
                    Save for Later
                  </button>
                </div>

                {/* FFL Warning */}
                {product.fflRequired && (
                  <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-yellow-800">FFL Required</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          This item requires shipment to a Federal Firearms License (FFL) holder. 
                          You will need to provide your FFL dealer information during checkout.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                  <div>
                    <p className="text-sm text-gray-600">SKU</p>
                    <p className="font-semibold text-gray-900">#{product.id.toString().padStart(6, '0')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-900 capitalize">{product.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button className="px-6 py-4 text-sm font-medium text-green-600 border-b-2 border-green-600">
                  Description
                </button>
                <button className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900">
                  Specifications
                </button>
                <button className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900">
                  Reviews
                </button>
              </nav>
            </div>
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {Object.keys(product.specifications).length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <dl className="grid md:grid-cols-2 gap-4">
                      {product.specifications.caliber && (
                        <>
                          <dt className="font-semibold text-gray-700">Caliber:</dt>
                          <dd className="text-gray-600">{product.specifications.caliber}</dd>
                        </>
                      )}
                      {product.specifications.capacity && (
                        <>
                          <dt className="font-semibold text-gray-700">Capacity:</dt>
                          <dd className="text-gray-600">{product.specifications.capacity}</dd>
                        </>
                      )}
                      {product.specifications.barrelLength && (
                        <>
                          <dt className="font-semibold text-gray-700">Barrel Length:</dt>
                          <dd className="text-gray-600">{product.specifications.barrelLength}</dd>
                        </>
                      )}
                      {product.specifications.weight && (
                        <>
                          <dt className="font-semibold text-gray-700">Weight:</dt>
                          <dd className="text-gray-600">{product.specifications.weight}</dd>
                        </>
                      )}
                      {product.specifications.action && (
                        <>
                          <dt className="font-semibold text-gray-700">Action:</dt>
                          <dd className="text-gray-600">{product.specifications.action}</dd>
                        </>
                      )}
                      {product.specifications.finish && (
                        <>
                          <dt className="font-semibold text-gray-700">Finish:</dt>
                          <dd className="text-gray-600">{product.specifications.finish}</dd>
                        </>
                      )}
                      {product.specifications.rounds && (
                        <>
                          <dt className="font-semibold text-gray-700">Rounds:</dt>
                          <dd className="text-gray-600">{product.specifications.rounds}</dd>
                        </>
                      )}
                      {product.specifications.grain && (
                        <>
                          <dt className="font-semibold text-gray-700">Grain:</dt>
                          <dd className="text-gray-600">{product.specifications.grain}</dd>
                        </>
                      )}
                      {product.specifications.type && (
                        <>
                          <dt className="font-semibold text-gray-700">Type:</dt>
                          <dd className="text-gray-600">{product.specifications.type}</dd>
                        </>
                      )}
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="aspect-square relative">
                      <ProductImage
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="aspect-square"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-green-600">${relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
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
