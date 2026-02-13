'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';
import ProductImage from '@/components/ProductImage';
import { useCart } from '@/contexts/CartContext';
import Toast from '@/components/Toast';
import ShieldLogo from '@/components/ShieldLogo';

type Category = 'all' | 'rifle' | 'pistol' | 'ammunition' | 'accessory' | 'target';

export default function HomeProductsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const { addToCart } = useCart();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubscriptionClick = (e: React.MouseEvent, product: (typeof products)[0]) => {
	e.preventDefault();
	e.stopPropagation();

	if (!product.inStock) return;

	addToCart({
	  id: product.id,
	  name: product.name,
	  price: product.price,
	  quantity: 1,
	  image: product.image,
	  fflRequired: product.fflRequired,
	});

	router.push('/checkout?payment=subscription&plan=monthly');
  };

	const FEATURED_PRODUCT_IDS = [
	1,
	2,
	9,
	12,
	];
	
	const filteredProducts = products.filter((product) =>
	FEATURED_PRODUCT_IDS.includes(product.id)
	);


  return (
	<section className="bg-[#FCFCFC] py-10 md:py-14">
	  <div className="container mx-auto px-4">
		<div className="mb-6 md:mb-8">
		  <div className="flex items-end justify-between gap-4">
			<div>
			  <h2 className="text-2xl md:text-3xl font-bold text-[#0C0D0C] mb-2 uppercase">
				ShotPay Demo
			  </h2>
			</div>

			<Link
			  href="/products"
			  className="inline-flex px-3 py-2 md:px-4 md:py-2 rounded-lg border border-[#192B17]/20 bg-white text-[#0C0D0C] hover:bg-[#192B17]/5 font-medium text-sm md:text-base"
			>
			  View all
			</Link>
		  </div>
		</div>

		{filteredProducts.length === 0 ? (
		  <div className="text-center py-10">
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
				  <ProductImage src={product.image} alt={product.name} className="aspect-square" />

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
					<span className="text-xs text-[#4C773B] uppercase font-bold">
					  {product.category}
					</span>
				  </div>

				  <h3 className="text-lg font-bold text-[#0C0D0C] mb-2 line-clamp-2">
					{product.name}
				  </h3>

				  <p className="text-sm text-[#192B17] mb-4 flex-1 line-clamp-2">
					{product.description}
				  </p>

				  <div className="mt-auto">
					<p className="text-xl font-bold text-[#4C773B] mb-2">
					  ${product.price.toFixed(2)}
					</p>

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
								<span className="text-[10px] text-white font-bold">
								  Subscription Based
								</span>
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
								<span className="text-[10px] text-white font-bold">Pay in 4</span>
								<span className="text-[9px] text-white/60">by</span>
								<span className="text-[10px] text-white font-bold">ShotPay</span>
							  </div>
							</div>
						  </div>

						  <span className="text-xs font-bold text-[#4C773B] whitespace-nowrap">
							${(product.price / 4).toFixed(2)}
							<span className="text-[10px] font-normal text-white/70">/payment</span>
						  </span>
						</div>
					  </div>
					)}

					<button
					  onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();

						if (!product.inStock) return;

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
	</section>
  );
}
