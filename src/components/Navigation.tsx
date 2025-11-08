// src/components/Navigation.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'ホーム', icon: '🏠' },
    { path: '/types', label: 'タイプ別', icon: '🔥', disabled: true },
    { path: '/favorites', label: 'お気に入り', icon: '⭐', disabled: true },
    { path: '/search', label: '検索', icon: '🔍', disabled: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        {/* デスクトップメニュー */}
        <div className="hidden md:flex space-x-1 py-3">
          {navItems.map((item) => (
            item.disabled ? (
              <div
                key={item.path}
                className="px-4 py-2 rounded-md text-blue-200 cursor-not-allowed flex items-center gap-2"
                title="近日公開予定"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                <span className="text-xs">(準備中)</span>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'text-white hover:bg-blue-400'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          ))}
        </div>

        {/* モバイルメニュー */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-3">
            <span className="text-white font-semibold">メニュー</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="メニューを開く"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* モバイルメニュー項目 */}
          {isMenuOpen && (
            <div className="pb-3 space-y-1">
              {navItems.map((item) => (
                item.disabled ? (
                  <div
                    key={item.path}
                    className="block px-4 py-2 rounded-md text-blue-200 cursor-not-allowed"
                  >
                    <span>{item.icon}</span> {item.label} <span className="text-xs">(準備中)</span>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-white text-blue-600 font-semibold'
                        : 'text-white hover:bg-blue-400'
                    }`}
                  >
                    <span>{item.icon}</span> {item.label}
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

