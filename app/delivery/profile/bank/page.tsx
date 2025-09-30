"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark, Hash, User } from 'lucide-react';

export default function BankInfoPage() {
    return (
        <>
            <header className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center gap-4">
                <Link href="/delivery/profile" aria-label="Go back to profile">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </Link>
                <h1 className="text-xl font-bold text-gray-800">Bank Information</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-4">
                 <form className="space-y-4">
                    <InputField icon={Landmark} label="Bank Name" name="bankName" defaultValue="State Bank of India" />
                    <InputField icon={User} label="Account Holder Name" name="holderName" defaultValue="John Doe" />
                    <InputField icon={Hash} label="Account Number" name="accountNumber" defaultValue="**** **** **** 1234" />
                     <div className="pt-4">
                        <button type="submit" className="w-full bg-gray-800 text-white font-bold py-4 rounded-full text-center hover:bg-gray-900 transition-colors">
                            Save Bank Details
                        </button>
                    </div>
                 </form>
            </main>
        </>
    );
}

const InputField = ({ icon: Icon, label, name, defaultValue, type = "text" }: {
    icon: React.ElementType,
    label: string,
    name: string,
    defaultValue: string,
    type?: string
}) => (
    <div>
        <label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <Icon className="w-4 h-4 text-gray-400" />
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            defaultValue={defaultValue}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
    </div>
);
