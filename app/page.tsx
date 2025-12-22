import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">ShotPay</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            href="/products" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Product Listings</h2>
            <p className="text-gray-600">Browse our product catalog</p>
          </Link>
          <Link 
            href="/cart" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Shopping Cart</h2>
            <p className="text-gray-600">View your cart and checkout</p>
          </Link>
          <Link 
            href="/ffl-dealers" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">FFL Dealers</h2>
            <p className="text-gray-600">Find FFL dealers near you</p>
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
            <p className="text-gray-600">Analytics and insights</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
