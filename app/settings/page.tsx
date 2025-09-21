"use client";

import React, { useState, useRef } from 'react';
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
    
    // State to hold the preview of the new avatar
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    // Ref to access the hidden file input element
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    // This function is triggered when the user selects a new image file
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    // This function programmatically clicks the hidden file input
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
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
                                    {/* The Image now shows the preview, or falls back to the original avatar */}
                                    <Image src={avatarPreview || userData.avatar} alt="User Avatar" fill className="object-cover"/>
                                </div>
                                {/* This is the visible button that triggers the file input */}
                                <button 
                                    onClick={handleAvatarClick}
                                    className="absolute bottom-0 right-0 p-2 bg-yellow-400 rounded-full text-gray-800 hover:bg-yellow-500 transition-colors border-2 border-white"
                                    aria-label="Change profile picture"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                                {/* This is the actual file input, but it's hidden from view */}
                                <input 
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                    accept="image/png, image/jpeg"
                                />
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

