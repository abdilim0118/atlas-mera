'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, Heart } from 'lucide-react';
import { IkatMaterial } from '@/types';

export default function Lightbox() {
  const [selectedMaterial, setSelectedMaterial] = useState<IkatMaterial | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    // 从 localStorage 读取收藏列表
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  useEffect(() => {
    const handleOpenLightbox = (e: Event) => {
      const customEvent = e as CustomEvent<IkatMaterial>;
      setSelectedMaterial(customEvent.detail);
    };

    window.addEventListener('open-lightbox', handleOpenLightbox);
    return () => {
      window.removeEventListener('open-lightbox', handleOpenLightbox);
    };
  }, []);

  const toggleFavorite = () => {
    if (!selectedMaterial) return;

    const newFavorites = new Set(favorites);
    const materialId = String(selectedMaterial.id);
    if (newFavorites.has(materialId)) {
      newFavorites.delete(materialId);
    } else {
      newFavorites.add(materialId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));

    // 触发收藏变化事件
    window.dispatchEvent(new CustomEvent('favorites-changed', { detail: Array.from(newFavorites) }));
  };

  return (
    <>
      {/* Lightbox / Full Screen View */}
      {selectedMaterial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
          onClick={() => setSelectedMaterial(null)}
        >
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 z-50 flex gap-3" onClick={(e) => e.stopPropagation()}>
            {/* 收藏按钮 */}
            <button
              onClick={toggleFavorite}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all group"
              title={favorites.has(String(selectedMaterial.id)) ? "取消收藏" : "收藏"}
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  favorites.has(String(selectedMaterial.id))
                    ? 'fill-red-500 text-red-500'
                    : 'text-white/80 group-hover:text-white'
                }`}
              />
            </button>

            {/* 下载按钮 */}
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = selectedMaterial.imageUrl;
                link.download = `atlas-mera-${String(selectedMaterial.id)}.jpg`;
                link.click();
              }}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all group"
              title="下载高清原图"
            >
              <Download className="w-6 h-6 text-white/80 group-hover:text-white" />
            </button>

            {/* 关闭按钮 */}
            <button
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all group"
              onClick={() => setSelectedMaterial(null)}
            >
              <X className="w-6 h-6 text-white/80 group-hover:text-white" />
            </button>
          </div>

          {/* Main Image */}
          <img
            src={selectedMaterial.imageUrl}
            alt=""
            className="max-w-full max-h-full object-contain shadow-2xl rounded-sm cursor-pointer"
            onClick={() => setSelectedMaterial(null)}
          />
        </div>
      )}
    </>
  );
}
