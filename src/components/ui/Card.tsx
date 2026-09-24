'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  hoverable = false,
  ...props 
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden';
  const hoverClasses = hoverable ? 'transition-shadow hover:shadow-md cursor-pointer' : '';

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
