"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListOrdered, Map, UserCircle } from 'lucide-react';

const navItems = [
    { href: '/delivery', label: 'Home', icon: Home },
    { href: '/delivery/orders', label: 'Orders', icon: ListOrdered },
    { href: '/delivery/map', label: 'Map', icon: Map },
    { href: '/delivery/profile', label: 'Profile', icon: UserCircle },
];

export default function DeliveryBottomNav() {
    const pathname = usePathname();

    return (
        <footer className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 z-40">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <Link 
                        key={item.label} 
                        href={item.href} 
                        className={`flex flex-col items-center justify-center gap-1 w-full transition-colors duration-200 ${
                            pathname === item.href ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'
                        }`}
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>
        </footer>
    );
}
