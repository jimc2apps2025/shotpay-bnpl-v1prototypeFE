'use client';

import { useEffect } from 'react';

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

interface DealerDetailsModalProps {
  dealer: Dealer | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DealerDetailsModal({ dealer, isOpen, onClose }: DealerDetailsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !dealer) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-2">{dealer.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Location Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-gray-400 mr-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="text-gray-700">{dealer.address}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    {dealer.distance} away
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          {(dealer.phone || dealer.email) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
              <div className="space-y-2">
                {dealer.phone && (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a
                      href={`tel:${dealer.phone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {dealer.phone}
                    </a>
                  </div>
                )}
                {dealer.email && (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${dealer.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {dealer.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FFL Number */}
          {dealer.fflNumber && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">FFL Information</h3>
              <p className="text-gray-700">
                <span className="font-medium">FFL Number:</span> {dealer.fflNumber}
              </p>
            </div>
          )}

          {/* Hours */}
          {dealer.hours && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Hours</h3>
              <p className="text-gray-700 whitespace-pre-line">{dealer.hours}</p>
            </div>
          )}

          {/* Description */}
          {dealer.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              <p className="text-gray-700">{dealer.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-200">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${dealer.lat},${dealer.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium touch-manipulation"
            >
              Get Directions
            </a>
            {dealer.phone && (
              <a
                href={`tel:${dealer.phone}`}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 sm:py-2 rounded-lg hover:bg-gray-300 transition-colors text-center font-medium touch-manipulation"
              >
                Call Now
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


