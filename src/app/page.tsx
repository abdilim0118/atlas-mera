'use client';

import React, { useState, useEffect } from 'react';
import { IkatMaterial } from '@/types';
import MaterialCard from '@/components/MaterialCard';
import Lightbox from '@/components/Lightbox';
import Sidebar from '@/components/Sidebar';
import Logo from '@/components/Logo';
import { useSidebar } from '@/hooks/useSidebar';
import { Loader2, Menu } from 'lucide-react';
import { loadImageDimensionsBatch } from '@/utils/image';

export default function Home() {
  const [materials, setMaterials] = useState<IkatMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, mounted, toggle } = useSidebar();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        const result = await response.json();
        if (result.success) {
          const transformed: IkatMaterial[] = result.data.map((img: { id: number | bigint; imageUrl: string | null }) => ({
            id: String(img.id),
            imageUrl: img.imageUrl || ''
          }));

          const materialsWithSizes = await loadImageDimensionsBatch(transformed);
          setMaterials(materialsWithSizes);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleToggle = toggle;

  return (
    <div className="min-h-screen flex font-sans text-gray-900 bg-gray-50">
      {/* 侧边导航栏 */}
      <Sidebar isOpen={isOpen} onToggle={handleToggle} mounted={mounted} />

      {/* 主内容区域 */}
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
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <p className="text-gray-500 mb-2">暂无图片素材</p>
            <p className="text-gray-400 text-sm">请在数据库 image 表中添加图片 URL</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 lg:gap-6 space-y-3 lg:space-y-6">
            {materials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
              />
            ))}
          </div>
        )}
      </main>

      <Lightbox />
    </div>
  );
}
