'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DealerDetailsModal from '@/components/DealerDetailsModal';

// Dynamically import the map component to avoid SSR issues with Leaflet
const DealerMap = dynamic(() => import('@/components/DealerMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
      <span className="text-gray-400">Loading map...</span>
    </div>
  ),
});

interface Dealer {
  id: number;
  name: string;
  address: string;
  distance: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  hours?: string;
  fflNumber?: string;
  description?: string;
}

export default function FFLDealersPage() {
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]); // Default to NYC
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Mock dealer data with coordinates and detailed information
  const dealers: Dealer[] = [
    {
      id: 1,
      name: 'Ace Firearms & Supply',
      address: '123 Main St, New York, NY 10001',
      distance: '2.5 miles',
      lat: 40.7580,
      lng: -73.9855,
      phone: '(555) 123-4567',
      email: 'info@acefirearms.com',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed',
      fflNumber: 'FFL-12345',
      description: 'Family-owned firearms dealer with over 20 years of experience. We specialize in handguns, rifles, and ammunition. Our knowledgeable staff is here to help you find the right firearm for your needs.',
    },
    {
      id: 2,
      name: 'Metro Gun Shop',
      address: '456 Oak Ave, Brooklyn, NY 11201',
      distance: '5.1 miles',
      lat: 40.6892,
      lng: -73.9442,
      phone: '(555) 234-5678',
      email: 'contact@metrogunshop.com',
      hours: 'Monday - Saturday: 10:00 AM - 7:00 PM\nSunday: 12:00 PM - 5:00 PM',
      fflNumber: 'FFL-23456',
      description: 'Full-service gun shop offering firearms, accessories, and expert gunsmithing services. We also provide FFL transfers and background check services.',
    },
    {
      id: 3,
      name: 'Liberty Arms & Ammo',
      address: '789 Pine Rd, Queens, NY 11101',
      distance: '8.3 miles',
      lat: 40.7282,
      lng: -73.7949,
      phone: '(555) 345-6789',
      email: 'sales@libertyarms.com',
      hours: 'Monday - Friday: 8:00 AM - 7:00 PM\nSaturday: 9:00 AM - 5:00 PM\nSunday: Closed',
      fflNumber: 'FFL-34567',
      description: 'Premier destination for firearms enthusiasts. We carry a wide selection of new and used firearms, tactical gear, and ammunition. Expert staff available for consultations.',
    },
    {
      id: 4,
      name: 'Precision Shooting Supplies',
      address: '321 Elm St, Manhattan, NY 10002',
      distance: '3.7 miles',
      lat: 40.7145,
      lng: -73.9981,
      phone: '(555) 456-7890',
      email: 'info@precisionshooting.com',
      hours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed',
      fflNumber: 'FFL-45678',
      description: 'Specializing in precision rifles and long-range shooting equipment. We offer custom builds, gunsmithing, and expert advice for competitive shooters.',
    },
  ];

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Keep default center if geolocation fails
        }
      );
    }
  }, []);

  const handleViewDetails = (dealer: Dealer) => {
    setSelectedDealer(dealer);
    setIsModalOpen(true);
    // Center map on selected dealer
    setMapCenter([dealer.lat, dealer.lng]);
  };

  const handleMarkerClick = (dealer: Dealer) => {
    handleViewDetails(dealer);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDealer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">FFL Dealers</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="relative h-[600px] bg-gray-200 rounded-lg overflow-hidden">
                <DealerMap
                  dealers={dealers}
                  selectedDealerId={selectedDealer?.id}
                  onMarkerClick={handleMarkerClick}
                  center={mapCenter}
                  zoom={userLocation ? 12 : 10}
                />
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md z-[1000]">
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="outline-none w-64"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Nearby Dealers</h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {dealers.map((dealer) => (
                  <div
                    key={dealer.id}
                    className={`border-b pb-4 last:border-0 cursor-pointer transition-colors hover:bg-gray-50 p-3 rounded-lg ${
                      selectedDealer?.id === dealer.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => handleViewDetails(dealer)}
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{dealer.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{dealer.address}</p>
                    <p className="text-sm text-green-600 font-medium mb-2">{dealer.distance} away</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(dealer);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DealerDetailsModal
        dealer={selectedDealer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}


