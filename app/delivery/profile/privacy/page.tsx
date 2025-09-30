"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function DeliveryPrivacyPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center gap-4">
                <Link href="/delivery/profile" aria-label="Go back to profile">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </Link>
                <h1 className="text-xl font-bold text-gray-800">Privacy & Security</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 prose prose-lg max-w-none"
                >
                    <h2>1. Data We Collect</h2>
                    <p>As a delivery partner, we collect information necessary to facilitate deliveries. This includes your name, contact information, vehicle details, and precise location data while you are online and using the app.</p>
                    
                    <h2>2. Use of Location Data</h2>
                    <p>Your location data is used to assign you nearby orders, provide customers with live tracking of their delivery, and to calculate your distance and earnings. Your location is only tracked when you are online and actively using the Eazika Delivery app.</p>
                    
                    <h2>3. Data Sharing</h2>
                    <p>We share limited information with customers, such as your first name and current location, once you have accepted their order. We do not share your personal phone number or other contact details. All communication is handled through the app.</p>

                    <p className="mt-8 text-sm text-gray-500">Last updated: September 21, 2025</p>
                </motion.div>
            </main>
        </div>
    );
}
