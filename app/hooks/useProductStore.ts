"use client";

import { useState, useEffect } from 'react';
import { products as initialProducts } from '@/app/data/mockData';

// Define the Product type based on your data structure
type Product = typeof initialProducts[0];

// This logic gets the initial state, checking localStorage for saved likes
const getInitialState = (): Product[] => {
    // If we're on the server, return the default list
    if (typeof window === 'undefined') {
        return initialProducts;
    }
    try {
        const storedLikes = localStorage.getItem('productLikes');
        if (storedLikes) {
            const likedIds = new Set(JSON.parse(storedLikes));
            // Return a new list where the 'liked' status is updated from storage
            return initialProducts.map(product => ({
                ...product,
                liked: likedIds.has(product.id),
            }));
        }
    } catch (error) {
        console.error("Failed to parse product likes from localStorage", error);
    }
    // Return the default list if nothing is in storage
    return initialProducts;
};

// This is our custom hook that all pages will use
export const useProductStore = () => {
    const [products, setProducts] = useState<Product[]>(getInitialState);

    // This effect runs whenever the 'products' state changes, saving the likes to localStorage
    useEffect(() => {
        try {
            const likedIds = products.filter(p => p.liked).map(p => p.id);
            localStorage.setItem('productLikes', JSON.stringify(likedIds));
        } catch (error) {
            console.error("Failed to save product likes to localStorage", error);
        }
    }, [products]);

    // This is the function all components will call to toggle a like
    const handleLikeToggle = (productId: number) => {
        setProducts(currentProducts =>
            currentProducts.map(p =>
                p.id === productId ? { ...p, liked: !p.liked } : p
            )
        );
    };

    return { products, handleLikeToggle };
};
