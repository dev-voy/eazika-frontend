"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '@/app/components/MainLayout';
import { ArrowLeftIcon } from '@/app/components/Icons';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PaymentMethodsPage() {
    // Mock data for saved cards
    const cards = [
        { id: 1, last4: '5555', brand: 'Mastercard', isDefault: true, image: '/assests/images/CARD1.jpeg' },
        { id: 2, last4: '1234', brand: 'Visa', isDefault: false, image: '/assests/images/CARD2.jpeg' },
    ];

    return (
        <MainLayout>
            <div className="w-full max-w-5xl mx-auto bg-gray-50 min-h-screen">
                <header className="px-4 md:px-6 py-4 flex items-center justify-between border-b bg-white sticky top-0 z-10">
                    <div className="flex items-center space-x-4">
                        <Link href="/profile" aria-label="Go back to profile">
                            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Payment Methods</h1>
                    </div>
                     <button className="font-semibold text-orange-500 hover:text-orange-600">
                        Add New
                    </button>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-6">
                    <div className="space-y-4">
                       {cards.map((card, index) => (
                           <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex justify-between items-center hover:border-gray-200 transition-colors"
                           >
                                <div className="flex items-center gap-4">
                                    <Image src={card.image} alt={card.brand} width={64} height={40} className="rounded-md" />
                                    <div>
                                        <p className="font-bold text-gray-800">{card.brand} **** {card.last4}</p>
                                        {card.isDefault && <p className="text-xs text-gray-500">Default payment method</p>}
                                    </div>
                                </div>
                                <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                           </motion.div>
                       ))}
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}

