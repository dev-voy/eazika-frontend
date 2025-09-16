"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainLayout from './components/MainLayout';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { ArrowRightIcon } from './components/Icons';
import { categories } from './data/mockData';
import { useProductStore } from './hooks/useProductStore';

export default function HomePage() {
  const { products, handleLikeToggle } = useProductStore();
  const trendingDeals = products.slice(0, 5);

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto bg-white flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow overflow-y-auto px-4 md:px-8 py-6">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="h-48 md:h-64 rounded-2xl p-6 text-white flex flex-col justify-end relative overflow-hidden">
               <Image
                  src="/assests/images/food.jpg"
                  alt="Recommended recipe"
                  fill
                  className="object-cover"
                />
              {/* <div className="bg-black bg-opacity-30 p-3 rounded-lg backdrop-blur-sm inline-block max-w-max relative z-10">
                <h2 className="font-bold text-xl">Recommended</h2>
                <p className="text-lg">Recipe Today</p>
              </div> */}

              {/* make it  dynamic */}
            </div>
          </motion.section>
          
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Link href="/categories" className="flex justify-between items-center mb-4 group">
              <h3 className="text-2xl font-bold text-gray-800">Categories</h3>
              <ArrowRightIcon className="text-gray-500 group-hover:text-orange-500 transition-colors" />
            </Link>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link href={`/categories/${category.slug}`} key={category.slug} className="flex flex-col items-center space-y-2 group">
                    <div className="w-full h-24 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <IconComponent className="w-10 h-10 text-orange-500" />
                    </div>
                    <p className="font-semibold text-gray-700">{category.name}</p>
                  </Link>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Trending Deals</h3>
              <ArrowRightIcon className="text-gray-500" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

