"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, CategoryGridIcon, CartIcon, HeartIcon, UserIcon } from './Icons';
import { useCartStore } from '../hooks/useCartStore'; // Corrected import path

const BottomNav = () => {
  const pathname = usePathname();
  const { cartItems } = useCartStore(); 

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { href: '/home', label: 'Home', icon: HomeIcon, isActive: pathname === '/home' },
    { href: '/categories', label: 'Categories', icon: CategoryGridIcon, isActive: pathname.startsWith('/categories') },
    { href: '/cart', label: 'Cart', icon: CartIcon, isCart: true, isActive: pathname === '/cart' },
    { href: '/favorites', label: 'Favorites', icon: HeartIcon, isActive: pathname === '/favorites' },
    { href: '/profile', label: 'Profile', icon: UserIcon, isActive: pathname === '/profile' },
  ];

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isCart) {
            return (
              <Link key={item.href} href={item.href} className="relative w-1/5 flex justify-center">
                <div className={`transition-transform duration-300 ${item.isActive ? 'transform scale-110' : ''}`}>
                    <div className={`w-14 h-14 bg-white rounded-full flex items-center justify-center -mt-8 border-4 shadow-md transition-colors duration-300 ${item.isActive ? 'border-orange-500' : 'border-gray-100'}`}>
                        <div className="w-11 h-11 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800">
                            <Icon className="w-5 h-5"/>
                        </div>
                    </div>
                </div>
                {totalItems > 0 && (
                    <span className="absolute top-0 right-1 text-xs bg-orange-500 text-white font-semibold rounded-full px-1.5 py-0.5">
                        {totalItems}
                    </span>
                )}
              </Link>
            );
          }
          return (
            <Link key={item.href} href={item.href} className={`w-1/5 flex flex-col items-center justify-center gap-1 transition-colors duration-300 ${item.isActive ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}>
              <div className={`transition-transform duration-300 ${item.isActive ? 'transform scale-110' : ''}`}>
                <Icon className="w-6 h-6" />
              </div>
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

