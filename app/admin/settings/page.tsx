"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CreditCard, Percent } from 'lucide-react';

export default function AdminSettingsPage() {
    // Mock state for settings
    const [settings, setSettings] = useState({
        commissionRate: 15,
        pushNotifications: true,
        emailNotifications: false,
    });

    const handleToggle = (key: 'pushNotifications' | 'emailNotifications') => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Settings</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Settings Form */}
                <div className="lg:col-span-2 space-y-6">
                    <SettingsCard title="Commission Settings" icon={Percent}>
                        <div>
                            <label htmlFor="commissionRate" className="text-sm font-medium text-gray-700">Platform Commission Rate (%)</label>
                            <input
                                id="commissionRate"
                                type="number"
                                value={settings.commissionRate}
                                onChange={(e) => setSettings(prev => ({ ...prev, commissionRate: Number(e.target.value) }))}
                                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                    </SettingsCard>

                     <SettingsCard title="Notification Settings" icon={Bell}>
                        <ToggleSetting 
                            label="New Order Push Notifications" 
                            enabled={settings.pushNotifications} 
                            onToggle={() => handleToggle('pushNotifications')} 
                        />
                        <ToggleSetting 
                            label="New User Email Notifications" 
                            enabled={settings.emailNotifications} 
                            onToggle={() => handleToggle('emailNotifications')} 
                        />
                    </SettingsCard>
                </div>
                
                {/* Side Panel for Payment Gateways */}
                <div className="lg:col-span-1">
                     <SettingsCard title="Payment Gateways" icon={CreditCard}>
                        <p className="text-sm text-gray-500 mb-4">Manage your payment processor API keys.</p>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-gray-600">Stripe API Key</label>
                                <input type="password" placeholder="**************" className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md p-2" />
                            </div>
                             <div>
                                <label className="text-xs font-medium text-gray-600">PayPal API Key</label>
                                <input type="password" placeholder="**************" className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md p-2" />
                            </div>
                        </div>
                    </SettingsCard>
                </div>
            </div>
             <div className="mt-6">
                <button type="submit" className="px-8 py-3 bg-orange-500 text-white font-bold rounded-full text-center hover:bg-orange-600 transition-colors">
                    Save All Settings
                </button>
            </div>
        </motion.div>
    );
}

// Reusable Components
const SettingsCard = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
            <Icon className="w-6 h-6 text-gray-500" />
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="space-y-4">{children}</div>
    </div>
);

const ToggleSetting = ({ label, enabled, onToggle }: { label: string, enabled: boolean, onToggle: () => void }) => (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <label className="font-medium text-gray-700">{label}</label>
        <button onClick={onToggle} className={`w-12 h-6 rounded-full flex items-center transition-colors ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
            <span className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}></span>
        </button>
    </div>
);
