import React from 'react';
import Image from 'next/image';

interface ShieldLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ShieldLogo({ className = '', size = 'md' }: ShieldLogoProps) {
  const sizes = {
    sm: { width: 60, height: 60 },
    md: { width: 120, height: 120 },
    lg: { width: 180, height: 180 },
  };

  const { width, height } = sizes[size];

  return (
    <Image
      src="/logo-shield.png"
      alt="ShotPay Logo"
      width={width}
      height={height}
      className={className}
      style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
      priority={size === 'lg'}
    />
  );
}
