"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MainLayout from '@/app/components/MainLayout';
import ProductCard from '@/app/components/ProductCard';
import { useProductStore } from '@/app/hooks/useProductStore';
import { ArrowLeftIcon } from '@/app/components/Icons';

export default function TrendingDealsPage() {
  const { products, handleLikeToggle } = useProductStore();

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
          <Link href="/home" aria-label="Go back to home">
            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">All Deals</h1>
        </header>
        <main className="flex-grow overflow-y-auto p-4 md:p-6">
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((item) => (
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
        </main>
      </div>
    </MainLayout>
  );
}
