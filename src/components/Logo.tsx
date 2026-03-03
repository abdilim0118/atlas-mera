'use client';

import { useRouter } from 'next/navigation';

interface LogoProps {
  size?: 'sm' | 'lg';
  className?: string;
}

export default function Logo({ size = 'lg', className = '' }: LogoProps) {
  const router = useRouter();
  const textSize = size === 'sm' ? 'text-sm' : 'text-lg';

  return (
    <div
      className={`inline-block cursor-pointer ${className}`}
      onClick={() => router.push('/')}
    >
      <h1 className={`${textSize} font-serif font-bold text-gray-900 tracking-tight`}>
        Atlas
        <span className="text-[#F74E39]">M</span>
        <span className="text-[#FA6D1B]">e</span>
        <span className="text-[#30A277]">r</span>
        <span className="text-[#8CCACA]">a</span>
      </h1>
    </div>
  );
}
