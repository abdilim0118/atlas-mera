'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import Logo from '@/components/Logo';
import Sidebar from '@/components/Sidebar';
import { useSidebar } from '@/hooks/useSidebar';

export default function AboutPage() {
  const { isOpen, mounted, toggle } = useSidebar();

  return (
    <div className="min-h-screen flex font-sans text-gray-900 bg-gray-50 relative">
      {/* 侧边导航栏 */}
      <Sidebar isOpen={isOpen} onToggle={toggle} mounted={mounted} />

      {/* 主内容区域 */}
      <main
        className={`flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto w-full
          ${mounted ? 'transition-all duration-300 ease-in-out' : ''}
          ${isOpen ? 'ml-[10rem]' : ''}
        `}
      >
        <div className="flex items-center justify-between mb-8">
          {!isOpen && (
            <button onClick={toggle} className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {!isOpen && <Logo />}

          <div className="flex-1" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight mb-4">
                Atlas
                <span className="text-[#F74E39]">M</span>
                <span className="text-[#FA6D1B]">e</span>
                <span className="text-[#30A277]">r</span>
                <span className="text-[#8CCACA]">a</span>
              </h1>
            </div>

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">项目简介</h2>
                <p className="leading-relaxed">
                  AtlasMera 是一个专注于收集与展示 Atlas 风格及民族风纹理的网站。我们为设计师等创意专业人士，提供一个可直接浏览、获取灵感的纹理图库。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">在这里，您可以找到：</h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <span className="font-bold">风格多样的纹理：</span>涵盖几何、编织、印花、自然肌理等多种风格；
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <span className="font-bold">精心筛选的细节：</span>每一张都注重色彩、图案与质感的呈现；
                    </span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">更多</h2>
                <ul className="space-y-2">
                  <li className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    <span>如有需求或更好的建议，欢迎联系:</span>
                    <a
                      href="https://xhslink.com/m/6w3PSWB1Zdi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors no-underline"
                    >
                      {/* 小红书 Logo */}
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="24" rx="4" fill="#FF2442"/>
                        <path d="M6 8H18V10H6V8ZM6 11H18V13H6V11ZM6 14H14V16H6V14Z" fill="white"/>
                      </svg>
                      <span className="text-sm text-gray-700">Heyheyhey</span>
                    </a>
                  </li>
                </ul>
              </section>

              <section className="pt-6 border-t border-gray-200">
                <p className="text-center text-gray-500 text-sm">
                  © 2026 AtlasMera. All rights reserved.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
