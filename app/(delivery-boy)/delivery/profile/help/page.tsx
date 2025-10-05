"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Mail, Phone } from 'lucide-react';

export default function DeliveryHelpPage() {
    const faqs = [
        { q: "How are my earnings calculated?", a: "Your earnings are calculated based on the distance of the delivery and a base fee for each order. You can see a detailed breakdown in your order history." },
        { q: "What if I can't find the customer?", a: "Please try calling the customer using the call button on the order screen. If you still cannot reach them after 5 minutes, you may cancel the order using the appropriate reason." },
        { q: "My GPS is not working correctly.", a: "Please ensure your phone's location services are enabled with high accuracy. If the problem persists, try restarting the app. You can also use the 'Call Support' option below." },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center gap-4">
                <Link href="/delivery/profile" aria-label="Go back to profile">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </Link>
                <h1 className="text-xl font-bold text-gray-800">Help Center</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-4 space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200"
                >
                    <h2 className="text-lg font-bold mb-3">Frequently Asked Questions</h2>
                    <div className="space-y-2">
                        {faqs.map((faq, index) => (
                           <details key={index} className="group border-b last:border-b-0">
                               <summary className="flex justify-between items-center font-semibold cursor-pointer py-3 list-none">
                                   {faq.q}
                                   <ChevronDown className="w-5 h-5 transform transition-transform group-open:rotate-180" />
                               </summary>
                               <p className="pb-3 text-gray-600">{faq.a}</p>
                           </details>
                        ))}
                    </div>
                </motion.div>
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200"
                >
                    <h2 className="text-lg font-bold mb-3">Contact Support</h2>
                    <div className="space-y-3">
                        <a href="mailto:support.delivery@eazika.com" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <span className="font-semibold text-gray-700">Email Support</span>
                        </a>
                        <a href="tel:+123456789" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                            <Phone className="w-5 h-5 text-gray-500" />
                            <span className="font-semibold text-gray-700">Call Support</span>
                        </a>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
