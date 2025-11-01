"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/app/components/MainLayout';
import { ArrowLeftIcon } from '@/app/components/Icons';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import axios, { isAxiosError } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updatePersistedUser } from '@/store/actions/userActions';

export default function SettingsPage() {
    // User data — initialize from Redux store if available, otherwise fallback to mock
    const userFromStore = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [userData, setUserData] = useState(() => ({
        name: userFromStore?.name || 'Rafatul Islam',
        email: userFromStore?.email || 'rafatul@eazika.com',
        phone: userFromStore?.phone || '+880 1617202070',
        avatar: userFromStore?.profileImage || '/assests/images/profile-pic.jpeg'
    }));

    // Keep form in sync if Redux user changes (for example when Providers seeds a default user)
    useEffect(() => {
        if (userFromStore && userFromStore.id) {
            setUserData((prev) => ({
                ...prev,
                name: userFromStore.name || prev.name,
                email: userFromStore.email || prev.email,
                phone: userFromStore.phone || prev.phone,
                avatar: userFromStore.profileImage || prev.avatar,
            }));
        }
    }, [userFromStore]);

    // State to hold the preview of the new avatar
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Keep the actual selected File so we can log or upload it later
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    // This function is triggered when the user selects a new image file
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // keep a reference to the File object
            setSelectedFile(file);
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

    // Called when the form is submitted — prevent navigation and log the data
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let uploadedImageUrl: string | null = null;

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                const imgResponse = await axios.post('upload-files', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: {
                        folder: 'image',
                    },
                });

                uploadedImageUrl =
                    imgResponse?.data?.data?.url ??
                    imgResponse?.data?.data?.[0]?.url ??
                    null;
            }

            const nextProfileImage = uploadedImageUrl ?? userData.avatar;

            updatePersistedUser(dispatch, {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                profileImage: nextProfileImage,
            });

            setUserData((prev) => ({
                ...prev,
                avatar: nextProfileImage,
            }));

            if (uploadedImageUrl) {
                setAvatarPreview(null);
                setSelectedFile(null);
            }
        } catch (err) {
            console.error('Profile update failed:', err);
            if (isAxiosError(err) && err.response?.status === 401) {
                router.push('/login');
                return;
            }
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                <main className="grow overflow-y-auto p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 max-w-lg mx-auto"
                    >
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="w-24 h-24 rounded-full relative overflow-hidden border-4 border-gray-100">
                                    {/* The Image now shows the preview, or falls back to the original avatar */}
                                    <Image src={avatarPreview || userData.avatar} alt="User Avatar" fill className="object-cover" />
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

                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gray-800 text-white font-bold py-4 rounded-full text-center hover:bg-gray-900 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </main>
            </div>
        </MainLayout>
    );
}

