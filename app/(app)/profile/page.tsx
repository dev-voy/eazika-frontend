"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Edit,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { endUserSession } from "@/store/actions/userActions";

// Reusable component for menu items
const ProfileMenuItem = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <Link
    href={href}
    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
  >
    <div className="flex items-center space-x-4">
      <Icon className="h-6 w-6 text-gray-500 group-hover:text-orange-500" />
      <span className="font-semibold text-gray-800">{label}</span>
    </div>
    <ChevronRight className="h-5 w-5 text-gray-400" />
  </Link>
);

// --- Logout Confirmation Modal ---
const LogoutConfirmationModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center"
    >
      <LogOut className="mx-auto h-12 w-12 text-red-500 bg-red-50 p-2 rounded-full" />
      <h2 className="text-2xl font-bold mt-4 text-gray-800">Confirm Logout</h2>
      <p className="mt-2 text-gray-600">
        Are you sure you want to log out of your account?
      </p>
      <div className="flex gap-4 mt-6">
        <button
          onClick={onCancel}
          className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-full text-center hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="w-full bg-red-500 text-white font-bold py-3 rounded-full text-center hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const initials = useMemo(() => {
    if (!user?.name) {
      return "U";
    }

    return user.name
      .split(" ")
      .filter(Boolean)
      .map((segment) => segment[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2);
  }, [user?.name]);

  const shouldShowProfile = isAuthenticated && Boolean(user?.id);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    endUserSession(dispatch);
    router.push("/");
  };

  if (!shouldShowProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    );
  }

  const avatarSrc = user.profileImage ?? undefined;

  const menuItems = [
    { icon: ShoppingBag, label: "My Orders", href: "/orders" },
    { icon: Heart, label: "Wishlist", href: "/favorites" },
    { icon: MapPin, label: "Delivery Addresses", href: "/addresses" },
    { icon: CreditCard, label: "Payment Methods", href: "/payment-methods" },
  ];

  const supportItems = [
    { icon: HelpCircle, label: "Help & Support", href: "/support" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* CORRECTED: Removed max-w-5xl and mx-auto to allow full width */}
      <div className="w-full bg-gray-50 min-h-screen">
        <main className="overflow-y-auto p-4 md:p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full relative overflow-hidden border-2 border-white/50">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={avatarSrc} alt={user.name} />
                    <AvatarFallback className="text-black text-2xl font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h1 className="text-xl font-bold">{user.name}</h1>
                  <p className="text-white/80">{user.email}</p>
                  <p className="text-white/80 text-sm">{user.phone}</p>
                </div>
              </div>
              <Link
                href="/settings"
                className="p-2 bg-black bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Edit className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Grid layout for desktop */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="divide-y divide-gray-100">
                {menuItems.map((item) => (
                  <ProfileMenuItem key={item.label} {...item} />
                ))}
              </div>
            </motion.div>

            <div className="space-y-6 mt-6 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="divide-y divide-gray-100">
                  {supportItems.map((item) => (
                    <ProfileMenuItem key={item.label} {...item} />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center justify-center p-4 text-red-600 font-semibold bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
      <AnimatePresence>
        {showLogoutConfirm && (
          <LogoutConfirmationModal
            onConfirm={handleLogout}
            onCancel={() => setShowLogoutConfirm(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
