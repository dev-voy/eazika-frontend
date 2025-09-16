"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/app/components/MainLayout';
import { motion } from 'framer-motion';
import { 
    User, 
    MapPin, 
    CreditCard, 
    ShoppingBag, 
    Heart, 
    Settings, 
    HelpCircle, 
    LogOut,
    ChevronRight,
    Edit
} from 'lucide-react';

// Reusable component for menu items
const ProfileMenuItem = ({ href, icon: Icon, label }: { href: string, icon: React.ElementType, label: string }) => (
    <Link href={href} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
        <div className="flex items-center space-x-4">
            <Icon className="h-6 w-6 text-gray-500 group-hover:text-orange-500" />
            <span className="font-semibold text-gray-800">{label}</span>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
    </Link>
);


export default function ProfilePage() {
    // Mock user data - in a real app, this would come from your useAuth() hook
    const user = {
        name: 'Rafatul Islam',
        email: 'rafatul@eazika.com',
        avatar: '/assests/images/profile-pic.jpeg'
    };

    const menuItems = [
        { icon: ShoppingBag, label: 'My Orders', href: '#' },
        { icon: Heart, label: 'Wishlist', href: '/favorites' },
        { icon: MapPin, label: 'Delivery Addresses', href: '#' },
        { icon: CreditCard, label: 'Payment Methods', href: '#' },
    ];

    const supportItems = [
        { icon: HelpCircle, label: 'Help & Support', href: '#' },
        { icon: Settings, label: 'Settings', href: '#' },
    ];

  return (
    <MainLayout>
      <div className="w-full max-w-5xl mx-auto bg-gray-50 min-h-screen">
        
        <main className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
            {/* User Profile Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full relative overflow-hidden border-2 border-white/50">
                     <Image src={user.avatar} alt="User Avatar" fill className="object-cover"/>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">{user.name}</h1>
                    <p className="text-yellow-100">{user.email}</p>
                  </div>
                </div>
                <button className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                  <Edit className="h-5 w-5" />
                </button>
              </div>
            </motion.div>

            {/* Account Section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="divide-y divide-gray-100">
                {menuItems.map((item) => (
                  <ProfileMenuItem key={item.label} {...item} />
                ))}
              </div>
            </motion.div>

            {/* Support Section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="divide-y divide-gray-100">
                {supportItems.map((item) => (
                   <ProfileMenuItem key={item.label} {...item} />
                ))}
              </div>
            </motion.div>

            {/* Logout */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                className="w-full flex items-center justify-center p-4 text-red-600 font-semibold bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </motion.div>
        </main>
      </div>
    </MainLayout>
  );
}

