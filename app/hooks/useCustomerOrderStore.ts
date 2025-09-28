"use client";

import { useState } from 'react';

// Define the type for a customer's active order
export type ActiveOrder = {
    id: string;
    status: 'confirmed' | 'processing' | 'on_the_way' | 'delivered';
    otp: string; // The OTP for the customer
    driver: {
        name: string;
        avatar: string;
    };
};

// Mock data for a customer's active order
const mockActiveOrder: ActiveOrder = {
    id: '#EAZ123456',
    status: 'on_the_way', // The order is out for delivery
    otp: '1234', // The 4-digit code for the customer
    driver: {
        name: 'John Doe',
        avatar: '/assets/images/driver1.jpeg'
    }
};

export const useCustomerOrderStore = () => {
    // In a real app, this would be fetched from your backend
    const [activeOrder] = useState<ActiveOrder | null>(mockActiveOrder);

    // This hook provides the active order details to any page that needs it
    return { activeOrder };
};
