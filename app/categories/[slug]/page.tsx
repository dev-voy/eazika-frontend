"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/app/components/BottomNav';
import ProductCard from '@/app/components/ProductCard';
import { trendingDeals } from '@/app/data/mockData';

// --- SVG Icons (same as before) ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);


export default function SpecificCategoryPage({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState(trendingDeals);

  const handleLikeToggle = (index: number) => {
    const newProducts = [...products];
    newProducts[index].liked = !newProducts[index].liked;
    setProducts(newProducts);
  };
  
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto bg-white flex flex-col h-screen">
        
        <header className="bg-yellow-500/80 backdrop-blur-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center mb-4">
            <Link href="/categories">
              <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
            </Link>
            <button>
              <FilterIcon className="w-6 h-6 text-gray-800" />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{categoryName} Category</h1>
          <p className="text-gray-700">{products.length} items</p>
        </header>

        <main className="flex-grow overflow-y-auto p-4 pb-24 bg-gray-50">
            <div className="relative mb-6">
                <input 
                    type="text" 
                    placeholder="Search here" 
                    className="w-full bg-white border border-gray-200 rounded-full py-3 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {products.map((item, index) => (
                <Link href={`/products/${item.name.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                    <ProductCard 
                        {...item} 
                        // Add the correct type for the event
                        onLikeToggle={(e: React.MouseEvent) => { 
                            e.preventDefault(); 
                            handleLikeToggle(index);
                        }} 
                    />
                </Link>
              ))}
            </div>
        </main>
        
        <BottomNav />
      </div>
    </div>
  );
}