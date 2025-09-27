"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Check, Package, Truck, FileText, User } from 'lucide-react';

// Mock data for orders
const initialOrders = [
    { id: '#EAZ123456', customer: 'John Doe', time: '10:30 AM', status: 'Pending', total: '$78.50' },
    { id: '#EAZ123455', customer: 'Jane Smith', time: '10:25 AM', status: 'Confirmed', total: '$45.20' },
    { id: '#EAZ123454', customer: 'Bob Johnson', time: '10:15 AM', status: 'Packed', total: '$112.00' },
    { id: '#EAZ123453', customer: 'Alice Williams', time: '10:05 AM', status: 'Out for Delivery', total: '$32.80' },
];

type Order = typeof initialOrders[0];
type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Out for Delivery';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>(initialOrders);

    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        setOrders(currentOrders => 
            currentOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Incoming Orders</h2>
            </div>
            
            {/* Mobile View: Card List */}
            <div className="md:hidden space-y-4">
                {orders.map(order => (
                    <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-gray-500">
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Time</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-semibold text-gray-700">{order.id}</td>
                                    <td className="p-3">{order.customer}</td>
                                    <td className="p-3">{order.time}</td>
                                    <td className="p-3"><StatusPill status={order.status} /></td>
                                    <td className="p-3 flex justify-center gap-2">
                                        <ActionButtons order={order} onStatusChange={handleStatusChange} />
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

// --- Reusable Components for this page ---

const OrderCard = ({ order, onStatusChange }: { order: Order, onStatusChange: (id: string, status: OrderStatus) => void }) => (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold text-gray-800">{order.id}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                    <User className="w-3 h-3" /> {order.customer}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {order.time}
                </p>
            </div>
            <StatusPill status={order.status} />
        </div>
        <div className="border-t my-3"></div>
        <div className="flex justify-between items-center">
            <p className="font-bold text-lg">{order.total}</p>
            <div className="flex gap-2">
                <ActionButtons order={order} onStatusChange={onStatusChange} />
            </div>
        </div>
    </div>
);

const ActionButtons = ({ order, onStatusChange }: { order: Order, onStatusChange: (id: string, status: OrderStatus) => void }) => (
    <>
        <StatusButton currentStatus={order.status as OrderStatus} newStatus="Confirmed" onClick={() => onStatusChange(order.id, 'Confirmed')}><Check className="w-4 h-4" /></StatusButton>
        <StatusButton currentStatus={order.status as OrderStatus} newStatus="Packed" onClick={() => onStatusChange(order.id, 'Packed')}><Package className="w-4 h-4" /></StatusButton>
        <StatusButton currentStatus={order.status as OrderStatus} newStatus="Out for Delivery" onClick={() => onStatusChange(order.id, 'Out for Delivery')}><Truck className="w-4 h-4" /></StatusButton>
        <button className="p-2 text-gray-500 hover:text-blue-600"><FileText className="w-4 h-4" /></button>
    </>
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

const StatusButton = ({ currentStatus, newStatus, onClick, children }: { currentStatus: OrderStatus, newStatus: OrderStatus, onClick: () => void, children: React.ReactNode }) => {
    const statusOrder: OrderStatus[] = ['Pending', 'Confirmed', 'Packed', 'Out for Delivery'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const newIndex = statusOrder.indexOf(newStatus);
    const isDisabled = newIndex <= currentIndex;

    return (
        <button onClick={onClick} disabled={isDisabled} className={`p-2 rounded-md transition-colors ${ isDisabled ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
            {children}
        </button>
    );
};

