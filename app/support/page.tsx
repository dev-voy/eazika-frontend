"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '@/app/components/MainLayout';
import { ArrowLeftIcon } from '@/app/components/Icons';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportPage() {
    const faqs = [
        { q: "How do I track my order?", a: "You can track your order from the 'My Orders' section of your account. In-progress orders will have a 'Track Order' button that shows you a live map." },
        { q: "What is the return policy?", a: "We offer a 30-day return policy on all eligible items. Please visit the order details page for the specific item to initiate a return." },
        { q: "How do I change my delivery address?", a: "You can manage your saved addresses in the 'Delivery Addresses' section of your account. You can add, edit, or remove addresses there." },
        { q: "How long does delivery take?", a: "Our goal is to get your items to you in 10-15 minutes. You can see a live ETA on the order tracking page." },
    ];

    return (
        <MainLayout>
             <div className="w-full max-w-5xl mx-auto bg-gray-50 min-h-screen">
                <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
                    <Link href="/profile" aria-label="Go back to profile">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Help & Support</h1>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-6 grid md:grid-cols-3 gap-8">
                    {/* FAQ Section */}
                    <div className="md:col-span-2">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
                        >
                            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
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
                    </div>

                    {/* Contact Us Section */}
                    <div className="md:col-span-1">
                         <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
                        >
                            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                            <div className="space-y-4">
                                <a href="mailto:support@eazika.com" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <span className="font-semibold text-gray-700">support@eazika.com</span>
                                </a>
                                <a href="tel:+123456789" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <span className="font-semibold text-gray-700">+1 (234) 567-89</span>
                                </a>
                            </div>
                         </motion.div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}

