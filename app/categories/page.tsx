"use client";

import React from 'react';
import Link from 'next/link';
import BottomNav from '../components/BottomNav';
import { allCategories } from '../data/mockData';

// --- SVG Icons ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

export default function CategoriesPage() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto bg-gray-50 flex flex-col h-screen">
        <header className="px-4 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
          <Link href="/" aria-label="Go back">
            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">All Categories</h1>
        </header>
        <main className="flex-grow overflow-y-auto p-4 pb-24">
          <div className="grid grid-cols-2 gap-4">
            {allCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link href={`/categories/${category.slug}`} key={category.slug} className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 aspect-square">
                  <div className="w-16 h-16 flex items-center justify-center">
                     <IconComponent className="w-10 h-10 text-orange-500" />
                  </div>
                  <p className="text-lg font-bold text-orange-500">{category.name}</p>
                  <p className="text-sm text-gray-500">{category.count} items</p>
                </Link>
              )
            })}
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

