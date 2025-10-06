"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useDeliveryStore, DeliveryOrder } from "@/app/hooks/useDeliveryStore";

export default function DeliveryHomePage() {
  const [isOnline, setIsOnline] = useState(true);
  const { orders, acceptOrder, activeOrder } = useDeliveryStore();
  const router = useRouter();

  const handleAcceptOrder = async (orderId: string) => {
    if (activeOrder) {
      // In a real app, you might use a more user-friendly notification system like a toast.
      alert("Please complete your active order before accepting a new one.");
      return;
    }
    if (await acceptOrder(orderId)) {
      router.push("/delivery/map"); // Redirect to map on successful accept
    }
  };

  return (
    <>
      <header className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Welcome back,</p>
            <h1 className="text-xl font-bold text-gray-800">John Doe</h1>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-semibold ${
                isOnline ? "text-green-600" : "text-red-600"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`w-12 h-6 rounded-full flex items-center transition-colors p-1 ${
                isOnline ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                  isOnline ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        {/* Active Order Banner */}
        {activeOrder && (
          <motion.div
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              href="/delivery/map"
              className="block bg-orange-100 border-2 border-orange-400 rounded-2xl p-4 shadow-md text-center"
            >
              <p className="font-bold text-orange-600">
                You have an active order!
              </p>
              <p className="text-sm text-orange-500">
                Tap here to view your delivery progress.
              </p>
            </Link>
          </motion.div>
        )}

        <h2 className="text-lg font-bold text-gray-800 mb-3">
          New Orders Available
        </h2>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <OrderCard
                order={order}
                onAccept={() => handleAcceptOrder(order.id)}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
}

const OrderCard = ({
  order,
  onAccept,
}: {
  order: DeliveryOrder;
  onAccept: () => void;
}) => (
  <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-bold text-gray-800">{order.id}</p>
        <p className="text-sm text-gray-500">{order.distance} away</p>
      </div>
      <p className="text-lg font-bold text-green-600">{order.earnings}</p>
    </div>
    <div className="border-t my-3"></div>
    <div>
      <p className="text-xs text-gray-500">FROM</p>
      <p className="font-semibold">{order.pickupAddress}</p>
    </div>
    <div className="my-2">
      <ArrowRight className="w-4 h-4 text-gray-400 transform rotate-90 mx-auto" />
    </div>
    <div>
      <p className="text-xs text-gray-500">TO</p>
      <p className="font-semibold">{order.deliveryAddress}</p>
    </div>
    <div className="border-t mt-3 pt-3">
      <button
        onClick={onAccept}
        className="w-full py-3 text-center font-bold text-white bg-gray-800 rounded-full hover:bg-gray-900"
      >
        Accept Order
      </button>
    </div>
  </div>
);
