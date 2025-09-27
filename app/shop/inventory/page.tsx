"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Edit, Check, X } from 'lucide-react';

// Using the full products list from our mock data and adding a stock property
import { products as initialProducts } from '@/app/data/mockData';

type ProductWithStock = typeof initialProducts[0] & { stock: number };

// --- Reusable Product Row/Card Component ---
const ProductInventoryItem = ({ 
    product, 
    onStockChange 
}: { 
    product: ProductWithStock, 
    onStockChange: (id: number, newStock: number) => void 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentStock, setCurrentStock] = useState(product.stock);

    const handleSave = () => {
        onStockChange(product.id, Number(currentStock));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setCurrentStock(product.stock);
        setIsEditing(false);
    };

    const stockStatus = product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock';

    return (
        <>
            {/* Mobile Card */}
            <div className="md:hidden bg-white rounded-lg shadow-sm p-3 border flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                    <p className="font-bold text-gray-800">{product.name}</p>
                    {isEditing ? (
                         <div className="flex items-center gap-2 mt-1">
                             <input type="number" value={currentStock} onChange={(e) => setCurrentStock(Number(e.target.value))} className="w-20 border-gray-300 rounded-md p-1 text-sm"/>
                             <button onClick={handleSave} className="p-1.5 text-green-600 bg-green-100 rounded-md"><Check className="w-4 h-4"/></button>
                             <button onClick={handleCancel} className="p-1.5 text-red-600 bg-red-100 rounded-md"><X className="w-4 h-4"/></button>
                         </div>
                    ) : (
                        <div className="flex items-center gap-2 mt-1">
                            <StockPill status={stockStatus} />
                            <p className="text-sm text-gray-500">{product.stock} units</p>
                            <button onClick={() => setIsEditing(true)} className="p-1 text-gray-400 hover:text-blue-600"><Edit className="w-3 h-3"/></button>
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop Row */}
            <tr className="hidden md:table-row border-b hover:bg-gray-50">
                <td className="p-3">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <span className="font-semibold text-gray-700">{product.name}</span>
                    </div>
                </td>
                <td className="p-3 capitalize">{product.category.replace('-', ' ')}</td>
                <td className="p-3"><StockPill status={stockStatus} /></td>
                <td className="p-3 font-semibold">
                    {isEditing ? (
                         <div className="flex items-center gap-2">
                             <input type="number" value={currentStock} onChange={(e) => setCurrentStock(Number(e.target.value))} className="w-20 border-gray-300 rounded-md p-1 text-sm"/>
                             <button onClick={handleSave} className="p-1.5 text-green-600 hover:bg-green-100 rounded-md"><Check className="w-4 h-4"/></button>
                             <button onClick={handleCancel} className="p-1.5 text-red-600 hover:bg-red-100 rounded-md"><X className="w-4 h-4"/></button>
                         </div>
                    ) : (
                         <div className="flex items-center gap-2">
                            <span>{product.stock} units</span>
                            <button onClick={() => setIsEditing(true)} className="p-1 text-gray-400 hover:text-blue-600"><Edit className="w-3 h-3"/></button>
                         </div>
                    )}
                </td>
            </tr>
        </>
    );
};

export default function InventoryPage() {
    const [products, setProducts] = useState<ProductWithStock[]>(() => 
        initialProducts.map(p => ({ ...p, stock: Math.floor(Math.random() * 100) }))
    );
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm]);

    const handleStockChange = (productId: number, newStock: number) => {
        setProducts(current => 
            current.map(p => p.id === productId ? { ...p, stock: newStock } : p)
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
            </div>
            <div className="mb-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                </div>
            </div>

            {/* Container for both mobile and desktop views */}
            <div>
                 {/* Mobile View */}
                <div className="md:hidden space-y-3">
                    {filteredProducts.map(product => (
                        <ProductInventoryItem key={product.id} product={product} onStockChange={handleStockChange} />
                    ))}
                </div>
                {/* Desktop View */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b bg-gray-50 text-gray-500">
                                <th className="p-3">Product</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Stock Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                               <ProductInventoryItem key={product.id} product={product} onStockChange={handleStockChange} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}

const StockPill = ({ status }: { status: string }) => (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1.5 w-fit ${
        status === 'In Stock' ? 'bg-green-100 text-green-700' :
        status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
        'bg-red-100 text-red-700'
    }`}>
        <span className={`w-2 h-2 rounded-full ${
             status === 'In Stock' ? 'bg-green-500' :
             status === 'Low Stock' ? 'bg-yellow-500' :
             'bg-red-500'
        }`}></span>
        {status}
    </span>
);
