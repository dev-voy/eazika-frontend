"use client";

import React, { useState } from 'react';
// CORRECTED: Changed to relative import paths
import DeliveryBottomNav from '../components/DeliveryBottomNav';
import DeliverySidebar from '../components/DeliverySidebar';
import { WifiOff } from 'lucide-react';

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isGpsOff, setIsGpsOff] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Sidebar for desktop */}
      <DeliverySidebar />
      
      {/* Main content area */}
      <div className="md:ml-64">
        <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 bg-gray-50 flex flex-col min-h-screen relative">
          {/* Added padding-bottom to clear the fixed mobile nav */}
          <div className="flex-grow pb-20 md:pb-6">
            {children}
          </div>

          {/* GPS Lock Screen Overlay */}
          {isGpsOff && (
              <div className="absolute inset-0 bg-black/80 z-50 flex flex-col items-center justify-center text-center p-8">
                  <WifiOff className="w-16 h-16 text-red-500 mb-4" />
                  <h2 className="text-2xl font-bold text-white">GPS is Offline</h2>
                  <p className="text-gray-300 mt-2">Please enable your location services to continue using the app.</p>
                  <button onClick={() => setIsGpsOff(false)} className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full">
                      Retry
                  </button>
              </div>
          )}
        </div>
      </div>
       
       {/* Bottom navigation for mobile */}
       <DeliveryBottomNav />
    </div>
  );
}

