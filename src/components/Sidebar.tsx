'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Compass, Heart, Menu, X, Info } from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  mounted?: boolean;
}

export default function Sidebar({ isOpen, onToggle, mounted = false }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: '发现',
      icon: Compass,
    },
    {
      href: '/favorites',
      label: '收藏',
      icon: Heart,
      divider: true, // 在此项后添加分隔线
    },
    {
      href: '/about',
      label: '关于',
      icon: Info,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 w-40 bg-white border-r border-gray-100 z-50 flex flex-col
        ${mounted ? 'transition-transform duration-300 ease-in-out' : ''}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo 和汉堡菜单区域 */}
      <div className="py-3 border-b border-gray-100 flex items-center flex-shrink-0">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
        >
          {isOpen ? (
            <X className="w-4.5 h-4.5 text-gray-700" />
          ) : (
            <Menu className="w-4.5 h-4.5 text-gray-700" />
          )}
        </button>

        <Logo size="sm" className="px-2.5" />
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 py-3 overflow-y-auto flex-shrink-0">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <React.Fragment key={item.href}>
                <li>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 mx-2 px-2.5 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                </li>
                {/* 在收藏项后添加灰色分隔线 */}
                {(item as any).divider && (
                  <li className="mx-2 my-2">
                    <div className="h-px bg-gray-200" />
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
