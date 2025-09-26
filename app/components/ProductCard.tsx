"use client";

import React from 'react';
import { HeartIcon } from './Icons'; // Corrected import path

type ProductCardProps = {
  name: string;
  price: string;
  image: string;
  liked: boolean;
  onLikeToggle: (event: React.MouseEvent) => void; 
};

const ProductCard = ({ name, price, image, liked, onLikeToggle }: ProductCardProps) => {
  return (
    // Main container with a white background and shadow
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group transition-shadow hover:shadow-lg">
      
      {/* Image container */}
      <div className="relative">
        <div className="aspect-square w-full">
          {/* Reverted to a standard img tag to resolve the build error */}
          <img 
            src={image} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        
        {/* Heart button with no background */}
        <button 
          onClick={onLikeToggle} 
          className="absolute top-2 right-2 p-1.5 z-10 focus:outline-none"
          aria-label={`Like ${name}`}
        >
          <HeartIcon className={`transition-colors ${liked ? 'text-red-500' : 'text-white/80 hover:text-white'}`} filled={liked} />
        </button>
      </div>

      {/* Text content below the image */}
      <div className="p-3">
        <h4 className="font-medium text-gray-700 truncate text-sm">{name}</h4>
        <p className="font-bold text-gray-900 text-base mt-1">{price}</p>
      </div>

    </div>
  );
};

export default ProductCard;

