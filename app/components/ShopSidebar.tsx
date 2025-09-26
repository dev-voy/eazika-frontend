"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Box, BarChart2, Warehouse, Store, LogOut } from 'lucide-react';

const navItems = [
    { href: '/shop', label: 'Orders', icon: ShoppingCart },
    { href: '/shop/products', label: 'Products', icon: Box },
    { href: '/shop/analytics', label: 'Analytics', icon: BarChart2 },
    { href: '/shop/inventory', label: 'Inventory', icon: Warehouse },
    { href: '/shop/user', label: 'My Shop', icon: Store },
];

export default function ShopSidebar() { // Renamed from AdminSidebar
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen px-4 py-8 bg-white border-r fixed">
            <Link href="/shop" className="text-3xl font-bold text-orange-500 mb-8">Eazika</Link>
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
                        <span className="mx-4 font-medium">Exit to App</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
