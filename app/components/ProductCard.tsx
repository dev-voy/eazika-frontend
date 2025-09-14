"use client";

import React from 'react'; // Make sure React is imported
import { HeartIcon } from './Icons';

type ProductCardProps = {
  name: string;
  price: string;
  image: string;
  liked: boolean;
  // Update the type to accept a mouse event
  onLikeToggle: (event: React.MouseEvent) => void; 
};

const ProductCard = ({ name, price, image, liked, onLikeToggle }: ProductCardProps) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm relative aspect-[3/4]">
      <img src={image} alt={name} className="w-full h-full object-cover" />
      
      <button 
        onClick={onLikeToggle} 
        className="absolute top-2 right-2 bg-white/50 p-1.5 rounded-full backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        aria-label={`Like ${name}`}
      >
        <HeartIcon className={liked ? 'text-red-500' : 'text-gray-700'} filled={liked} />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm font-bold">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;