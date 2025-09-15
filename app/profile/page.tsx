"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BottomNav from '@/app/components/BottomNav';
import { IoChatbubbleEllipsesOutline, IoStarOutline, IoShareOutline } from "react-icons/io5";

// --- SVG Icons ---
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 5 19 12 12 19"></polyline></svg>
);

// Reusable component for menu items
const ProfileMenuItem = ({ title, subtitle, href, children }: { title: string, subtitle?: string, href: string, children?: React.ReactNode }) => (
    <Link href={href} className="flex items-center justify-between py-4 group">
        <div className="flex items-center gap-4">
            {children}
            <div>
                <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
        </div>
        <ArrowRightIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-800 transition-colors" />
    </Link>
);


export default function ProfilePage() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto bg-gray-50 flex flex-col h-screen">
        
        <header className="px-6 pt-10 pb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden mb-4">
                <Image src="/assests/images/profile-pic.jpeg" alt="User Avatar" width={48} height={48} className="object-cover"/>
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Account</h1>
        </header>

        <main className="flex-grow overflow-y-auto px-6">
            {/* Account Section */}
            <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100 mb-8 p-2">
                <ProfileMenuItem title="Manage Account" subtitle="Update information and manage your account" href="#" />
                <ProfileMenuItem title="Payment" subtitle="Manage payment methods and credits" href="#" />
                <ProfileMenuItem title="Address" subtitle="Add or remove a delivery address" href="#" />
                <ProfileMenuItem title="Notifications" subtitle="Manage delivery and promotional notifications" href="#" />
            </div>

            {/* Support Section */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">Support</h2>
             <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100 mb-8 p-2">
                <ProfileMenuItem title="Get Help" href="#">
                    <IoChatbubbleEllipsesOutline className="w-6 h-6 text-gray-500" />
                </ProfileMenuItem>
                <ProfileMenuItem title="Rate App" href="#">
                    <IoStarOutline className="w-6 h-6 text-gray-500" />
                </ProfileMenuItem>
                <ProfileMenuItem title="Share App" href="#">
                    <IoShareOutline className="w-6 h-6 text-gray-500" />
                </ProfileMenuItem>
            </div>
            
            {/* Log Out Button */}
            <div className="py-4">
                <button className="w-full bg-gray-200 text-gray-700 font-bold py-4 rounded-xl text-center hover:bg-gray-300 transition-colors">
                    Log Out
                </button>
            </div>
        </main>
        
        <BottomNav />
      </div>
    </div>
  );
}
