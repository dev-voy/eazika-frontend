"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Import the router hook
import { ArrowLeftIcon } from '@/app/components/Icons';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
    const router = useRouter(); // Initialize the router

    return (
            <div className="w-full max-w-5xl mx-auto bg-gray-50 min-h-screen">
                <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
                    {/* UPDATED: This is now a button that goes back in history */}
                    <button onClick={() => router.back()} aria-label="Go back to previous page">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Privacy Policy</h1>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 prose prose-lg max-w-none"
                    >
                        <h2>1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, place an order, or communicate with us. This information may include your name, email address, phone number, delivery address, and payment information.</p>
                        
                        <h2>2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our Services. This includes processing transactions, sending you order confirmations and updates, responding to your comments and questions, and providing customer service.</p>
                        
                        <h2>3. Sharing of Information</h2>
                        <p>We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</p>

                        <h2>4. Data Security</h2>
                        <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.</p>

                        <h2>5. Your Choices</h2>
                        <p>You may update, correct or delete information about you at any time by logging into your online account or emailing us. If you wish to delete your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.</p>

                        <p className="mt-8 text-sm text-gray-500">Last updated: September 21, 2025</p>
                    </motion.div>
                </main>
            </div>
    );
}

