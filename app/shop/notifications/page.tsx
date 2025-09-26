"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Tag, Info } from 'lucide-react';

export default function ShopNotificationsPage() {
    const notifications = [
        { 
            id: 1, 
            icon: Package, 
            title: 'New Order Received!', 
            description: 'Order #EAZ123456 from John Doe has been placed.', 
            time: '5 minutes ago',
            isNew: true 
        },
        { 
            id: 2, 
            icon: Tag, 
            title: 'Weekly Sales Report Ready', 
            description: 'Your sales summary for the last 7 days is available in Analytics.', 
            time: '1 hour ago',
            isNew: true 
        },
        { 
            id: 3, 
            icon: Info, 
            title: 'Low Stock Warning', 
            description: 'Lays Potato Chips are running low. Check your inventory.', 
            time: '3 hours ago',
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
        <div className="w-full max-w-5xl mx-auto">
            <header className="px-4 md:px-0 py-4 flex items-center space-x-4">
                <Link href="/shop" aria-label="Go back to dashboard" className="md:hidden">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
            </header>
            <main className="flex-grow overflow-y-auto">
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
                                    notification.icon === Tag ? 'bg-green-100 text-green-600' :
                                    'bg-yellow-100 text-yellow-600'
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
    );
}

