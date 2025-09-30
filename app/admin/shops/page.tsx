"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

// Mock data for shops
const shops = [
    { id: 'eazika-fresh-mart', name: 'Eazika Fresh Mart', owner: 'Rafatul Islam', status: 'Online', logo: '/assets/images/shop-logo.png' },
    { id: 'quick-grocers', name: 'Quick Grocers', owner: 'Jane Smith', status: 'Offline', logo: '/assets/images/shop-logo-2.png' },
    { id: 'speedy-supplies', name: 'Speedy Supplies', owner: 'Bob Johnson', status: 'Online', logo: '/assets/images/shop-logo-3.png' },
];

export default function AdminShopsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Shops</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map((shop, index) => (
                    <motion.div
                        key={shop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={`/admin/shops/${shop.id}`} className="block bg-white rounded-2xl shadow-sm p-4 border border-gray-200 hover:shadow-lg hover:border-orange-500 transition-all">
                           <div className="flex justify-between items-start">
                               <div className="flex items-center gap-4">
                                   <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                       <Image src={shop.logo} alt={`${shop.name} logo`} fill className="object-cover" />
                                   </div>
                                   <div>
                                       <h2 className="font-bold text-lg text-gray-800">{shop.name}</h2>
                                       <p className="text-sm text-gray-500">{shop.owner}</p>
                                   </div>
                               </div>
                               <StatusPill status={shop.status} />
                           </div>
                           <div className="mt-4 pt-4 border-t flex justify-end items-center">
                               <div className="flex items-center text-sm font-semibold text-gray-600 group-hover:text-orange-600">
                                   View Dashboard <ChevronRight className="w-4 h-4 ml-1" />
                               </div>
                           </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

const StatusPill = ({ status }: { status: string }) => (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded-full ${
        status === 'Online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
        <div className={`w-2 h-2 rounded-full ${status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
        {status}
    </div>
);
