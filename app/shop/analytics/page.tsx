"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';
import Image from 'next/image';

// Mock Data for Analytics
const salesData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 4500 },
  { name: 'Fri', sales: 6000 },
  { name: 'Sat', sales: 7500 },
  { name: 'Sun', sales: 8000 },
];

const topProducts = [
    { id: 1, name: 'Lays Potato Chips', image: '/assests/images/chips.jpeg', sales: 150 },
    { id: 5, name: 'Coca-Cola Can', image: '/assests/images/coke.jpeg', sales: 125 },
    { id: 9, name: 'Aashirvaad Atta', image: '/assests/images/atta.jpeg', sales: 110 },
    { id: 2, name: 'Oreo Biscuits', image: '/assests/images/oreo.jpeg', sales: 95 },
];


export default function AnalyticsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Sales Analytics</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard icon={DollarSign} title="Total Revenue" value="$12,450" change="+12.5%" />
                <StatCard icon={ShoppingCart} title="Total Orders" value="350" change="+8.2%" />
                <StatCard icon={Users} title="New Customers" value="45" change="+20%" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Sales Over Time</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Selling Products */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
                    <div className="space-y-4">
                        {topProducts.map(product => (
                            <div key={product.id} className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                    <Image src={product.image} alt={product.name} fill className="object-cover"/>
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


// Reusable Stat Card Component
const StatCard = ({ icon: Icon, title, value, change }: { icon: React.ElementType, title: string, value: string, change: string }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
                <Icon className="w-6 h-6 text-orange-600" />
            </div>
            <div>
                <p className="text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>{change}</span>
            <span className="text-gray-500 ml-1">vs last week</span>
        </div>
    </div>
);
