"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import motion
import MainLayout from '@/app/components/MainLayout';
import ProductCard from '@/app/components/ProductCard';
import { useProductStore } from '@/app/hooks/useProductStore';
import { HeartIcon } from '@/app/components/Icons';

// --- SVG Icons ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);

export default function FavoritesPage() {
  const { products, handleLikeToggle } = useProductStore();

  const favoriteProducts = useMemo(() => {
    return products.filter(p => p.liked);
  }, [products]);

  // Animation variants for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto bg-gray-50 min-h-screen">
        
        <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
          <Link href="/" aria-label="Go back">
            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
        </header>

        <main className="flex-grow overflow-y-auto p-4 md:p-6">
          {favoriteProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20 flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm h-full"
            >
              <HeartIcon className="w-16 h-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-bold text-gray-700">Your Wishlist is Empty</h2>
              <p className="text-gray-500 mt-2 max-w-xs">Looks like you haven't added anything to your wishlist yet. Let's find something you'll love!</p>
              <Link href="/categories" className="text-white bg-orange-500 font-semibold mt-6 py-3 px-6 rounded-full hover:bg-orange-600 transition-colors">
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {favoriteProducts.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Link href={`/products/${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <ProductCard 
                          {...item} 
                          onLikeToggle={(e: React.MouseEvent) => {
                              e.preventDefault(); 
                              handleLikeToggle(item.id);
                          }} 
                      />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}

