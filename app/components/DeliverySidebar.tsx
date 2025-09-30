"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListOrdered, Map, UserCircle, LogOut } from 'lucide-react';

const navItems = [
    { href: '/delivery', label: 'Home', icon: Home },
    { href: '/delivery/orders', label: 'Orders', icon: ListOrdered },
    { href: '/delivery/map', label: 'Map', icon: Map },
    { href: '/delivery/profile', label: 'Profile', icon: UserCircle },
];

export default function DeliverySidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen px-4 py-8 bg-white border-r fixed">
            <Link href="/delivery" className="text-3xl font-bold text-gray-800 mb-8">Eazika <span className="text-orange-500">Delivery</span></Link>
            <div className="flex flex-col justify-between flex-1">
                <nav>
                    {navItems.map((item) => (
                        <Link 
                            key={item.label} 
                            href={item.href} 
                            className={`flex items-center px-4 py-3 mt-2 rounded-lg transition-colors ${
                                pathname === item.href ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="mx-4 font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div>
                    <Link href="/" className="flex items-center px-4 py-3 text-red-600 rounded-lg hover:bg-red-50">
                        <LogOut className="w-5 h-5" />
                        <span className="mx-4 font-medium">Logout</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
