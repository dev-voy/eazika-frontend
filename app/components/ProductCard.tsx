"use client";

import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component
import { HeartIcon } from '@/app/components/Icons';

type ProductCardProps = {
  name: string;
  price: string;
  image: string;
  liked: boolean;
  onLikeToggle: (event: React.MouseEvent) => void; 
};

const ProductCard = ({ name, price, image, liked, onLikeToggle }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group transition-shadow hover:shadow-lg">
      
      <div className="relative">
        <div className="aspect-square w-full">
          {/* UPDATED: Replaced <img> with the optimized Next.js <Image> component */}
          <Image 
            src={image} 
            alt={name} 
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        
        <button 
          onClick={onLikeToggle} 
          className="absolute top-2 right-2 p-1.5 z-10 focus:outline-none"
          aria-label={`Like ${name}`}
        >
          <HeartIcon className={`transition-colors ${liked ? 'text-red-500' : 'text-white/80 hover:text-white'}`} filled={liked} />
        </button>
      </div>

      <div className="p-3">
        <h4 className="font-medium text-gray-700 truncate text-sm">{name}</h4>
        <p className="font-bold text-gray-900 text-base mt-1">{price}</p>
      </div>

    </div>
  );
};

export default ProductCard;

