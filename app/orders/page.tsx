"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '@/app/components/MainLayout';
import { ArrowLeftIcon } from '@/app/components/Icons';
import { motion } from 'framer-motion';

// A reusable component for each order in the list
const OrderItem = ({ orderId, date, status, total, items }: { orderId: string, date: string, status: string, total: string, items: number }) => {
    // Determine the link and text based on the order status
    const isTracking = status === 'In Transit';
    const linkHref = isTracking ? `/track-order?id=${orderId}` : `/order-details/${orderId}`;
    const linkText = isTracking ? 'Track Order' : 'View Details';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
        >
            <div className="flex justify-between items-center border-b pb-3 mb-3">
                <div>
                    <p className="font-bold text-gray-800">Order ID: {orderId}</p>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
                <div className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    status === 'In Transit' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                }`}>
                    {status}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-500 text-sm">{items} items</p>
                    <p className="font-bold text-lg text-gray-800">${total}</p>
                </div>
                {/* Use the dynamic link and text */}
                <Link href={linkHref} className="font-semibold text-orange-500 hover:text-orange-600">
                    {linkText}
                </Link>
            </div>
        </motion.div>
    );
};

export default function OrdersPage() {
    const orders = [
        { id: 'EAZ123456', date: '16 Sep, 2025', status: 'In Transit', total: '78.50', items: 3 },
        { id: 'EAZ123455', date: '12 Sep, 2025', status: 'Delivered', total: '45.20', items: 2 },
        { id: 'EAZ123454', date: '05 Sep, 2025', status: 'Delivered', total: '112.00', items: 5 },
    ];

    return (
        <MainLayout>
            <div className="w-full max-w-5xl mx-auto bg-gray-50 min-h-screen">
                <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
                    <Link href="/profile" aria-label="Go back to profile">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-6">
                    <div className="space-y-4">
                        {orders.map((order, index) => (
                             <motion.div key={order.id} transition={{ delay: index * 0.1 }}>
                                <OrderItem 
                                    orderId={order.id} 
                                    date={order.date} 
                                    status={order.status}
                                    total={order.total}
                                    items={order.items}
                                />
                             </motion.div>
                        ))}
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}

