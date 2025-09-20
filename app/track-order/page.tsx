"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, MessageSquare, XCircle, X, Package, CheckCircle, Truck } from 'lucide-react';

// --- NEW Cancel Order Modal Component ---
const CancelOrderModal = ({ onClose }: { onClose: () => void }) => {
    const cancelReasons = [
        "I want to change my order",
        "The delivery is taking too long",
        "I ordered by mistake",
        "Other"
    ];
    
    const [selectedReason, setSelectedReason] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-sm shadow-xl"
            >
                <div className="p-4 border-b relative text-center">
                    <h2 className="text-xl font-bold">Cancel Order</h2>
                    <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-yellow-400/20 text-yellow-600 rounded-full hover:bg-yellow-400/40">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 space-y-3">
                    {cancelReasons.map((reason) => (
                        <div 
                            key={reason}
                            onClick={() => setSelectedReason(reason)}
                            className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors bg-gray-50 border-gray-200 hover:border-gray-300"
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedReason === reason ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                                {selectedReason === reason && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                            </div>
                            <p className="text-gray-700">{reason}</p>
                        </div>
                    ))}
                     <textarea placeholder="Tell us more..." className="w-full h-24 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"></textarea>
                </div>
                <div className="p-4 border-t bg-white">
                    <button 
                        onClick={onClose}
                        className="w-full text-gray-800 font-bold py-4 rounded-full text-center transition-colors"
                        style={{ backgroundColor: '#ffe59a' }}
                    >
                        Confirm Cancellation
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};


export default function TrackOrderPage() {
  const [isCancelling, setIsCancelling] = useState(false);

  const trackingSteps = [
    { status: 'Order Confirmed', description: 'Your order has been received.', icon: CheckCircle, completed: true },
    { status: 'Processing', description: 'Your items are being prepared.', icon: Package, completed: true },
    { status: 'On its way', description: 'Our delivery hero is on the way.', icon: Truck, completed: true, active: true },
    { status: 'Delivered', description: 'Enjoy your items!', icon: CheckCircle, completed: false },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-200">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
         <Image 
            src="https://placehold.co/800x1200/e2e8f0/333333?text=Live+Map&font=raleway" 
            alt="Live map view"
            fill
            className="object-cover"
         />
      </div>
      
      <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
          <Link href="/home" className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          </Link>
          <Link href="/orders" className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors">
              My Orders
          </Link>
      </header>
      
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "55%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
        drag="y"
        dragConstraints={{ top: 50, bottom: (typeof window !== 'undefined' ? window.innerHeight * 0.55 : 400) }}
        className="absolute bottom-0 left-0 right-0 h-full bg-white rounded-t-3xl shadow-2xl z-10"
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3 cursor-grab"></div>
        
        <div className="px-4">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Estimated Arrival</h1>
                <p className="text-orange-500 font-bold text-4xl mt-1">20 Mins</p>
            </div>

            <div className="mt-4">
                {trackingSteps.map((step, index) => (
                    <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center h-full">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.active ? 'bg-yellow-400 text-white' : step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                <step.icon className="w-5 h-5"/>
                            </div>
                            {index < trackingSteps.length - 1 && (
                                <div className={`w-0.5 flex-grow my-1 ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                            )}
                        </div>
                        <div className="pb-6">
                            <p className={`font-semibold ${step.active ? 'text-yellow-500' : 'text-gray-800'}`}>{step.status}</p>
                            <p className="text-xs text-gray-500">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="border-t pt-4 space-y-3">
                <div className="bg-gray-50 p-3 rounded-2xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image src="https://i.pravatar.cc/150?img=5" alt="Delivery person" fill className="object-cover"/>
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">John Doe</p>
                            <p className="text-sm text-gray-500">Your Delivery Hero</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-3 bg-white rounded-full text-gray-700 border shadow-sm hover:bg-gray-100"><Phone className="w-5 h-5"/></button>
                        <button className="p-3 bg-white rounded-full text-gray-700 border shadow-sm hover:bg-gray-100"><MessageSquare className="w-5 h-5"/></button>
                    </div>
                </div>

                 <button onClick={() => setIsCancelling(true)} className="w-full flex items-center justify-center gap-2 py-3 font-semibold bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors">
                    <XCircle className="w-5 h-5" />
                    Cancel Order
                </button>
            </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isCancelling && <CancelOrderModal onClose={() => setIsCancelling(false)} />}
      </AnimatePresence>
    </div>
  );
}

