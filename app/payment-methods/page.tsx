"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/app/components/MainLayout';
import { ArrowLeftIcon } from '@/app/components/Icons';
import { Trash2, Landmark } from 'lucide-react'; // CORRECTED: Removed unused 'CreditCard' import
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Define the types for our payment methods
type Card = {
    id: number;
    type: 'card';
    last4: string;
    brand: string;
    isDefault: boolean;
    image: string;
};
type Upi = {
    id: number;
    type: 'upi';
    address: string;
    isDefault: boolean;
};
type PaymentMethod = Card | Upi;

// A helper type for the new method, omitting the 'id'
type NewPaymentMethod = Omit<Card, 'id'> | Omit<Upi, 'id'>;

// Mock data for existing methods
const initialMethods: PaymentMethod[] = [
    { id: 1, type: 'card', last4: '5555', brand: 'Mastercard', isDefault: true, image: '/assests/images/CARD1.jpeg' },
    { id: 2, type: 'upi', address: 'user@bank', isDefault: false },
];

export default function PaymentMethodsPage() {
    const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);
    const [isAdding, setIsAdding] = useState(false);

    const handleSaveMethod = (newMethod: NewPaymentMethod) => {
        setMethods(current => [...current, { ...newMethod, id: Date.now() }] as PaymentMethod[]);
        setIsAdding(false);
    };

    const handleDeleteMethod = (idToDelete: number) => {
        setMethods(current => current.filter(method => method.id !== idToDelete));
    };

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
                     <button onClick={() => setIsAdding(true)} className="font-semibold text-orange-500 hover:text-orange-600">
                        Add New
                    </button>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-6">
                    <AnimatePresence mode="wait">
                        {isAdding ? (
                            <AddPaymentMethodForm key="add-form" onSave={handleSaveMethod} onCancel={() => setIsAdding(false)} />
                        ) : (
                            <PaymentMethodList key="list" methods={methods} onDelete={handleDeleteMethod} />
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </MainLayout>
    );
}

// --- Reusable Components for the page ---

const PaymentMethodList = ({ methods, onDelete }: { methods: PaymentMethod[], onDelete: (id: number) => void }) => (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
    >
        {methods.map((method, index) => (
            <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                layout
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex justify-between items-center"
            >
                <div className="flex items-center gap-4">
                    {method.type === 'card' ? (
                        <Image src={method.image} alt={method.brand} width={64} height={40} className="rounded-md" />
                    ) : (
                        <div className="w-16 h-10 flex items-center justify-center bg-gray-100 rounded-md">
                           <Landmark className="w-8 h-8 text-gray-600"/>
                        </div>
                    )}
                    <div>
                        <p className="font-bold text-gray-800">
                            {method.type === 'card' ? `${method.brand} **** ${method.last4}` : method.address}
                        </p>
                        {method.isDefault && <p className="text-xs text-gray-500">Default payment method</p>}
                    </div>
                </div>
                <button onClick={() => onDelete(method.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                    <Trash2 className="w-5 h-5" />
                </button>
            </motion.div>
        ))}
    </motion.div>
);

const AddPaymentMethodForm = ({ onSave, onCancel }: { onSave: (method: NewPaymentMethod) => void, onCancel: () => void }) => {
    const [type, setType] = useState<'card' | 'upi'>('card');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (type === 'card') {
            onSave({ type: 'card', last4: '1234', brand: 'Visa', isDefault: false, image: '/assests/images/CARD2.jpeg' });
        } else {
            onSave({ type: 'upi', address: formData.get('upiAddress') as string, isDefault: false });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 max-w-lg mx-auto"
        >
            <h2 className="text-xl font-bold mb-4">Add New Payment Method</h2>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-full mb-6">
                <button onClick={() => setType('card')} className={`w-full py-2 rounded-full font-semibold ${type === 'card' ? 'bg-white shadow' : 'text-gray-600'}`}>Card</button>
                <button onClick={() => setType('upi')} className={`w-full py-2 rounded-full font-semibold ${type === 'upi' ? 'bg-white shadow' : 'text-gray-600'}`}>UPI</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                    {type === 'card' ? (
                        <motion.div key="card-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Card Number</label>
                                <input name="cardNumber" placeholder="XXXX XXXX XXXX XXXX" className="mt-1 block w-full bg-white border border-gray-300 rounded-xl p-3" />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-700">Expiry</label>
                                    <input name="expiry" placeholder="MM/YY" className="mt-1 block w-full bg-white border border-gray-300 rounded-xl p-3" />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-700">CVV</label>
                                    <input name="cvv" placeholder="123" className="mt-1 block w-full bg-white border border-gray-300 rounded-xl p-3" />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="upi-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <label className="text-sm font-medium text-gray-700">UPI ID</label>
                            <input name="upiAddress" placeholder="yourname@bank" className="mt-1 block w-full bg-white border border-gray-300 rounded-xl p-3" />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-full text-center hover:bg-gray-300 transition-colors">Cancel</button>
                    <button type="submit" className="w-full bg-yellow-400 text-gray-800 font-bold py-3 rounded-full text-center hover:bg-yellow-500 transition-colors">Save</button>
                </div>
            </form>
        </motion.div>
    );
};

