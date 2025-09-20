"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import MainLayout from '@/app/components/MainLayout';
import { ArrowLeftIcon } from '@/app/components/Icons';

export default function OrderDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    return (
        <MainLayout>
            <div className="w-full max-w-5xl mx-auto bg-gray-50 min-h-screen">
                <header className="px-4 md:px-6 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
                    <Link href="/orders" aria-label="Go back to orders">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
                </header>
                <main className="flex-grow overflow-y-auto p-4 md:p-6">
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-xl font-bold">Invoice for Order #{id}</h2>
                        <p className="mt-4 text-gray-600">Details and invoice for order {id} will be displayed here. You can add item summaries, pricing, and a download link for the invoice.</p>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
