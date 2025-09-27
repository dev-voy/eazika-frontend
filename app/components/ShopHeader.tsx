"use client";

import React from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';

export default function ShopHeader() {
  return (
    <header className="px-4 md:px-6 py-4 flex justify-between items-center bg-white border-b md:border-none md:shadow-sm">
        <h1 className="text-xl font-bold text-gray-800 md:hidden">Orders</h1>
        <div className="hidden md:block">
            {/* This space is reserved for desktop breadcrumbs or titles */}
        </div>
        <div className="flex items-center gap-4">
            {/* UPDATED: Bell icon now links to the notifications page */}
            <Link href="/shop/notifications" className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </Link>
        </div>
    </header>
  );
}

