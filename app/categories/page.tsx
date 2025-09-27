"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MainLayout from '../components/MainLayout';
import { allCategories } from '../data/mockData';

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

export default function CategoriesPage() {
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
      <div className="w-full max-w-7xl mx-auto bg-gray-50 flex flex-col min-h-screen">
        <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
          <Link href="/home" aria-label="Go back">
            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">All Categories</h1>
        </header>
        <main className="flex-grow overflow-y-auto p-4 md:p-6">
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {allCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.div key={category.slug} variants={itemVariants} className="relative group">
                  <Link href={`/categories/${category.slug}`} className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 aspect-square">
                    <div className="w-16 h-16 flex items-center justify-center">
                       <IconComponent className="w-10 h-10 text-orange-500" />
                    </div>
                    {/* CORRECTED: Added truncate class to prevent wrapping */}
                    <p className="text-lg font-bold text-orange-500 text-center truncate w-full px-1">{category.name}</p>
                    <p className="text-sm text-gray-500">{category.count} items</p>
                  </Link>
                   {/* Tooltip for desktop */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block w-auto whitespace-nowrap">
                      <div className="bg-gray-800 text-white text-xs rounded py-1 px-2">
                          {category.name}
                      </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </main>
      </div>
    </MainLayout>
  );
}

