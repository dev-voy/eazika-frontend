"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/app/components/MainLayout';
import { ArrowLeftIcon } from '@/app/components/Icons';
import { MapPin, Edit, Trash2, Home, Briefcase, AlertTriangle, LocateFixed, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Type Definitions and Mock Data ---
type Address = {
    id: number;
    type: 'Home' | 'Work';
    details: string;
    isDefault: boolean;
};

const initialAddresses: Address[] = [
    { id: 1, type: 'Home', details: '123 Main Street, Anytown, USA 12345', isDefault: true },
    { id: 2, type: 'Work', details: '456 Business Ave, Suite 500, Workville, USA 67890', isDefault: false },
];

// --- Confirmation Modal for Deletion ---
const DeleteConfirmationModal = ({ address, onConfirm, onCancel }: { address: Address, onConfirm: () => void, onCancel: () => void }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500 bg-red-50 p-2 rounded-full" />
            <h2 className="text-2xl font-bold mt-4">Delete Address?</h2>
                <p className="mt-2 text-gray-600">  Are you sure you want to delete your &quot;{address.type}&quot; address? This action cannot be undone.</p>
            <div className="flex gap-4 mt-6">
                <button onClick={onCancel} className="w-full bg-gray-200 py-3 rounded-full font-semibold hover:bg-gray-300">Cancel</button>
                <button onClick={onConfirm} className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600">Delete</button>
            </div>
        </motion.div>
    </motion.div>
);

// --- Form for Adding/Editing Addresses ---
const AddressForm = ({ addressToEdit, onSave, onCancel }: { addressToEdit: Partial<Address>, onSave: (address: Omit<Address, 'id'> | Address) => void, onCancel: () => void }) => {
    const [type, setType] = useState<'Home' | 'Work'>(addressToEdit.type || 'Home');
    const [details, setDetails] = useState(addressToEdit.details || '');
    const [isDefault, setIsDefault] = useState(addressToEdit.isDefault || false);
    const isEditing = !!addressToEdit.id;

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // In a real app, you would use a reverse geocoding service here.
                    // For this demo, we'll just fill in the coordinates.
                    setDetails(`Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`);
                },
                () => {
                    alert("Could not get your location. Please check your browser permissions.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!details) return;
        const newAddress = { ...addressToEdit, type, details, isDefault };
        onSave(newAddress);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Address' : 'Add New Address'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Address Type</label>
                    <div className="flex gap-2 mt-2">
                        <button type="button" onClick={() => setType('Home')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${type === 'Home' ? 'bg-orange-50 border-orange-500 text-orange-600' : 'bg-gray-100 border-transparent text-gray-600'}`}><Home className="w-4 h-4" /> Home</button>
                        <button type="button" onClick={() => setType('Work')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${type === 'Work' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-gray-100 border-transparent text-gray-600'}`}><Briefcase className="w-4 h-4" /> Work</button>
                    </div>
                </div>
                <div>
                    <label htmlFor="details" className="text-sm font-medium text-gray-700">Full Address</label>
                    <div className="relative mt-1">
                        <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="e.g. 123 Main Street, Anytown, USA 12345" className="block w-full bg-white border border-gray-300 rounded-xl shadow-sm p-3 pr-12 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" rows={3}/>
                        <button type="button" onClick={handleUseCurrentLocation} className="absolute top-2 right-2 p-2 text-gray-500 hover:text-orange-500 transition-colors" title="Use my current location">
                            <LocateFixed className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="flex items-center">
                    <input id="isDefault" type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                    <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">Set as default address</label>
                </div>
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-full text-center hover:bg-gray-300 transition-colors">Cancel</button>
                    <button type="submit" className="w-full bg-yellow-400 text-gray-800 font-bold py-3 rounded-full text-center hover:bg-yellow-500 transition-colors">Save Address</button>
                </div>
            </form>
        </motion.div>
    );
};

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [addressToEdit, setAddressToEdit] = useState<Partial<Address> | null>(null);
    const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

    const handleSaveAddress = (address: Omit<Address, 'id'> | Address) => {
        if ('id' in address) {
            setAddresses(current => current.map(a => a.id === address.id ? address : a));
        } else {
            setAddresses(current => [...current, { ...address, id: Date.now() }]);
        }
        setAddressToEdit(null);
    };

    const handleConfirmDelete = () => {
        if (addressToDelete) {
            setAddresses(current => current.filter(a => a.id !== addressToDelete.id));
            setAddressToDelete(null);
        }
    };

    return (
        <MainLayout>
            <div className="w-full bg-gray-50 min-h-screen">
                <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
                    <Link href="/profile" aria-label="Go back to profile">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Delivery Addresses</h1>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-6">
                    <AnimatePresence mode="wait">
                        {addressToEdit ? (
                            <AddressForm key="form" addressToEdit={addressToEdit} onSave={handleSaveAddress} onCancel={() => setAddressToEdit(null)} />
                        ) : (
                            <motion.div key="list" className="space-y-4">
                                {addresses.map((address, index) => (
                                    <motion.div 
                                        key={address.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                        transition={{ delay: index * 0.05 }}
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
                                            <button onClick={() => setAddressToEdit(address)} className="p-2 text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
                                            <button onClick={() => setAddressToDelete(address)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </motion.div>
                                ))}
                                {/* "Add New" button at the bottom of the list */}
                                {addresses.length > 0 && (
                                    <motion.button 
                                        onClick={() => setAddressToEdit({})} 
                                        className="w-full flex items-center justify-center gap-2 py-3 font-semibold bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    >
                                        <Plus className="w-5 h-5"/> Add New Address
                                    </motion.button>
                                )}
                                 {/* Centered "Add New" button for the empty state */}
                                {addresses.length === 0 && (
                                    <div className="text-center py-20">
                                         <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                         <h2 className="text-xl font-bold text-gray-700">No addresses yet</h2>
                                         <p className="text-gray-500 mt-2">Add your first delivery address to get started.</p>
                                        <button onClick={() => setAddressToEdit({})} className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors">
                                            <Plus className="w-5 h-5"/> Add Your First Address
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
            <AnimatePresence>
                {addressToDelete && (
                    <DeleteConfirmationModal 
                        address={addressToDelete} 
                        onConfirm={handleConfirmDelete} 
                        onCancel={() => setAddressToDelete(null)} 
                    />
                )}
            </AnimatePresence>
        </MainLayout>
    );
}

