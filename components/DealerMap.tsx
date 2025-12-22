'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
const createIcon = (iconUrl: string) => {
  return L.icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
};

const defaultIcon = createIcon('https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png');
const activeIcon = createIcon('https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png');

L.Marker.prototype.options.icon = defaultIcon;

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
}

interface DealerMapProps {
  dealers: Dealer[];
  selectedDealerId?: number;
  onMarkerClick?: (dealer: Dealer) => void;
  center?: [number, number];
  zoom?: number;
}

// Component to handle map view updates
function MapViewUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
}

export default function DealerMap({ 
  dealers, 
  selectedDealerId, 
  onMarkerClick,
  center = [40.7128, -74.0060], // Default to NYC
  zoom = 10 
}: DealerMapProps) {
  const handleMarkerClick = (dealer: Dealer) => {
    if (onMarkerClick) {
      onMarkerClick(dealer);
    }
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewUpdater center={center} zoom={zoom} />
        {dealers.map((dealer) => (
          <Marker
            key={dealer.id}
            position={[dealer.lat, dealer.lng]}
            icon={selectedDealerId === dealer.id ? activeIcon : defaultIcon}
            eventHandlers={{
              click: () => handleMarkerClick(dealer),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">{dealer.name}</h3>
                <p className="text-xs text-gray-600">{dealer.address}</p>
                <p className="text-xs text-green-600 mt-1">{dealer.distance} away</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

