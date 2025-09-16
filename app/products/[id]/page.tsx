"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation'; // Import the useParams hook
import { products as allProducts } from '@/app/data/mockData';
import MainLayout from '@/app/components/MainLayout';

// --- SVG Icons ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
const ShareIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
);
const StarIcon = ({ className, filled }: { className?: string; filled: boolean }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
const PlusIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const MinusIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const HeartIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);

// REMOVED params from function signature
export default function ProductPage() {
  const params = useParams(); // Use the hook to get params
  const id = params.id as string; // Get the id from the params object

  const product = allProducts.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');

  if (!product) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      </MainLayout>
    );
  }
  
  const pricePerItem = parseFloat(product.price.replace('$', ''));
  const totalPrice = (quantity * pricePerItem).toFixed(2);
  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto bg-white min-h-screen">
          <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
              <Link href={`/categories/${product.category}`} aria-label="Go back to category">
                  <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
              </Link>
              <h1 className="text-xl font-bold text-gray-800 hidden md:block">{product.name}</h1>
          </header>
          
          <div className="md:grid md:grid-cols-2 md:gap-12 p-4 md:p-8">
              <div className="md:sticky md:top-24 h-fit">
                  <div className="aspect-square w-full relative rounded-2xl overflow-hidden shadow-lg">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                    <button className="absolute top-4 right-4 bg-white/50 p-2 rounded-full backdrop-blur-sm">
                        <ShareIcon className="w-6 h-6 text-gray-800" />
                    </button>
                  </div>
              </div>

              <div className="mt-6 md:mt-0">
                  <p className="text-sm font-bold text-gray-500">{product.category.toUpperCase()}</p>
                  <h1 className="text-4xl font-bold text-gray-800 mt-1">{product.name}</h1>
                  
                  <div className="flex justify-between items-center mt-4">
                      <p className="text-3xl font-bold text-gray-800">${pricePerItem.toFixed(2)}</p>
                      <div className="flex items-center space-x-3 bg-gray-100 border border-gray-200 rounded-full px-3 py-2">
                          <button onClick={() => handleQuantityChange(-1)}><MinusIcon className="w-5 h-5 text-gray-600"/></button>
                          <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                          <button onClick={() => handleQuantityChange(1)}><PlusIcon className="w-5 h-5 text-gray-600"/></button>
                      </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4 text-gray-600">
                      <StarIcon className="w-5 h-5 text-yellow-400" filled={true}/>
                      <span className="font-bold">4.5</span>
                      <span className="text-sm">(128 reviews)</span>
                  </div>
                  
                  <div className="mt-6 border-b border-gray-200">
                      <nav className="-mb-px flex space-x-6">
                          <button onClick={() => setActiveTab('Description')} className={`py-3 px-1 border-b-2 font-semibold ${activeTab === 'Description' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'}`}>Description</button>
                          <button onClick={() => setActiveTab('Review')} className={`py-3 px-1 border-b-2 font-semibold ${activeTab === 'Review' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'}`}>Review</button>
                          <button onClick={() => setActiveTab('Discussion')} className={`py-3 px-1 border-b-2 font-semibold ${activeTab === 'Discussion' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'}`}>Discussion</button>
                      </nav>
                  </div>
                  
                  <div className="mt-4 text-gray-600 min-h-[100px]">
                      {activeTab === 'Description' && <p>A delicious and fresh {product.name.toLowerCase()}, perfect for a healthy lifestyle. Enjoy the rich flavors and nutrients packed in this high-quality product.</p>}
                      {activeTab === 'Review' && <p>Reviews will be shown here.</p>}
                      {activeTab === 'Discussion' && <p>Discussion content will appear here.</p>}
                  </div>

                  <div className="mt-8 flex items-center space-x-4">
                      <button className="p-4 bg-green-100 rounded-full">
                          <HeartIcon className="w-6 h-6 text-green-500"/>
                      </button>
                      <button className="flex-grow bg-yellow-400 text-gray-800 font-bold py-4 rounded-full text-center shadow-lg shadow-yellow-400/30 hover:bg-yellow-500 transition-colors">
                          ADD TO CART - ${totalPrice}
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </MainLayout>
  );
}

