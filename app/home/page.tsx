"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainLayout from '@/app/components/MainLayout';
import Header from '@/app/components/Header';
import ProductCard from '@/app/components/ProductCard';
import { ArrowRightIcon } from '@/app/components/Icons';
import { categories, products as allProducts } from '@/app/data/mockData';
import { useProductStore } from '@/app/hooks/useProductStore';

const SearchIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

export default function HomePage() {
  const { products, handleLikeToggle } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');

  const trendingDeals = useMemo(() => {
    if (searchTerm) {
        return products.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    return products.slice(0, 5);
  }, [products, searchTerm]);

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto bg-white flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow overflow-y-auto px-4 md:px-8 py-6 pb-24 md:pb-6">
          
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-100 border border-transparent rounded-full py-3 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
            </div>
          </motion.section>

          {!searchTerm && (
            <>
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
              >
                <div className="aspect-[5/2] md:aspect-[4/1] rounded-2xl p-4 sm:p-6 text-white flex flex-col justify-end relative overflow-hidden">
                   <Image
                      src="/assests/images/food.jpg"
                      alt="Recommended recipe"
                      fill
                      className="object-cover"
                    />
                  {/* <div className="bg-black bg-opacity-30 p-3 rounded-lg backdrop-blur-sm inline-block max-w-max relative z-10">
                    <h2 className="font-bold text-lg sm:text-xl">Recommended</h2>
                    <p className="text-base sm:text-lg">Recipe Today</p>
                  </div> */}
                </div>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <Link href="/categories" className="flex justify-between items-center mb-4 group">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">Categories</h3>
                  <ArrowRightIcon className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors" />
                </Link>
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Link href={`/categories/${category.slug}`} key={category.slug} className="flex flex-col items-center space-y-2 group">
                        <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
                        </div>
                        {/* CORRECTED: Added truncate class to prevent wrapping */}
                        <p className="font-semibold text-sm text-gray-700 text-center truncate w-full">{category.name}</p>
                      </Link>
                    );
                  })}
                </div>
              </motion.section>
            </>
          )}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/trending-deals" className="flex justify-between items-center mb-4 group">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                {searchTerm ? 'Search Results' : 'Trending Deals'}
              </h3>
              {!searchTerm && <ArrowRightIcon className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors" />}
            </Link>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {trendingDeals.map((item) => (
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
          </motion.section>
        </main>
      </div>
    </MainLayout>
  );
}

