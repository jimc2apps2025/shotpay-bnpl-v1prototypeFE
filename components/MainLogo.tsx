import React from 'react';
import Image from 'next/image';

interface MainLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function MainLogo({ className = '', size = 'md' }: MainLogoProps) {
  const sizes = {
    sm: { width: 250, height: 75 },
    md: { width: 250, height: 75 },
    lg: { width: 250, height: 75},
  };

  const { width, height } = sizes[size];

  return (
    <Image
      src="/ShotPay-Logo_Primary-Outlined-2.webp"
      alt="ShotPay Logo"
      width={width}
      height={height}
      className={className}
      style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
      priority={size === 'lg'}
    />
  );
}
