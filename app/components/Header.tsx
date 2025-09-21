"use client";

import React from 'react';
import { BellIcon } from './Icons'; // Corrected import path

export default function Header() {
    const user = {
        name: 'Kartikey',
        avatar: '/assests/images/profile-pic.jpeg'
    };

    return (
        <header className="px-4 md:px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-20 border-b">
            <div>
                <p className="text-sm text-gray-500">Good Morning</p>
                <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
            </div>
            <div className="flex items-center gap-4">
                {/* Replaced Link with a standard anchor tag */}
                <a href="/notifications" className="relative p-2 rounded-full hover:bg-gray-100">
                    <BellIcon className="w-6 h-6 text-gray-600" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </a>
            </div>
        </header>
    );
}

