"use client";

import { useState, useEffect } from 'react';

// CORRECTED: Added 'awaiting_otp' status and earnings property
export type DeliveryOrder = {
    id: string;
    status: 'pending' | 'accepted' | 'picked_up' | 'awaiting_otp' | 'delivered' | 'cancelled';
    distance: string;
    pickupAddress: string;
    deliveryAddress: string;
    customerName: string;
    earnings: string; 
};

// Mock data for available orders
const availableOrders: DeliveryOrder[] = [
    { id: '#EAZ123456', distance: '1.2km', pickupAddress: 'Eazika Fresh Mart', deliveryAddress: '123 Main St', customerName: 'John Doe', status: 'pending', earnings: '$5.50' },
    { id: '#EAZ123458', distance: '2.5km', pickupAddress: 'Speedy Supplies', deliveryAddress: '456 Oak Ave', customerName: 'Bob Johnson', status: 'pending', earnings: '$7.20' },
];

export const useDeliveryStore = () => {
    const [orders, setOrders] = useState<DeliveryOrder[]>(availableOrders);
    const [activeOrder, setActiveOrder] = useState<DeliveryOrder | null>(null);
    const [completedOrders, setCompletedOrders] = useState<DeliveryOrder[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const storedActive = localStorage.getItem('delivery_activeOrder');
            if (storedActive) setActiveOrder(JSON.parse(storedActive));
            
            const storedCompleted = localStorage.getItem('delivery_completedOrders');
            if (storedCompleted) setCompletedOrders(JSON.parse(storedCompleted));

        } catch (e) { console.error("Could not load delivery state from localStorage", e); }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        try {
            localStorage.setItem('delivery_activeOrder', JSON.stringify(activeOrder));
            localStorage.setItem('delivery_completedOrders', JSON.stringify(completedOrders));
        } catch (e) { console.error("Could not save delivery state to localStorage", e); }
    }, [activeOrder, completedOrders, isInitialized]);

    const acceptOrder = (orderId: string) => {
        const orderToAccept = orders.find(o => o.id === orderId);
        if (orderToAccept && !activeOrder) {
            const updatedOrder = { ...orderToAccept, status: 'accepted' as const };
            setActiveOrder(updatedOrder);
            setOrders(current => current.filter(o => o.id !== orderId));
            return true;
        }
        return false;
    };
    
    const updateActiveOrderStatus = (newStatus: 'picked_up' | 'awaiting_otp' | 'cancelled') => {
        if (activeOrder) {
            const updatedOrder = { ...activeOrder, status: newStatus };
             if (newStatus === 'cancelled') {
                setCompletedOrders(current => [updatedOrder, ...current]);
                setActiveOrder(null);
            } else {
                setActiveOrder(updatedOrder);
            }
            return true;
        }
        return false;
    };

    // NEW: Function to confirm delivery with OTP
    const confirmDeliveryWithOtp = (otp: string) => {
        // In a real app, you would verify this OTP with your backend.
        // For now, we'll accept any 4-digit code.
        if (activeOrder && otp.length === 4) {
            const updatedOrder = { ...activeOrder, status: 'delivered' as const };
            setCompletedOrders(current => [updatedOrder, ...current]);
            setActiveOrder(null);
            return true;
        }
        return false;
    };


    return { orders, activeOrder, completedOrders, acceptOrder, updateActiveOrderStatus, confirmDeliveryWithOtp };
};

