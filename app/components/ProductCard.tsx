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
    <div className="rounded-2xl overflow-hidden shadow-sm relative aspect-[3/4] group">
      {/* UPDATED: Replaced <img> with the optimized Next.js <Image> component */}
      <Image 
        src={image} 
        alt={name} 
        fill
        sizes="(max-width: 640px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300" 
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

