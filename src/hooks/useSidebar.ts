'use client';

import { useState, useEffect, useLayoutEffect } from 'react';

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 初始化时从 localStorage 读取侧边栏状态
  useLayoutEffect(() => {
    const savedState = localStorage.getItem('sidebarOpen') === 'true';
    setIsOpen(savedState);
    // 延迟设置 mounted，确保布局稳定后再启用过渡动画
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  // 监听侧边栏状态变化事件
  useEffect(() => {
    const handleSidebarStateChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newState = customEvent.detail === 'true';
      setIsOpen(newState);
    };

    window.addEventListener('sidebar-state-change', handleSidebarStateChange);
    return () => window.removeEventListener('sidebar-state-change', handleSidebarStateChange);
  }, []);

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('sidebarOpen', String(newState));
    window.dispatchEvent(new CustomEvent('sidebar-state-change', { detail: String(newState) }));
  };

  return { isOpen, mounted, toggle };
}
