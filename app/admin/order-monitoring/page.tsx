"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Store, AlertTriangle } from 'lucide-react';


// Mock data for live orders
const liveOrders = [
    { id: '#EAZ123456', shopId: 'eazika-fresh-mart', shop: 'Eazika Fresh Mart', city: 'New York', status: 'Out for Delivery', customer: 'John Doe', driver: 'Mike R.', avatar: '/assets/images/driver1.jpeg' },
    { id: '#EAZ123457', shopId: 'quick-grocers', shop: 'Quick Grocers', city: 'Los Angeles', status: 'Confirmed', customer: 'Jane Smith', driver: 'Anna K.', avatar: '/assets/images/driver2.jpeg' },
    { id: '#EAZ123458', shopId: 'speedy-supplies', shop: 'Speedy Supplies', city: 'New York', status: 'Packed', customer: 'Bob Johnson', driver: 'Chris P.', avatar: '/assets/images/driver3.jpeg' },
    { id: '#EAZ123459', shopId: 'eazika-fresh-mart', shop: 'Eazika Fresh Mart', city: 'New York', status: 'Pending', customer: 'Alice Williams', driver: 'Unassigned', avatar: '' },
];

type Order = typeof liveOrders[0];

export default function OrderMonitoringPage() {
    // CORRECTED: Removed 'setOrders' as it was unused
    const [orders] = useState<Order[]>(liveOrders);
    const [cityFilter, setCityFilter] = useState('All Cities');
    const [shopFilter, setShopFilter] = useState('All Shops');

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const cityMatch = cityFilter === 'All Cities' || order.city === cityFilter;
            const shopMatch = shopFilter === 'All Shops' || order.shop === shopFilter;
            return cityMatch && shopMatch;
        });
    }, [orders, cityFilter, shopFilter]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Live Order Monitoring</h1>
                    <p className="text-gray-500">View and manage all ongoing orders.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <FilterDropdown 
                    icon={MapPin}
                    label="City"
                    value={cityFilter}
                    onChange={setCityFilter}
                    options={['All Cities', 'New York', 'Los Angeles']}
                />
                <FilterDropdown 
                    icon={Store}
                    label="Shop"
                    value={shopFilter}
                    onChange={setShopFilter}
                    options={['All Shops', 'Eazika Fresh Mart', 'Quick Grocers', 'Speedy Supplies']}
                />
            </div>
            
             {/* Mobile View: Card List */}
            <div className="md:hidden space-y-4">
                {filteredOrders.map(order => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-gray-500">
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Shop</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Driver</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-semibold text-gray-700">{order.id}</td>
                                    <td className="p-3">
                                        <a href={`/admin/shops/${order.shopId}`} className="hover:text-orange-600 hover:underline">
                                            {order.shop}
                                        </a>
                                    </td>
                                    <td className="p-3">{order.customer}</td>
                                    <td className="p-3">
                                        {order.driver !== 'Unassigned' ? (
                                            <a href={`/admin/drivers/${order.driver.toLowerCase().replace(/\s+/g, '-')}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-200">
                                                {order.driver}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">{order.driver}</span>
                                        )}
                                    </td>
                                    <td className="p-3"><StatusPill status={order.status} /></td>
                                    <td className="p-3 text-center">
                                        <button className="p-2 text-gray-500 hover:text-red-600"><AlertTriangle className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}

// Reusable Components
const FilterDropdown = ({ icon: Icon, label, value, onChange, options }: {
    icon: React.ElementType,
    label: string,
    value: string,
    onChange: (value: string) => void,
    options: string[]
}) => (
    <div className="relative">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <Icon className="w-4 h-4 text-gray-400" />
            Filter by {label}
        </label>
        <select 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
            {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 bottom-2.5 pointer-events-none"/>
    </div>
);

const OrderCard = ({ order }: { order: Order }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 border">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold text-gray-800">{order.id}</p>
                <a href={`/admin/shops/${order.shopId}`} className="text-sm text-orange-600 hover:underline">
                    {order.shop}, {order.city}
                </a>
            </div>
            <StatusPill status={order.status} />
        </div>
        <div className="border-t my-3"></div>
        <div className="flex justify-between items-center text-sm">
            <div>
                <p className="text-gray-500">Customer:</p>
                <p className="font-medium">{order.customer}</p>
            </div>
             <div>
                <p className="text-gray-500">Driver:</p>
                {order.driver !== 'Unassigned' ? (
                    <a href={`/admin/drivers/${order.driver.toLowerCase().replace(/\s+/g, '-')}`} className="font-medium text-orange-600 hover:underline">
                        {order.driver}
                    </a>
                ) : (
                    <span className="font-medium text-gray-400">{order.driver}</span>
                )}
            </div>
        </div>
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

