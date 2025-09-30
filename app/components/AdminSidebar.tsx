"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Users, Store, Settings, LogOut } from 'lucide-react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/order-monitoring', label: 'Order Monitoring', icon: ShoppingCart },
    { href: '/admin/shops', label: 'Shops', icon: Store },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen px-4 py-8 bg-white border-r fixed">
            <Link href="/admin" className="text-3xl font-bold text-gray-800 mb-8">Eazika <span className="text-orange-500">Admin</span></Link>
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
                        <span className="mx-4 font-medium">Exit Admin Panel</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}

