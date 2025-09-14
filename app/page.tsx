"use client"; // Add this line for state management

import React, { useState } from 'react';
import Link from 'next/link'; // Import the Link component
import Header from '@/app/components/Header';
import ProductCard from '@/app/components/ProductCard';
import BottomNav from '@/app/components/BottomNav';
import Sidebar from '@/app/components/Sidebar';
import { ArrowRightIcon } from '@/app/components/Icons';
import { categories, trendingDeals as initialDeals } from '@/app/data/mockData';

export default function HomePage() {
  // Manage the liked state of products
  const [trendingDeals, setTrendingDeals] = useState(initialDeals);

  const handleLikeToggle = (index: number) => {
    const newDeals = [...trendingDeals];
    newDeals[index].liked = !newDeals[index].liked;
    setTrendingDeals(newDeals);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Sidebar />
      <BottomNav />
      <div className="md:ml-64">
        <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 bg-white flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow overflow-y-auto px-4 md:px-8 py-6">
            <section className="mb-8">
              <div className="h-48 md:h-64 rounded-2xl bg-cover bg-center p-6 text-white flex flex-col justify-end" style={{backgroundImage: "url('https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200&fit=max')"}}>
                <div className="bg-black bg-opacity-30 p-3 rounded-lg backdrop-blur-sm inline-block max-w-max">
                  <h2 className="font-bold text-xl">Recommended</h2>
                </div>
              </div>
            </section>
            <section className="mb-8">
              <Link href="/categories" className="flex justify-between items-center mb-4 group">
                <h3 className="text-2xl font-bold text-gray-800">Categories</h3>
                <ArrowRightIcon className="text-gray-500 group-hover:text-orange-500 transition-colors" />
              </Link>
              <div className="flex space-x-4">
                {categories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <Link href="/categories" key={index} className="flex flex-col items-center space-y-2 group">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                        <IconComponent />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Trending Deals</h3>
                <ArrowRightIcon className="text-gray-500" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {trendingDeals.map((item, index) => (
                  <ProductCard 
                    key={index} 
                    {...item} 
                    onLikeToggle={() => handleLikeToggle(index)} 
                  />
                ))}
              </div>
            </section>
            <div className="mt-10 text-center">
              <button className="bg-gray-800 text-white font-bold py-3 px-12 rounded-full shadow-lg hover:bg-gray-700 transition-colors">
                More
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

