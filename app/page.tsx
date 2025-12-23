import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0C0D0C] mb-3 md:mb-4 uppercase tracking-tight">shotpay</h1>
        <p className="text-base md:text-lg text-[#192B17] mb-8 md:mb-12 max-w-2xl">
          The first end-to-end e-commerce firearms toolkit built for the 2A community
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Link 
            href="/products" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-[#192B17]/10 hover:border-[#4C773B]/30"
          >
            <h2 className="text-xl font-bold mb-2 text-[#0C0D0C]">Product Listings</h2>
            <p className="text-[#192B17]">Browse our product catalog</p>
          </Link>
          <Link 
            href="/cart" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-[#192B17]/10 hover:border-[#4C773B]/30"
          >
            <h2 className="text-xl font-bold mb-2 text-[#0C0D0C]">Shopping Cart</h2>
            <p className="text-[#192B17]">View your cart and checkout</p>
          </Link>
          <Link 
            href="/ffl-dealers" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-[#192B17]/10 hover:border-[#4C773B]/30"
          >
            <h2 className="text-xl font-bold mb-2 text-[#0C0D0C]">FFL Dealers</h2>
            <p className="text-[#192B17]">Find FFL dealers near you</p>
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-[#192B17]/10 hover:border-[#4C773B]/30"
          >
            <h2 className="text-xl font-bold mb-2 text-[#0C0D0C]">Dashboard</h2>
            <p className="text-[#192B17]">Analytics and insights</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
