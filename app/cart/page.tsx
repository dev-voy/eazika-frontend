"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import MainLayout from '@/app/components/MainLayout';
import { products } from '@/app/data/mockData';

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

// --- MODERNIZED Cart Item Component ---
const CartItem = ({ 
    item, 
    onQuantityChange, 
    onRemove 
}: { 
    item: CartItemType, 
    onQuantityChange: (id: number, amount: number) => void,
    onRemove: (id: number) => void
}) => {
    const itemTotalPrice = (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2);

    return (
        <div className="relative rounded-2xl shadow-sm overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-24 bg-gray-800 flex items-center justify-center">
                <TrashIcon className="w-6 h-6 text-white" />
            </div>

            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                    if (info.offset.x < -100) {
                        onRemove(item.id);
                    }
                }}
                className="relative bg-white p-4 flex items-center gap-4 z-10"
            >
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 bg-yellow-400 text-gray-800 text-sm font-bold px-3 py-1 rounded-tr-xl">
                        {item.price}
                    </div>
                </div>
                <div className="flex-grow">
                    <p className="text-xs font-semibold text-gray-500 uppercase">{item.category}</p>
                    <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                    <p className="font-bold text-orange-500 mt-1">${itemTotalPrice}</p>
                </div>
                <div className="flex items-center space-x-3 bg-gray-100 border border-gray-200 rounded-full px-2 py-1">
                    <button onClick={() => onQuantityChange(item.id, -1)} className="text-gray-600"><MinusIcon className="w-4 h-4"/></button>
                    <span className="text-md font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => onQuantityChange(item.id, 1)} className="text-gray-600"><PlusIcon className="w-4 h-4"/></button>
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

  const OrderSummary = () => (
    <div className="bg-white p-4 rounded-2xl shadow-sm border">
        <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
        </div>
        <Link href="/checkout" className="block w-full bg-yellow-400 text-gray-800 font-bold py-4 rounded-full text-center hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/30">
                PROCEED TO CHECKOUT
        </Link>
    </div>
  );

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto bg-gray-50 min-h-screen">
        
        <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-20">
            <Link href="/" aria-label="Go back" className="mb-2 block">
              <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        </header>
        
        {/* Responsive Layout: 2 columns on desktop, 1 on mobile */}
        <div className="p-4 md:p-6 lg:grid lg:grid-cols-3 lg:gap-8">
            <main className="lg:col-span-2">
                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl">
                    <p className="text-gray-500">Your cart is empty.</p>
                    </div>
                ) : (
                    <AnimatePresence>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
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
            
            {/* Order Summary: Sticky on desktop, static footer on mobile */}
            {cartItems.length > 0 && (
                <>
                    {/* Desktop Summary */}
                    <aside className="hidden lg:block lg:sticky lg:top-24 h-fit">
                        <OrderSummary />
                    </aside>
                    {/* Mobile Summary */}
                    <footer className="lg:hidden bg-white p-4 border-t fixed bottom-20 left-0 right-0 w-full max-w-md mx-auto">
                        <OrderSummary />
                    </footer>
                </>
            )}
        </div>
      </div>
    </MainLayout>
  );
}

