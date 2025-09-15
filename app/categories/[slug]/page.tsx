"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import BottomNav from '@/app/components/BottomNav';
import ProductCard from '@/app/components/ProductCard';
import { products as allProducts, allCategories } from '@/app/data/mockData';

// --- SVG Icons ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

// CORRECTED: Destructure slug directly from params in the function signature
export default function SpecificCategoryPage({ params: { slug } }: { params: { slug: string } }) {
  
  const categoryProducts = useMemo(() => {
    return allProducts.filter(p => p.category === slug);
  }, [slug]);

  const [products, setProducts] = useState(categoryProducts);
  const [searchTerm, setSearchTerm] = useState('');
  
  const categoryInfo = allCategories.find(c => c.slug === slug);
  const categoryName = categoryInfo ? categoryInfo.name : "Category";

  const searchedProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleLikeToggle = (productId: number) => {
    setProducts(currentProducts => 
      currentProducts.map(p => 
        p.id === productId ? { ...p, liked: !p.liked } : p
      )
    );
  };

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
          <p className="text-gray-700">{categoryInfo?.count || 0} items</p>
        </header>

        <main className="flex-grow overflow-y-auto p-4 pb-24 bg-gray-50">
            <div className="relative mb-6">
                <input 
                    type="text" 
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-full py-3 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {searchedProducts.map((item) => (
                <Link href={`/products/${item.name.toLowerCase().replace(/\s+/g, '-')}`} key={item.id}>
                    <ProductCard 
                        {...item} 
                        onLikeToggle={(e: React.MouseEvent) => {
                            e.preventDefault(); 
                            handleLikeToggle(item.id);
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

