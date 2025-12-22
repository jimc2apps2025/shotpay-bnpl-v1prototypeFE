'use client';

export default function FFLDealersPage() {
  // Mock dealer data
  const dealers = [
    { id: 1, name: 'Dealer 1', address: '123 Main St, City, State 12345', distance: '2.5 miles' },
    { id: 2, name: 'Dealer 2', address: '456 Oak Ave, City, State 12345', distance: '5.1 miles' },
    { id: 3, name: 'Dealer 3', address: '789 Pine Rd, City, State 12345', distance: '8.3 miles' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">FFL Dealers</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="relative h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Map View</span>
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Nearby Dealers</h2>
              <div className="space-y-4">
                {dealers.map((dealer) => (
                  <div key={dealer.id} className="border-b pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{dealer.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{dealer.address}</p>
                    <p className="text-sm text-green-600 font-medium">{dealer.distance} away</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


