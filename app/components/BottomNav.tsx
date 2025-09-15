"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, CategoryGridIcon, CartIcon, HeartIcon, UserIcon } from './Icons';

const BottomNav = () => {
  const pathname = usePathname();

  // An array to hold all our navigation items for cleaner code
  const navItems = [
    { href: '/', label: 'Home', icon: HomeIcon, isActive: pathname === '/' },
    { href: '/categories', label: 'Categories', icon: CategoryGridIcon, isActive: pathname.startsWith('/categories') },
    { href: '/cart', label: 'Cart', icon: CartIcon, isCart: true, isActive: pathname === '/cart' },
    { href: '/favorites', label: 'Favorites', icon: HeartIcon, isActive: pathname === '/favorites' },
    { href: '/profile', label: 'Profile', icon: UserIcon, isActive: pathname === '/profile' },
  ];

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-20 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          // Special case for the floating cart button
          if (item.isCart) {
            return (
              <Link key={item.href} href={item.href} className="relative w-1/5 flex justify-center">
                <div className={`transition-transform duration-300 ${item.isActive ? 'transform scale-110' : ''}`}>
                    <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center -mt-10 border-4 shadow-md transition-colors duration-300 ${item.isActive ? 'border-orange-500' : 'border-gray-100'}`}>
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800">
                            <Icon className="w-6 h-6"/>
                        </div>
                    </div>
                </div>
                {/* Badge for cart items */}
                <span className="absolute top-1 right-2 lg:right-4 text-xs bg-orange-500 text-white font-semibold rounded-full px-1.5 py-0.5">3</span>
              </Link>
            );
          }

          // Standard navigation buttons
          return (
            <Link key={item.href} href={item.href} className={`w-1/5 flex flex-col items-center justify-center gap-1 transition-colors duration-300 ${item.isActive ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}>
              <div className={`transition-transform duration-300 ${item.isActive ? 'transform scale-110' : ''}`}>
                <Icon className="w-7 h-7" />
              </div>
              {/* Show text label only for the active item */}
              <span className={`text-xs font-bold transition-opacity duration-300 ${item.isActive ? 'opacity-100' : 'opacity-0'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default BottomNav;

