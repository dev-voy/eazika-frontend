"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function DriverDetailsPage() {
    const params = useParams();
    const driverId = params.driverId as string;

    // In a real app, you'd fetch driver data based on the ID.
    // For now, we'll just display the name from the URL.
    const driverName = decodeURIComponent(driverId.replace(/-/g, ' '));

    return (
        <div>
            <header className="flex items-center space-x-4 mb-6">
                <Link href="/admin/order-monitoring" aria-label="Go back to order monitoring" className="p-2 rounded-full hover:bg-gray-200">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-800 capitalize">{driverName}</h1>
            </header>
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100">
                        {/* You can add a dynamic avatar here later */}
                        <Image src="/assets/images/driver1.jpeg" alt={driverName} fill className="object-cover" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold capitalize">{driverName}</h2>
                        <p className="text-gray-500">On-Duty | 3 Active Orders</p>
                    </div>
                </div>
                <div className="mt-6 border-t pt-4">
                     <p className="text-gray-600">More details for this driver will be displayed here, such as contact information, vehicle details, and recent order history.</p>
                </div>
            </div>
        </div>
    );
}
