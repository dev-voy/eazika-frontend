"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Camera, User, Mail, Phone } from 'lucide-react';

export default function EditDriverProfilePage() {
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 123 456 7890',
        avatar: '/assets/images/driver1.jpeg'
    });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

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

    return (
        <>
            <header className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center gap-4">
                <Link href="/delivery/profile" aria-label="Go back to profile">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </Link>
                <h1 className="text-xl font-bold text-gray-800">Edit Profile</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-4">
                <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full relative overflow-hidden border-4 border-white shadow-md">
                            <Image src={avatarPreview || userData.avatar} alt="User Avatar" fill className="object-cover"/>
                        </div>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors border-2 border-white"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
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
                    <InputField icon={User} label="Full Name" name="name" value={userData.name} onChange={handleInputChange} />
                    <InputField icon={Mail} label="Email Address" name="email" value={userData.email} onChange={handleInputChange} type="email" />
                    <InputField icon={Phone} label="Phone Number" name="phone" value={userData.phone} onChange={handleInputChange} type="tel" />
                    <div className="pt-4">
                        <button type="submit" className="w-full bg-gray-800 text-white font-bold py-4 rounded-full text-center hover:bg-gray-900 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

const InputField = ({ icon: Icon, label, name, value, onChange, type = "text" }: {
    icon: React.ElementType,
    label: string,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string
}) => (
    <div>
        <label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <Icon className="w-4 h-4 text-gray-400" />
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
    </div>
);
