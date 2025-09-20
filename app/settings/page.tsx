"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/app/components/MainLayout';
import { ArrowLeftIcon } from '@/app/components/Icons';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export default function SettingsPage() {
    // Mock user data, in a real app this would come from a user state/hook
    const [userData, setUserData] = useState({
        name: 'Rafatul Islam',
        email: 'rafatul@eazika.com',
        phone: '+880 1617202070',
        avatar: '/assests/images/profile-pic.jpeg'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <MainLayout>
            <div className="w-full max-w-5xl mx-auto bg-gray-50 min-h-screen">
                <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
                    <Link href="/profile" aria-label="Go back to profile">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 max-w-lg mx-auto"
                    >
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="w-24 h-24 rounded-full relative overflow-hidden border-4 border-gray-100">
                                    <Image src={userData.avatar} alt="User Avatar" fill className="object-cover"/>
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-yellow-400 rounded-full text-gray-800 hover:bg-yellow-500 transition-colors border-2 border-white">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                />
                            </div>
                             <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                />
                            </div>
                             <div>
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                />
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-gray-800 text-white font-bold py-4 rounded-full text-center hover:bg-gray-900 transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </main>
            </div>
        </MainLayout>
    );
}

