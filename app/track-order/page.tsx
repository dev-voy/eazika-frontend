"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// --- SVG Icons ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
const PackageIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16.5 9.4l-9-5.19"></path>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);
const TruckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export default function TrackOrderPage() {
  const trackingSteps = [
    {
      status: "Order Confirmed",
      date: "15 Sep, 2025",
      icon: CheckCircleIcon,
      completed: true,
    },
    {
      status: "Processing",
      date: "15 Sep, 2025",
      icon: PackageIcon,
      completed: true,
    },
    {
      status: "On its way",
      date: "16 Sep, 2025",
      icon: TruckIcon,
      completed: true,
      active: true,
    },
    {
      status: "Delivered",
      date: "Est. 17 Sep",
      icon: CheckCircleIcon,
      completed: false,
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto bg-gray-50 flex flex-col h-screen">
        <header className="px-4 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
          <Link href="/" aria-label="Go home">
            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Track Order</h1>
        </header>

        <main className="flex-grow overflow-y-auto p-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Estimated Delivery</p>
                <p className="font-bold text-lg text-gray-800">
                  17 September, 2025
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Order ID</p>
                <p className="font-bold text-lg text-gray-800">#EAZ123456</p>
              </div>
            </div>
            {/* Timeline */}
            <div className="mt-8">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.active
                          ? "bg-yellow-400 text-white"
                          : step.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`w-0.5 flex-grow ${
                          step.completed ? "bg-green-500" : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="pb-8">
                    <p
                      className={`font-bold ${
                        step.active ? "text-yellow-500" : "text-gray-800"
                      }`}
                    >
                      {step.status}
                    </p>
                    <p className="text-sm text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-6 h-48 bg-white rounded-2xl shadow-sm overflow-hidden relative">
            <Image
              src="https://placehold.co/600x400/F7F7F7/333333?text=Map+View&font=raleway"
              alt="Map of delivery route"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Delivery Person */}
          <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src="https://i.pravatar.cc/150?img=5"
                alt="Delivery person"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-bold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-500">Delivery Hero</p>
              </div>
            </div>
            <button className="p-3 bg-gray-100 rounded-full text-gray-700">
              <PhoneIcon className="w-6 h-6" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
