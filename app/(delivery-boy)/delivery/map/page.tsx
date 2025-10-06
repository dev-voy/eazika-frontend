"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, MessageSquare, XCircle, X } from 'lucide-react';
import { FaUtensils } from 'react-icons/fa';
import { useDeliveryStore } from '@/app/hooks/useDeliveryStore';

// --- Reusable Cancel Order Modal Component ---
const CancelOrderModal = ({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) => {
    const cancelReasons = [
        "Unable to contact customer",
        "Deliver Location is more than the preferred distance specified",
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
                     <textarea placeholder="Customer Location is misleading and too far..." className="w-full h-24 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"></textarea>
                </div>
                <div className="p-4 border-t bg-white">
                    <button 
                        onClick={onConfirm}
                        className="w-full text-gray-800 font-bold py-4 rounded-full text-center transition-colors"
                        style={{ backgroundColor: '#ffe59a' }}
                    >
                        Cancel Order
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- OTP Confirmation Modal ---
const OtpModal = ({ onConfirm, onCancel }: { onConfirm: (otp: string) => void, onCancel: () => void }) => {
    const [otp, setOtp] = useState('');
    return (
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
                <h2 className="text-2xl font-bold text-gray-800">Enter OTP</h2>
                <p className="mt-2 text-gray-600">Please ask the customer for the 4-digit code to confirm delivery.</p>
                <input 
                    type="tel"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-center text-3xl tracking-[1em] font-bold mt-6 p-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="flex gap-4 mt-6">
                    <button onClick={onCancel} className="w-full bg-gray-200 py-3 rounded-full font-semibold hover:bg-gray-300">Cancel</button>
                    <button onClick={() => onConfirm(otp)} className="w-full bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600">Confirm</button>
                </div>
            </motion.div>
        </motion.div>
    );
};


export default function DeliveryMapPage() {
    const { activeOrder, updateActiveOrderStatus, confirmDeliveryWithOtp } = useDeliveryStore();
    const router = useRouter();
    const [isCancelling, setIsCancelling] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [peekHeight, setPeekHeight] = useState(300);

    useEffect(() => {
        setPeekHeight(window.innerHeight - 200);
    }, []);

    if (!activeOrder) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center p-8 bg-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">No Active Order</h2>
                <p className="text-gray-500 mt-2">Accept a new order from the homepage to begin.</p>
                <Link href="/delivery" className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full">
                    Back to Home
                </Link>
            </div>
        )
    }
    
    const handleMainActionClick = async () => {
        if (activeOrder.status === 'accepted') {
            await updateActiveOrderStatus('picked_up');
        } else if (activeOrder.status === 'picked_up') {
            await updateActiveOrderStatus('awaiting_otp');
            setShowOtpModal(true);
        }
    };

    const handleOtpConfirm = async (otp: string) => {
        if (await confirmDeliveryWithOtp(otp)) {
            setShowOtpModal(false);
            router.push('/delivery/orders');
        } else {
            alert("Invalid OTP. Please try again.");
        }
    };
    
    const handleCancel = async () => {
        await updateActiveOrderStatus('cancelled');
        setIsCancelling(false);
        router.push('/delivery/orders');
    };

    const getMainActionButton = () => {
        switch(activeOrder.status) {
            case 'accepted':
                return <button onClick={handleMainActionClick} className="w-full py-4 font-bold text-gray-800 rounded-full shadow-lg transition-colors" style={{ backgroundColor: '#ffe59a' }}>Arrive to Pickup</button>;
            case 'picked_up':
                return <button onClick={handleMainActionClick} className="w-full py-4 font-bold text-white bg-orange-500 rounded-full shadow-lg hover:bg-orange-600">Confirm Delivery</button>;
            case 'awaiting_otp':
                return <button disabled className="w-full py-4 font-bold text-gray-500 bg-gray-200 rounded-full shadow-lg cursor-not-allowed">Awaiting OTP</button>;
            default:
                return null;
        }
    }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-200">
      <div className="absolute inset-0 z-0">
         <Image 
            src="https://placehold.co/800x1200/e2e8f0/333333?text=Live+Map&font=raleway" 
            alt="Live map view"
            fill
            className="object-cover"
         />
      </div>
      
      <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
          <Link href="/delivery" className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          </Link>
          <div className="px-4 py-2 bg-black/70 text-white font-semibold rounded-full shadow-lg backdrop-blur-sm">
              {activeOrder.id}
          </div>
          <button className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors">
              More Info
          </button>
      </header>
      
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: peekHeight }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
        drag="y"
        dragConstraints={{ top: 100, bottom: peekHeight }}
        className="absolute bottom-0 left-0 right-0 h-full bg-white rounded-t-3xl shadow-2xl z-10"
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3 cursor-grab"></div>
        
        <div className="px-4">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="font-bold text-lg">{activeOrder.customerName} <span className="text-gray-500 font-medium">{activeOrder.id}</span></h2>
                    <p className="text-sm text-gray-600">{activeOrder.deliveryAddress}</p>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg">{activeOrder.earnings}</p>
                    <p className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">COD</p>
                </div>
            </div>

            <div className="space-y-3 my-4">
                <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-gray-800">{activeOrder.pickupAddress}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-gray-800">{activeOrder.deliveryAddress}</p>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-b py-3 flex items-start gap-3">
                <FaUtensils className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0"/>
                <div>
                    <p className="font-semibold text-gray-800">3 Items</p>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                <div className="flex gap-3">
                    <a href="tel:12345678" className="w-full flex items-center justify-center gap-2 py-3 font-semibold bg-gray-100 rounded-full"><Phone className="w-4 h-4"/> Call</a>
                    <a href="/delivery/chat" className="w-full flex items-center justify-center gap-2 py-3 font-semibold bg-gray-100 rounded-full"><MessageSquare className="w-4 h-4"/> Chat</a>
                    <button onClick={() => setIsCancelling(true)} className="w-full flex items-center justify-center gap-2 py-3 font-semibold bg-red-50 text-red-600 rounded-full"><XCircle className="w-4 h-4"/> Cancel</button>
                </div>
                 {getMainActionButton()}
            </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isCancelling && <CancelOrderModal onClose={() => setIsCancelling(false)} onConfirm={handleCancel} />}
        {showOtpModal && <OtpModal onConfirm={handleOtpConfirm} onCancel={() => { setShowOtpModal(false); updateActiveOrderStatus('picked_up'); }} />}
      </AnimatePresence>
    </div>
  );
}

