"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, ChevronDown } from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

// Mock data for the dashboard
const dailyData = [
  { name: 'Eazika Fresh Mart', revenue: 4200 },
  { name: 'Quick Grocers', revenue: 3100 },
  { name: 'Speedy Supplies', revenue: 5500 },
];
const weeklyData = [
  { name: 'Mon', revenue: 22000 },
  { name: 'Tue', revenue: 25000 },
  { name: 'Wed', revenue: 19000 },
  { name: 'Thu', revenue: 28000 },
  { name: 'Fri', revenue: 32000 },
  { name: 'Sat', revenue: 41000 },
  { name: 'Sun', revenue: 45000 },
];

export default function AdminDashboardPage() {
    const [revenueFilter, setRevenueFilter] = useState('Daily');
    const [shopFilter, setShopFilter] = useState('All Shops');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Admin!</p>
                </div>
                {/* Shop Filter */}
                <div className="relative mt-4 md:mt-0">
                     <select 
                        value={shopFilter}
                        onChange={(e) => setShopFilter(e.target.value)}
                        className="appearance-none w-full md:w-auto bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option>All Shops</option>
                        <option>Eazika Fresh Mart</option>
                        <option>Quick Grocers</option>
                        <option>Speedy Supplies</option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard icon={ShoppingCart} title="Today's Orders" value="125" subtitle="80 Completed, 45 Pending" />
                <StatCard icon={Users} title="Active Users Today" value="1,250" />
                <StatCard icon={DollarSign} title="Today's Revenue" value="$12,850" />
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Revenue</h2>
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-full">
                        <button onClick={() => setRevenueFilter('Daily')} className={`px-3 py-1 text-sm font-semibold rounded-full ${revenueFilter === 'Daily' ? 'bg-white shadow' : 'text-gray-600'}`}>Daily</button>
                        <button onClick={() => setRevenueFilter('Weekly')} className={`px-3 py-1 text-sm font-semibold rounded-full ${revenueFilter === 'Weekly' ? 'bg-white shadow' : 'text-gray-600'}`}>Weekly</button>
                        <button onClick={() => setRevenueFilter('Monthly')} className={`px-3 py-1 text-sm font-semibold rounded-full ${revenueFilter === 'Monthly' ? 'bg-white shadow' : 'text-gray-600'}`}>Monthly</button>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={revenueFilter === 'Daily' ? dailyData : weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#f97316" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

// Reusable Stat Card Component
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

