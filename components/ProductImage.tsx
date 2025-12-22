'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function ProductImage({ 
  src, 
  alt, 
  width = 400, 
  height = 400, 
  className = '',
  priority = false 
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc('/images/products/placeholder.svg');
    }
  };

  const placeholderSvg = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
      <svg
        className="w-24 h-24 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="text-gray-500 text-sm mt-2">Product Image</span>
    </div>
  );

  // Show placeholder if error or if src is already placeholder
  if (hasError || imgSrc === '/images/products/placeholder.svg') {
    return (
      <div className={`relative bg-gray-200 flex items-center justify-center overflow-hidden ${className}`}>
        {placeholderSvg}
      </div>
    );
  }

  return (
    <div className={`relative bg-gray-200 flex items-center justify-center overflow-hidden ${className}`}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className="object-contain w-full h-full"
        onError={handleError}
        priority={priority}
        unoptimized={false}
      />
    </div>
  );
}

