"use client";

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, DollarSign, ShoppingCart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Mock data - In a real app, this would be fetched based on the shopId
const allLiveOrders = [
    { id: '#EAZ123456', shopId: 'eazika-fresh-mart', shop: 'Eazika Fresh Mart', city: 'New York', status: 'Out for Delivery', customer: 'John Doe', driver: 'Mike R.' },
    { id: '#EAZ123457', shopId: 'quick-grocers', city: 'Los Angeles', status: 'Confirmed', customer: 'Jane Smith', driver: 'Anna K.' },
    { id: '#EAZ123458', shopId: 'speedy-supplies', city: 'New York', status: 'Packed', customer: 'Bob Johnson', driver: 'Chris P.' },
    { id: '#EAZ123459', shopId: 'eazika-fresh-mart', city: 'New York', status: 'Pending', customer: 'Alice Williams', driver: 'Unassigned' },
    { id: '#EAZ123460', shopId: 'eazika-fresh-mart', city: 'New York', status: 'Confirmed', customer: 'Sara Lee', driver: 'Mike R.' },
];

const salesData = [
  { name: 'Mon', sales: 4200 }, { name: 'Tue', sales: 3100 }, { name: 'Wed', sales: 5500 },
  { name: 'Thu', sales: 4800 }, { name: 'Fri', sales: 6200 }, { name: 'Sat', sales: 7800 }, { name: 'Sun', sales: 8100 },
];

export default function ShopDetailsPage() {
    const params = useParams();
    const shopId = params.shopId as string;
    const shopName = decodeURIComponent(shopId.replace(/-/g, ' '));

    const shopOrders = useMemo(() => {
        return allLiveOrders.filter(order => order.shopId === shopId);
    }, [shopId]);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <header className="flex items-center space-x-4 mb-6">
                <Link href="/admin/shops" aria-label="Go back to shops list" className="p-2 rounded-full hover:bg-gray-200">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-800 capitalize">{shopName} - Dashboard</h1>
            </header>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard icon={ShoppingCart} title="Today's Orders" value={shopOrders.length.toString()} subtitle={`${shopOrders.filter(o => o.status !== 'Pending').length} Completed`} />
                <StatCard icon={DollarSign} title="Today's Revenue" value="$4,200" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="sales" fill="#f97316" name="Sales ($)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* Recent Orders List */}
                 <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Live Orders</h2>
                    <div className="space-y-4">
                        {shopOrders.map(order => (
                            <div key={order.id} className="flex justify-between items-center text-sm">
                                <div>
                                    <p className="font-semibold text-gray-700">{order.id}</p>
                                    <p className="text-gray-500">{order.customer}</p>
                                </div>
                                <StatusPill status={order.status} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const StatCard = ({ icon: Icon, title, value, subtitle }: { icon: React.ElementType, title: string, value: string, subtitle?: string }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
                <Icon className="w-6 h-6 text-orange-600" />
            </div>
            <div>
                <p className="text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
        {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
    </div>
);

const StatusPill = ({ status }: { status: string }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        status === 'Pending' ? 'bg-gray-100 text-gray-700' :
        status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
        status === 'Packed' ? 'bg-purple-100 text-purple-700' :
        'bg-yellow-100 text-yellow-700'
    }`}>
        {status}
    </span>
);

