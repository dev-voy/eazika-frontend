"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/app/components/Icons';
import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
    return (
            <div className="w-full max-w-5xl mx-auto bg-gray-50 min-h-screen">
                <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
                    <Link href="/register" aria-label="Go back to registration">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Terms of Service</h1>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 prose prose-lg max-w-none"
                    >
                        <h2>1. Introduction</h2>
                        <p>Welcome to Eazika! These Terms of Service ("Terms") govern your use of the Eazika mobile application and website (our "Service"), operated by Eazika Inc. By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
                        
                        <h2>2. User Accounts</h2>
                        <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
                        
                        <h2>3. Orders and Payment</h2>
                        <p>By placing an order through Eazika, you warrant that you are legally capable of entering into binding contracts and that the information you provide is true and accurate. All payments are processed through a secure third-party payment processor. We do not store your credit card details.</p>

                        <h2>4. Prohibited Activities</h2>
                        <p>You may not use the Service for any illegal or unauthorized purpose. You agree to comply with all laws, rules, and regulations applicable to your use of the Service. Prohibited activities include, but are not limited to: attempting to interfere with the proper working of the Service, engaging in any automated use of the system, or attempting to impersonate another user.</p>

                        <h2>5. Termination</h2>
                        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>

                        <h2>6. Limitation of Liability</h2>
                        <p>In no event shall Eazika, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                        <h2>7. Changes to Terms</h2>
                        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

                        <p className="mt-8 text-sm text-gray-500">Last updated: September 21, 2025</p>
                    </motion.div>
                </main>
            </div>
    );
}
