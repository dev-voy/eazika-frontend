"use client"; // Required to use hooks

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the hook
import { HomeIcon, CategoryGridIcon, CartIcon, HeartIcon, UserIcon } from '@/app/components/Icons';

const BottomNav = () => {
  const pathname = usePathname(); // Get the current URL path

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-20 px-4">
        {/* Home Link */}
        <Link href="/" className={`flex flex-col items-center transition-colors duration-300 ${pathname === '/' ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`}>
          <div className={`transition-transform duration-300 ${pathname === '/' ? 'transform scale-110' : ''}`}>
            <HomeIcon className="w-7 h-7" />
          </div>
        </Link>
        
        {/* Categories Link */}
        <Link href="/categories" className={`flex flex-col items-center transition-colors duration-300 ${pathname.startsWith('/categories') ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`}>
           <div className={`transition-transform duration-300 ${pathname.startsWith('/categories') ? 'transform scale-110' : ''}`}>
            <CategoryGridIcon className="w-7 h-7" />
           </div>
        </Link>
        
        {/* Cart Link */}
        <Link href="/cart" className="relative flex flex-col items-center text-gray-400 hover:text-orange-500 transition-colors duration-300">
          <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center -mt-10 border-4 shadow-md transition-all duration-300 ${pathname === '/cart' ? 'border-orange-500 transform scale-110' : 'border-gray-50'}`}>
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800">
              <CartIcon className="w-6 h-6"/>
            </div>
          </div>
          <span className="absolute top-1 right-2 text-xs bg-orange-500 text-white rounded-full px-1.5 py-0.5">3</span>
        </Link>
        
        {/* Favorites Link */}
        <Link href="/favorites" className={`flex flex-col items-center transition-colors duration-300 ${pathname === '/favorites' ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`}>
          <div className={`transition-transform duration-300 ${pathname === '/favorites' ? 'transform scale-110' : ''}`}>
            <HeartIcon className="w-7 h-7" />
          </div>
        </Link>
        
        {/* Profile Link */}
        <Link href="/profile" className={`flex flex-col items-center transition-colors duration-300 ${pathname === '/profile' ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`}>
          <div className={`transition-transform duration-300 ${pathname === '/profile' ? 'transform scale-110' : ''}`}>
            <UserIcon className="w-7 h-7" />
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default BottomNav;

