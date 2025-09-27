"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Box, BarChart2, Warehouse, Store } from 'lucide-react';

const navItems = [
    { href: '/shop', label: 'Orders', icon: ShoppingCart },
    { href: '/shop/products', label: 'Products', icon: Box },
    { href: '/shop/analytics', label: 'Analytics', icon: BarChart2 },
    { href: '/shop/inventory', label: 'Inventory', icon: Warehouse },
    { href: '/shop/user', label: 'My Shop', icon: Store },
];

export default function ShopBottomNav() {
    const pathname = usePathname();

    return (
        <footer className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 z-50">
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
