'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';
import ProductImage from '@/components/ProductImage';
import { useCart } from '@/contexts/CartContext';
import Toast from '@/components/Toast';
import ShieldLogo from '@/components/ShieldLogo';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rifle' | 'pistol' | 'ammunition' | 'accessory' | 'target'>('all');
  const { addToCart } = useCart();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubscriptionClick = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        fflRequired: product.fflRequired,
      });
      router.push('/checkout?payment=subscription&plan=monthly');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FCFCFC] py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0C0D0C] mb-3 md:mb-4 uppercase">Products</h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-[#192B17]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C773B] focus:border-[#4C773B] bg-white text-[#0C0D0C]"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-[#192B17]/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 md:px-4 py-2 rounded-lg transition-colors font-medium whitespace-nowrap text-sm md:text-base ${
                  selectedCategory === 'all'
                    ? 'bg-[#4C773B] text-white'
                    : 'bg-white text-[#0C0D0C] border border-[#192B17]/20 hover:bg-[#192B17]/5'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('rifle')}
                className={`px-3 md:px-4 py-2 rounded-lg transition-colors font-medium whitespace-nowrap text-sm md:text-base ${
                  selectedCategory === 'rifle'
                    ? 'bg-[#4C773B] text-white'
                    : 'bg-white text-[#0C0D0C] border border-[#192B17]/20 hover:bg-[#192B17]/5'
                }`}
              >
                Rifle
              </button>
              <button
                onClick={() => setSelectedCategory('pistol')}
                className={`px-3 md:px-4 py-2 rounded-lg transition-colors font-medium whitespace-nowrap text-sm md:text-base ${
                  selectedCategory === 'pistol'
                    ? 'bg-[#4C773B] text-white'
                    : 'bg-white text-[#0C0D0C] border border-[#192B17]/20 hover:bg-[#192B17]/5'
                }`}
              >
                Pistol
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#192B17] text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col border border-[#192B17]/10"
              >
                <div className="aspect-square relative">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="aspect-square"
                  />
                  {product.fflRequired && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10 font-medium">
                      FFL Required
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="absolute top-2 left-2 bg-[#192B17] text-white text-xs px-2 py-1 rounded z-10 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="text-xs text-[#4C773B] uppercase font-bold">{product.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0C0D0C] mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-[#192B17] mb-4 flex-1 line-clamp-2">{product.description}</p>
                  <div className="mt-auto">
                    <p className="text-xl font-bold text-[#4C773B] mb-2">${product.price.toFixed(2)}</p>
                    {/* Payment Option */}
                    {product.category === 'ammunition' || product.category === 'target' ? (
                      <div 
                        onClick={(e) => handleSubscriptionClick(e, product)}
                        className="mb-3 p-2 bg-[#0C0D0C] border border-[#4C773B]/30 rounded hover:border-[#4C773B]/50 hover:bg-[#0C0D0C]/90 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center space-x-1.5 flex-1 min-w-0">
                            <ShieldLogo size="sm" className="h-5 w-5 flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="flex items-center space-x-1">
                                <span className="text-[10px] text-white font-bold">Subscription Based</span>
                                <span className="text-[9px] text-white/60">by</span>
                                <span className="text-[10px] text-white font-bold">ShotPay</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-3 p-2 bg-[#0C0D0C] border border-[#4C773B]/30 rounded">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center space-x-1.5 flex-1 min-w-0">
                            <ShieldLogo size="sm" className="h-5 w-5 flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="flex items-center space-x-1">
                                <span className="text-[10px] text-white font-bold">Pay in 6</span>
                                <span className="text-[9px] text-white/60">by</span>
                                <span className="text-[10px] text-white font-bold">ShotPay</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#4C773B] whitespace-nowrap">
                            ${(product.price / 6).toFixed(2)}<span className="text-[10px] font-normal text-white/70">/mo</span>
                          </span>
                        </div>
                      </div>
                    )}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        if (product.inStock) {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image: product.image,
                            fflRequired: product.fflRequired,
                          });
                          setToastMessage(`${product.name} added to cart!`);
                          setShowToast(true);
                        }
                      }}
                      disabled={!product.inStock}
                      className={`w-full py-2 rounded-lg transition-all font-bold ${
                        product.inStock
                          ? 'bg-[#4C773B] text-white hover:bg-[#192B17] shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                          : 'bg-[#192B17]/20 text-[#192B17]/60 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Toast
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
