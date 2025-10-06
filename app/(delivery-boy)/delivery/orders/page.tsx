"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { fetchDeliveryHistory } from '@/lib/delivery';

type Order = { id: string; status: 'Completed' | 'Cancelled'; date: string; earnings: string; pickup: string; delivery: string };

export default function DeliveryOrdersPage() {
    const [filter, setFilter] = useState<'Completed' | 'Cancelled'>('Completed');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const history = await fetchDeliveryHistory(1, 20);
                const mapped: Order[] = history.orders.map(o => ({
                    id: o.orderNumber || o.id,
                    status: 'Completed',
                    date: o.deliveredAt ? new Date(o.deliveredAt).toLocaleDateString() : '',
                    earnings: o.pricing?.deliveryFee != null ? `₹${Number(o.pricing.deliveryFee).toFixed(2)}` : '₹0.00',
                    pickup: typeof o.shop?.address === 'string' ? (o.shop?.address as string) : (o.shop?.name || ''),
                    delivery: typeof o.deliveryInfo?.address === 'string' ? (o.deliveryInfo?.address as string) : (o.customer?.name || ''),
                }));
                setOrders(mapped);
            } catch (e) {
                console.error('Failed to fetch delivery history', e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const filteredOrders = useMemo(() => {
        return orders.filter(order => order.status === filter);
    }, [filter, orders]);

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
                    {loading && <p className="text-sm text-gray-500">Loading...</p>}
                    {!loading && filteredOrders.map((order, index) => (
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
