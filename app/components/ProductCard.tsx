"use client";

import React from 'react';
import { HeartIcon } from '@/app/components/Icons'; // Using full alias path to ensure resolution

type ProductCardProps = {
  name: string;
  price: string;
  image: string;
  liked: boolean;
  onLikeToggle: (event: React.MouseEvent) => void; 
};

const ProductCard = ({ name, price, image, liked, onLikeToggle }: ProductCardProps) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm relative aspect-[3/4] group">
      {/* Reverted to a standard img tag to resolve the build error */}
      <img 
        src={image} 
        alt={name} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
      />
      
      <button 
        onClick={onLikeToggle} 
        className="absolute top-2 right-2 bg-white/50 p-1.5 rounded-full backdrop-blur-sm z-10 focus:outline-none"
        aria-label={`Like ${name}`}
      >
        <HeartIcon className={liked ? 'text-red-500' : 'text-gray-700'} filled={liked} />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white z-10">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm font-bold">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

