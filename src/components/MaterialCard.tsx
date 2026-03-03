'use client';

import React from 'react';
import { IkatMaterial } from '@/types';

interface MaterialCardProps {
  material: IkatMaterial;
}

export default function MaterialCard({ material }: MaterialCardProps) {
  // 计算图片高度：如果有宽高信息，根据宽高比计算；否则使用默认比例 9:16
  const cardStyle: React.CSSProperties = {
    height: material.width && material.height
      ? `${(material.height / material.width) * 100}%`
      : undefined
  };

  // 触发自定义事件，让 Lightbox 可以监听
  const handleClick = () => {
    const event = new CustomEvent('open-lightbox', { detail: material });
    window.dispatchEvent(event);
  };

  return (
    <div
      className="relative w-full break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 material-card"
      style={cardStyle}
      onClick={handleClick}
    >
      <img
        src={material.imageUrl}
        alt=""
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}
