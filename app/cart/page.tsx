"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { products } from '@/app/data/mockData';
import BottomNav from '@/app/components/BottomNav';

// --- SVG Icons ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
const PlusIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const MinusIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const TrashIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

// --- Mock Data & Types ---
const initialCartItems = [
    { ...products[0], quantity: 2 },
    { ...products[5], quantity: 1 },
    { ...products[2], quantity: 3 },
];

type CartItemType = typeof initialCartItems[0];

// --- Reusable Cart Item Component ---
const CartItem = ({ 
    item, 
    onQuantityChange, 
    onRemove 
}: { 
    item: CartItemType, 
    onQuantityChange: (id: number, amount: number) => void,
    onRemove: (id: number) => void
}) => {
    return (
        <div className="relative rounded-2xl shadow-sm overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-24 bg-red-500 flex items-center justify-center">
                <TrashIcon className="w-6 h-6 text-white" />
            </div>

            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                    if (info.offset.x < -100) {
                        onRemove(item.id);
                    }
                }}
                className="relative bg-white p-3 flex items-center z-10"
            >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow ml-4">
                    <h2 className="font-bold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.price}</p>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-3 bg-gray-100 border border-gray-200 rounded-full px-2 py-1">
                            <button onClick={() => onQuantityChange(item.id, -1)}><MinusIcon className="w-4 h-4 text-gray-600"/></button>
                            <span className="text-md font-bold">{item.quantity}</span>
                            <button onClick={() => onQuantityChange(item.id, 1)}><PlusIcon className="w-4 h-4 text-gray-600"/></button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};


export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };
  
  const handleRemoveItem = (id: number) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  }, [cartItems]);

  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto bg-gray-50 flex flex-col h-screen">
        
        <header className="px-4 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-20">
          <Link href="/" aria-label="Go back">
            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">My Cart</h1>
        </header>

        <main className="flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                  >
                    <CartItem 
                        item={item} 
                        onQuantityChange={handleQuantityChange} 
                        onRemove={handleRemoveItem} 
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </main>
        
        {cartItems.length > 0 && (
            <footer className="bg-white p-4 border-t sticky bottom-20 md:bottom-0">
                <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-gray-800 pt-2">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                </div>
                {/* WRAPPED THE BUTTON IN A LINK */}
                <Link href="/checkout" className="block w-full mt-4 bg-yellow-400 text-gray-800 font-bold py-4 rounded-full text-center hover:bg-yellow-500 transition-colors">
                    PROCEED TO CHECKOUT
                </Link>
            </footer>
        )}
        
        <BottomNav />
      </div>
    </div>
  );
}

