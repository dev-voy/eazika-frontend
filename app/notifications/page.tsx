"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '@/app/components/MainLayout';
import { ArrowLeftIcon } from '@/app/components/Icons';
import { motion } from 'framer-motion';
import { Tag, Package, Truck } from 'lucide-react';

export default function NotificationsPage() {
    const notifications = [
        { 
            id: 1, 
            icon: Package, 
            title: 'Your order is confirmed!', 
            description: 'Order #EAZ123456 has been confirmed and is being processed.', 
            time: '2 hours ago',
            isNew: true 
        },
        { 
            id: 2, 
            icon: Truck, 
            title: 'Your order is on its way!', 
            description: 'Your order #EAZ123455 is out for delivery.', 
            time: '8 hours ago',
            isNew: true 
        },
        { 
            id: 3, 
            icon: Tag, 
            title: 'Special Offer: 25% Off Vegetables', 
            description: 'Don\'t miss out on our special weekend offer. Shop now!', 
            time: '1 day ago',
            isNew: false
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <MainLayout>
            <div className="w-full max-w-5xl mx-auto bg-gray-50 min-h-screen">
                <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
                    <Link href="/home" aria-label="Go back to home">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-6">
                    <motion.div 
                        className="space-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {notifications.map((notification) => {
                            const Icon = notification.icon;
                            return (
                                <motion.div 
                                    key={notification.id}
                                    variants={itemVariants}
                                    className={`bg-white rounded-2xl shadow-sm p-4 border flex gap-4 ${notification.isNew ? 'border-orange-200' : 'border-gray-100'}`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${
                                        notification.icon === Package ? 'bg-blue-100 text-blue-600' :
                                        notification.icon === Truck ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-green-100 text-green-600'
                                    }`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-gray-800">{notification.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                                    </div>
                                    {notification.isNew && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>}
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </main>
            </div>
        </MainLayout>
    );
}
