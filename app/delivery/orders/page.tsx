"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

// Mock data for order history
const orderHistory = [
    { id: '#EAZ123456', status: 'Completed', date: '28 Sep, 2025', earnings: '$5.50', pickup: 'Eazika Fresh Mart', delivery: '123 Main St' },
    { id: '#EAZ123458', status: 'Completed', date: '28 Sep, 2025', earnings: '$7.20', pickup: 'Speedy Supplies', delivery: '456 Oak Ave' },
    { id: '#EAZ123455', status: 'Cancelled', date: '27 Sep, 2025', earnings: '$0.00', pickup: 'Quick Grocers', delivery: '789 Pine Ln' },
    { id: '#EAZ123453', status: 'Completed', date: '27 Sep, 2025', earnings: '$6.80', pickup: 'Eazika Fresh Mart', delivery: '321 Elm Ct' },
];

type Order = typeof orderHistory[0];

export default function DeliveryOrdersPage() {
    const [filter, setFilter] = useState<'Completed' | 'Cancelled'>('Completed');

    const filteredOrders = useMemo(() => {
        return orderHistory.filter(order => order.status === filter);
    }, [filter]);

    return (
        <>
            <header className="bg-white p-4 sticky top-0 z-10 shadow-sm">
                <h1 className="text-xl font-bold text-gray-800">Order History</h1>
                <p className="text-sm text-gray-500">View your past deliveries.</p>
            </header>

            <main className="flex-grow overflow-y-auto p-4">
                {/* Filter Tabs */}
                <div className="flex gap-2 p-1 bg-gray-200 rounded-full mb-4">
                    <button onClick={() => setFilter('Completed')} className={`w-full py-2 rounded-full font-semibold text-sm ${filter === 'Completed' ? 'bg-white shadow' : 'text-gray-600'}`}>Completed</button>
                    <button onClick={() => setFilter('Cancelled')} className={`w-full py-2 rounded-full font-semibold text-sm ${filter === 'Cancelled' ? 'bg-white shadow' : 'text-gray-600'}`}>Cancelled</button>
                </div>

                <div className="space-y-3">
                    {filteredOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <OrderHistoryCard order={order} />
                        </motion.div>
                    ))}
                </div>
            </main>
        </>
    );
}


// Reusable Order History Card
const OrderHistoryCard = ({ order }: { order: Order }) => (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold text-gray-800">{order.id}</p>
                <p className="text-xs text-gray-500">{order.date}</p>
            </div>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded-full ${
                order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
                {order.status === 'Completed' ? <CheckCircle className="w-3 h-3"/> : <Clock className="w-3 h-3"/>}
                {order.status}
            </div>
        </div>
        <div className="border-t my-3"></div>
        <div className="flex justify-between items-center">
            <div>
                <p className="text-gray-500 text-sm">Earnings</p>
                <p className="font-bold text-lg text-green-600">{order.earnings}</p>
            </div>
            <Link href="#" className="flex items-center text-sm font-semibold text-gray-600 hover:text-orange-600">
                View Details <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
        </div>
    </div>
);
