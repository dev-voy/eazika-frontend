"use client";

import { useState, useEffect } from 'react';
import { products as allProducts } from '@/app/data/mockData';

type Product = typeof allProducts[0];
export type CartItem = Product & { quantity: number };

const getInitialCart = (): CartItem[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Failed to parse cart items from localStorage", error);
        return [];
    }
};

export const useCartStore = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        setCartItems(getInitialCart());
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart items to localStorage", error);
        }
    }, [cartItems, isInitialized]);

    const addToCart = (product: Product, quantity: number) => {
        setCartItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === product.id);
            if (existingItem) {
                return currentItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...currentItems, { ...product, quantity }];
        });
    };

    // NEW: Function to update item quantity
    const updateQuantity = (productId: number, amount: number) => {
        setCartItems(currentItems =>
            currentItems.map(item =>
                item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
            ).filter(item => item.quantity > 0) // Automatically remove if quantity is 0
        );
    };

    // NEW: Function to remove an item completely
    const removeFromCart = (productId: number) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== productId));
    };

    return { cartItems, addToCart, updateQuantity, removeFromCart };
};

