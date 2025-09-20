"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <img src="/icon0.svg" alt="Eazika Logo" className="w-16 h-16 mx-auto" />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Forgot Password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        No worries, we'll send you reset instructions.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 space-y-6"
                >
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <div className="relative">
                            <input 
                                id="email-address" 
                                name="email" 
                                type="email" 
                                required 
                                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" 
                                placeholder="Enter your email address" 
                            />
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            Send Reset Link
                        </button>
                    </div>
                </motion.form>

                 <p className="mt-2 text-center text-sm text-gray-600">
                    Remembered your password?{' '}
                    <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
