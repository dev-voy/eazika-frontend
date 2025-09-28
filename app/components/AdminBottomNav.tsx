"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Store, Users, Settings } from 'lucide-react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/order-monitoring', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/shops', label: 'Shops', icon: Store },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminBottomNav() {
    const pathname = usePathname();

    return (
        <footer className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <Link 
                        key={item.label} 
                        href={item.href} 
                        className={`flex flex-col items-center justify-center gap-1 w-full transition-colors duration-200 ${
                            pathname.startsWith(item.href) ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'
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
