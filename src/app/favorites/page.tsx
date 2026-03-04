'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Menu, Loader2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MaterialCard from '@/components/MaterialCard';
import Lightbox from '@/components/Lightbox';
import Logo from '@/components/Logo';
import { useSidebar } from '@/hooks/useSidebar';
import { IkatMaterial } from '@/types';
import { loadImageDimensionsBatch } from '@/utils/image';

export default function FavoritesPage() {
  const { isOpen, mounted, toggle } = useSidebar();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [materials, setMaterials] = useState<IkatMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 监听收藏变化事件
  useEffect(() => {
    const handleFavoritesChanged = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      const newFavorites = new Set(customEvent.detail);
      setFavorites(newFavorites);
      fetchFavoritesImages(Array.from(newFavorites));
    };

    window.addEventListener('favorites-changed', handleFavoritesChanged);
    return () => window.removeEventListener('favorites-changed', handleFavoritesChanged);
  }, []);

  // 初始化收藏列表和图片
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favIds = JSON.parse(savedFavorites);
      setFavorites(new Set(favIds));
      fetchFavoritesImages(favIds);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchFavoritesImages = async (favIds: string[]) => {
    if (favIds.length === 0) {
      setMaterials([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/images');
      const result = await response.json();
      if (result.success) {
        const allMaterials = result.data.map((img: { id: number | bigint; imageUrl: string | null }) => ({
          id: String(img.id),
          imageUrl: img.imageUrl || ''
        }));

        const favMaterials = allMaterials.filter((material: IkatMaterial) =>
          favIds.includes(String(material.id))
        );

        setMaterials(favMaterials);
        void loadImageDimensionsBatch(favMaterials)
          .then((materialsWithSizes) => {
            setMaterials(materialsWithSizes);
          })
          .catch(() => {});
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = toggle;

  return (
    <div className="min-h-screen flex font-sans text-gray-900 bg-gray-50 relative">
      <Sidebar isOpen={isOpen} onToggle={handleToggle} mounted={mounted} />

      <main
        className={`flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto w-full
          ${mounted ? 'transition-all duration-300 ease-in-out' : ''}
          ${isOpen ? 'ml-[10rem]' : ''}
        `}
      >
        <div className="flex items-center justify-between mb-6">
          {!isOpen && (
            <button onClick={handleToggle} className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {!isOpen && <Logo />}

          <div className="flex-1" />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        ) : materials.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[600px] text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              暂无收藏
            </h2>
            <p className="text-gray-500 max-w-md">
              在发现页点击喜欢的图片，即可将其添加到收藏夹
            </p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 lg:gap-6 space-y-3 lg:space-y-6">
            {materials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        )}
      </main>

      <Lightbox />
    </div>
  );
}
