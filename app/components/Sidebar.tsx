"use client"; // Required to use hooks

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the hook
import { HomeIcon, CategoryGridIcon, CartIcon, HeartIcon, UserIcon } from './Icons';

const Sidebar = () => {
  const pathname = usePathname(); // Get the current URL path

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen px-4 py-8 bg-white border-r fixed">
      <h2 className="text-3xl font-bold text-orange-500 mb-8">Eazika</h2>
      <div className="flex flex-col justify-between flex-1">
        <nav>
          <Link href="/" className={`flex items-center px-4 py-2 rounded-md ${isActive('/') ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <HomeIcon className="w-6 h-6" />
            <span className="mx-4 font-medium">Home</span>
          </Link>
          <Link href="/categories" className={`flex items-center px-4 py-2 mt-5 rounded-md ${pathname.startsWith('/categories') ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <CategoryGridIcon className="w-6 h-6" />
            <span className="mx-4 font-medium">Categories</span>
          </Link>
          <Link href="/cart" className={`flex items-center px-4 py-2 mt-5 rounded-md ${isActive('/cart') ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <CartIcon className="w-6 h-6" />
            <span className="mx-4 font-medium">Cart</span>
          </Link>
          <Link href="/favorites" className={`flex items-center px-4 py-2 mt-5 rounded-md ${isActive('/favorites') ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <HeartIcon className="w-6 h-6" />
            <span className="mx-4 font-medium">Favorites</span>
          </Link>
          <Link href="/profile" className={`flex items-center px-4 py-2 mt-5 rounded-md ${isActive('/profile') ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <UserIcon className="w-6 h-6" />
            <span className="mx-4 font-medium">Profile</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

