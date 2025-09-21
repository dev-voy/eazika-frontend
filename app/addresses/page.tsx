"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/app/components/MainLayout';
import { ArrowLeftIcon } from '@/app/components/Icons';
import { MapPin, Edit, Trash2, Home, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the type for an address
type Address = {
    id: number;
    type: 'Home' | 'Work';
    details: string;
    isDefault: boolean;
};

// Mock data for existing addresses
const initialAddresses: Address[] = [
    { id: 1, type: 'Home', details: '123 Main Street, Anytown, USA 12345', isDefault: true },
    { id: 2, type: 'Work', details: '456 Business Ave, Suite 500, Workville, USA 67890', isDefault: false },
];

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [isAdding, setIsAdding] = useState(false); // State to toggle the form

    const handleSaveAddress = (newAddress: Omit<Address, 'id'>) => {
        setAddresses(current => [...current, { ...newAddress, id: Date.now() }]);
        setIsAdding(false); // Hide form after saving
    };

    return (
        <MainLayout>
            <div className="w-full max-w-5xl mx-auto bg-gray-50 min-h-screen">
                <header className="px-4 md:px-6 py-4 flex items-center justify-between border-b bg-white sticky top-0 z-10">
                    <div className="flex items-center space-x-4">
                        <Link href="/profile" aria-label="Go back to profile">
                            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Delivery Addresses</h1>
                    </div>
                     <button onClick={() => setIsAdding(true)} className="font-semibold text-orange-500 hover:text-orange-600">
                        Add New
                    </button>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-6">
                    <AnimatePresence>
                        {isAdding ? (
                            <AddAddressForm onSave={handleSaveAddress} onCancel={() => setIsAdding(false)} />
                        ) : (
                            <AddressList addresses={addresses} />
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </MainLayout>
    );
}

// --- Reusable Components for the page ---

const AddressList = ({ addresses }: { addresses: Address[] }) => (
    <div className="space-y-4">
        {addresses.map((address, index) => (
            <motion.div 
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex justify-between items-start"
            >
                <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-800">{address.type}</h3>
                            {address.isDefault && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Default</span>}
                        </div>
                        <p className="text-gray-600 mt-1">{address.details}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
            </motion.div>
        ))}
    </div>
);

const AddAddressForm = ({ onSave, onCancel }: { onSave: (address: Omit<Address, 'id'>) => void, onCancel: () => void }) => {
    const [type, setType] = useState<'Home' | 'Work'>('Home');
    const [details, setDetails] = useState('');
    const [isDefault, setIsDefault] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!details) return; // Simple validation
        onSave({ type, details, isDefault });
    };

    return (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
            <h2 className="text-xl font-bold mb-4">Add New Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Address Type</label>
                    <div className="flex gap-2 mt-2">
                        <button type="button" onClick={() => setType('Home')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${type === 'Home' ? 'bg-orange-50 border-orange-500 text-orange-600' : 'bg-gray-100 border-transparent text-gray-600'}`}>
                           <Home className="w-4 h-4" /> Home
                        </button>
                         <button type="button" onClick={() => setType('Work')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${type === 'Work' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-gray-100 border-transparent text-gray-600'}`}>
                           <Briefcase className="w-4 h-4" /> Work
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="details" className="text-sm font-medium text-gray-700">Full Address</label>
                    <textarea 
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="e.g. 123 Main Street, Anytown, USA 12345"
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm p-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        rows={3}
                    />
                </div>
                 <div className="flex items-center">
                    <input id="isDefault" type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                    <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">Set as default address</label>
                </div>
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-full text-center hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="w-full bg-yellow-400 text-gray-800 font-bold py-3 rounded-full text-center hover:bg-yellow-500 transition-colors">
                        Save Address
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

