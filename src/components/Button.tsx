import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export default function Button({
  children,
  icon: Icon,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-ikat-900 text-white hover:bg-ikat-800 focus:ring-ikat-500 shadow-lg',
    secondary: 'bg-white text-ikat-900 border border-ikat-200 hover:bg-ikat-50 focus:ring-ikat-200',
    ghost: 'bg-transparent text-ikat-600 hover:bg-ikat-100 focus:ring-ikat-200',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
