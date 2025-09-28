"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Store, Bike, ShieldCheck, ShieldOff, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

// Mock data for users
const initialUsers = [
    { id: 1, name: 'John Doe', role: 'Customer', contact: 'john.doe@email.com', status: 'Active', avatar: '/assets/images/user1.jpeg' },
    { id: 2, name: 'Jane Smith', role: 'Customer', contact: 'jane.smith@email.com', status: 'Active', avatar: '/assets/images/user2.jpeg' },
    { id: 3, name: 'Rafatul Islam', role: 'Shopkeeper', contact: 'contact@eazika.com', status: 'Active', avatar: '/assets/images/profile-pic.jpeg' },
    { id: 4, name: 'Mike R.', role: 'Driver', contact: '+1-234-567-8901', status: 'Active', avatar: '/assets/images/driver1.jpeg' },
    { id: 5, name: 'Anna K.', role: 'Driver', contact: '+1-987-654-3210', status: 'Inactive', avatar: '/assets/images/driver2.jpeg' },
];

type UserType = typeof initialUsers[0];

// --- Confirmation Modal ---
const StatusConfirmationModal = ({ user, onConfirm, onCancel }: { user: UserType, onConfirm: () => void, onCancel: () => void }) => {
    const isActivating = user.status === 'Inactive';
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
                <AlertTriangle className={`mx-auto h-12 w-12 ${isActivating ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'} p-2 rounded-full`} />
                <h2 className="text-2xl font-bold mt-4">Confirm Status Change</h2>
                {/* CORRECTED: Replaced " with &quot; to fix unescaped entity error */}
                <p className="mt-2 text-gray-600">Are you sure you want to {isActivating ? 'activate' : 'deactivate'} the user &quot;{user.name}&quot;?</p>
                <div className="flex gap-4 mt-6">
                    <button onClick={onCancel} className="w-full bg-gray-200 py-3 rounded-full font-semibold hover:bg-gray-300">Cancel</button>
                    <button onClick={onConfirm} className={`w-full text-white py-3 rounded-full font-semibold ${isActivating ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                        {isActivating ? 'Activate User' : 'Deactivate User'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};


export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserType[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [userToToggle, setUserToToggle] = useState<UserType | null>(null);

    const filteredUsers = useMemo(() => {
        return users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.contact.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);
    
    const handleStatusToggle = () => {
        if (!userToToggle) return;
        setUsers(currentUsers =>
            currentUsers.map(user =>
                user.id === userToToggle.id
                ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                : user
            )
        );
        setUserToToggle(null); // Close the modal
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

                <div className="mb-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search by name, role, or contact..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    </div>
                </div>

                {/* Mobile View: Card List */}
                <div className="md:hidden space-y-3">
                    {filteredUsers.map(user => (
                        <UserCard key={user.id} user={user} onToggleClick={() => setUserToToggle(user)} />
                    ))}
                </div>

                {/* Desktop View: Table */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b text-gray-500">
                                    <th className="p-3">User</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Contact</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                                                </div>
                                                <span className="font-semibold text-gray-700">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3"><RolePill role={user.role} /></td>
                                        <td className="p-3 text-gray-600">{user.contact}</td>
                                        <td className="p-3"><StatusPill status={user.status} /></td>
                                        <td className="p-3 text-center">
                                            <button onClick={() => setUserToToggle(user)} className="p-2 text-gray-500 hover:text-red-600">
                                                {user.status === 'Active' ? <ShieldOff className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
            
            <AnimatePresence>
                {userToToggle && (
                    <StatusConfirmationModal 
                        user={userToToggle}
                        onConfirm={handleStatusToggle}
                        onCancel={() => setUserToToggle(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

// Reusable Components
const UserCard = ({ user, onToggleClick }: { user: UserType, onToggleClick: () => void }) => (
    <div className="bg-white rounded-lg shadow-sm p-3 border flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
        </div>
        <div className="flex-grow">
            <p className="font-bold text-gray-800">{user.name}</p>
            <div className="flex items-center gap-2">
                <RolePill role={user.role} />
                <StatusPill status={user.status} />
            </div>
        </div>
        <button onClick={onToggleClick} className="p-2 text-gray-500 hover:text-red-600">
            {user.status === 'Active' ? <ShieldOff className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
        </button>
    </div>
);

const RolePill = ({ role }: { role: string }) => {
    const roleMap = {
        'Customer': { icon: User, color: 'bg-blue-100 text-blue-700' },
        'Shopkeeper': { icon: Store, color: 'bg-purple-100 text-purple-700' },
        'Driver': { icon: Bike, color: 'bg-yellow-100 text-yellow-700' },
    };
    const { icon: Icon, color } = roleMap[role as keyof typeof roleMap];

    return (
        <span className={`flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded-full ${color}`}>
            <Icon className="w-3 h-3" />
            {role}
        </span>
    );
};

const StatusPill = ({ status }: { status: string }) => (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
        status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
        {status}
    </span>
);

