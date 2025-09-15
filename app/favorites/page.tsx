"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import BottomNav from '@/app/components/BottomNav';
import ProductCard from '@/app/components/ProductCard';
import { products as allProducts } from '@/app/data/mockData';

// --- SVG Icons ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);

export default function FavoritesPage() {
  // We manage a local state for all products to reflect liking/unliking
  const [products, setProducts] = useState(allProducts);

  // Filter to get only the liked products for display
  const favoriteProducts = useMemo(() => {
    return products.filter(p => p.liked);
  }, [products]);

  const handleLikeToggle = (productId: number) => {
    setProducts(currentProducts => 
      currentProducts.map(p => 
        p.id === productId ? { ...p, liked: !p.liked } : p
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto bg-gray-50 flex flex-col h-screen">
        
        <header className="px-4 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
          <Link href="/" aria-label="Go back">
            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">My Favorites</h1>
        </header>

        <main className="flex-grow overflow-y-auto p-4 pb-24">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">You haven't liked any items yet.</p>
              <Link href="/categories" className="text-orange-500 font-semibold mt-2 inline-block">
                Browse categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {favoriteProducts.map((item) => (
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
          )}
        </main>
        
        <BottomNav />
      </div>
    </div>
  );
}
