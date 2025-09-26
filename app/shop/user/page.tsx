"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import Image from 'next/image';

export default function MyShopPage() {
    // Mock data for the shop's details
    const [shopData, setShopData] = useState({
        name: 'Eazika Fresh Mart',
        owner: 'Rafatul Islam',
        email: 'contact@eazika.com',
        phone: '+880 1617202070',
        address: '123 Grocery Lane, Market City, 12345',
        logo: '/assests/images/66.png' // Add a placeholder shop logo
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setShopData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Shop Details</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Profile Picture and Info */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <Image src={shopData.logo} alt="Shop Logo" fill className="object-cover rounded-full border-4 border-white shadow-md"/>
                            <button className="absolute bottom-1 right-1 p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors border-2 border-white">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{shopData.name}</h2>
                        <p className="text-gray-500">{shopData.owner}</p>
                    </div>
                </div>

                {/* Right Column: Edit Form */}
                <div className="lg:col-span-2">
                    <form className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 space-y-4">
                        <InputField icon={Store} label="Shop Name" name="name" value={shopData.name} onChange={handleInputChange} />
                        <InputField icon={User} label="Owner Name" name="owner" value={shopData.owner} onChange={handleInputChange} />
                        <InputField icon={Mail} label="Contact Email" name="email" value={shopData.email} onChange={handleInputChange} type="email" />
                        <InputField icon={Phone} label="Phone Number" name="phone" value={shopData.phone} onChange={handleInputChange} type="tel" />
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={shopData.address}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        
                        <div className="pt-4">
                            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-full text-center hover:bg-orange-600 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}

// Reusable Input Field Component
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
