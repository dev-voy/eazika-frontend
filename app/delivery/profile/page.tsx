"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ListOrdered, 
    ChevronRight, 
    LogOut,
    DollarSign,
    CheckCircle,
    User,
    Bike,
    Landmark,
    HelpCircle,
    Shield
} from 'lucide-react';

// --- Reusable Logout Confirmation Modal ---
const LogoutConfirmationModal = ({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
    >
        <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center"
        >
            <LogOut className="mx-auto h-12 w-12 text-red-500 bg-red-50 p-2 rounded-full" />
            <h2 className="text-2xl font-bold mt-4 text-gray-800">Confirm Logout</h2>
            <p className="mt-2 text-gray-600">Are you sure you want to log out?</p>
            <div className="flex gap-4 mt-6">
                <button
                onClick={onCancel}
                className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-full text-center hover:bg-gray-300 transition-colors"
                >
                Cancel
                </button>
                <button
                onClick={onConfirm}
                className="w-full bg-red-500 text-white font-bold py-3 rounded-full text-center hover:bg-red-600 transition-colors"
                >
                Logout
                </button>
            </div>
        </motion.div>
    </motion.div>
);


export default function DeliveryProfilePage() {
    const router = useRouter();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        setShowLogoutConfirm(false);
        router.push('/'); // Redirect to the main splash page on logout
    };
    
    const driver = {
        name: 'John Doe',
        avatar: '/assets/images/driver1.jpeg',
        totalDistance: '128.7 km',
        todaysEarnings: '$85.50',
        completedDeliveries: 12
    };

    const accountItems = [
        { href: '/delivery/profile/edit', icon: User, label: 'Edit Profile' },
        { href: '/delivery/profile/vehicle', icon: Bike, label: 'Vehicle Details' },
        { href: '/delivery/profile/bank', icon: Landmark, label: 'Bank Information' },
    ];
    
    const supportItems = [
        { href: '/delivery/profile/help', icon: HelpCircle, label: 'Help Center' },
        { href: '/delivery/profile/privacy', icon: Shield, label: 'Privacy & Security' },
    ];


    return (
        <div className="relative min-h-screen">
            <header className="bg-white p-4 sticky top-0 z-10 shadow-sm text-center">
                <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
            </header>

            <main className="flex-grow overflow-y-auto p-4 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <Image src={driver.avatar} alt="Driver Avatar" fill className="object-cover" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mt-3">{driver.name}</h2>
                        <p className="text-gray-500">Delivery Hero</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <StatCard title="Today's Earnings" value={driver.todaysEarnings} icon={DollarSign} />
                        <StatCard title="Completed" value={driver.completedDeliveries.toString()} icon={CheckCircle} />
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y">
                            <MenuItem href="/delivery/orders" icon={ListOrdered} label="Order History" />
                            {accountItems.map(item => <MenuItem key={item.label} {...item} />)}
                        </div>
                         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y">
                            {supportItems.map(item => <MenuItem key={item.label} {...item} />)}
                        </div>
                    </div>

                    <div className="mt-6">
                         <button 
                            onClick={() => setShowLogoutConfirm(true)}
                            className="w-full flex items-center justify-center gap-2 py-3 font-semibold bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                         >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </motion.div>
            </main>

            <AnimatePresence>
                {showLogoutConfirm && (
                    <LogoutConfirmationModal
                        onConfirm={handleLogout}
                        onCancel={() => setShowLogoutConfirm(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

const MenuItem = ({ href, icon: Icon, label }: { href: string, icon: React.ElementType, label: string }) => (
    <Link href={href} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group first:rounded-t-2xl last:rounded-b-2xl">
        <div className="flex items-center space-x-3">
            <Icon className="h-5 w-5 text-gray-500 group-hover:text-orange-500" />
            <span className="font-semibold text-gray-700">{label}</span>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
    </Link>
);

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) => (
     <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200 text-center">
        <Icon className="w-6 h-6 text-orange-500 mx-auto mb-2"/>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
);

