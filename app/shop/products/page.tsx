"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Search, Edit, Trash2, X, AlertTriangle } from 'lucide-react';
import { products as initialProducts, allCategories } from '@/app/data/mockData';

type Product = typeof initialProducts[0];

// --- Add/Edit Product Modal ---
const AddEditProductModal = ({ product, onSave, onCancel }: { product: Partial<Product> | null, onSave: (product: Product) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        price: product?.price || '$0.00',
        category: product?.category || 'packaged-snacks',
        image: product?.image || '/assets/images/placeholder.jpeg',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalProduct: Product = {
            id: product?.id || Date.now(),
            ...formData,
            liked: product?.liked || false,
        };
        onSave(finalProduct);
    };
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">{product?.id ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium">Product Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 w-full border border-gray-300 rounded-md p-2" required />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Category</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} className="mt-1 w-full border border-gray-300 rounded-md p-2">
                           {allCategories.map(cat => <option key={cat.slug} value={cat.slug}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Price</label>
                        <input type="text" name="price" value={formData.price} onChange={handleInputChange} className="mt-1 w-full border border-gray-300 rounded-md p-2" required />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={onCancel} className="w-full bg-gray-200 py-3 rounded-full font-semibold hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600">Save Product</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

// --- Delete Confirmation Modal ---
const DeleteConfirmationModal = ({ product, onConfirm, onCancel }: { product: Product, onConfirm: () => void, onCancel: () => void }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500 bg-red-50 p-2 rounded-full" />
            <h2 className="text-2xl font-bold mt-4">Delete Product?</h2>
            {/* CORRECTED: Replaced " with &quot; to fix unescaped entity error */}
            <p className="mt-2 text-gray-600">Are you sure you want to delete &quot;{product.name}&quot;? This action cannot be undone.</p>
            <div className="flex gap-4 mt-6">
                <button onClick={onCancel} className="w-full bg-gray-200 py-3 rounded-full font-semibold hover:bg-gray-300">Cancel</button>
                <button onClick={onConfirm} className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600">Delete</button>
            </div>
        </motion.div>
    </motion.div>
);

export default function ShopProductsPage() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Partial<Product> | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const filteredProducts = useMemo(() => {
        return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm]);

    const handleAddClick = () => {
        setProductToEdit({});
        setIsModalOpen(true);
    };

    const handleEditClick = (product: Product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };
    
    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
    };
    
    const handleConfirmDelete = () => {
        if (productToDelete) {
            setProducts(current => current.filter(p => p.id !== productToDelete.id));
            setProductToDelete(null);
        }
    };
    
    const handleSaveProduct = (product: Product) => {
        setProducts(current => {
            const exists = current.some(p => p.id === product.id);
            if (exists) {
                return current.map(p => p.id === product.id ? product : p);
            }
            return [...current, product];
        });
        setIsModalOpen(false);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Your Products</h1>
                    <button onClick={handleAddClick} className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors">
                        <PlusCircle className="w-5 h-5" />
                        Add Product
                    </button>
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    </div>
                </div>

                <div className="md:hidden space-y-3">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-sm p-3 border flex items-center gap-3">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="flex-grow">
                                <p className="font-bold text-gray-800">{product.name}</p>
                                <p className="text-sm text-gray-500">Stock: <span className="font-medium text-green-600">50 units</span></p>
                                <p className="text-sm text-gray-500">Cost: <span className="font-medium text-gray-700">{product.price}</span></p>
                            </div>
                            <div className="flex flex-col gap-2">
                               <button onClick={() => handleEditClick(product)} className="p-1.5 text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
                               <button onClick={() => handleDeleteClick(product)} className="p-1.5 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hidden md:block bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b text-gray-500">
                                    <th className="p-3">Product</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3">Stock</th>
                                    <th className="p-3">Cost</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                                                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                                                </div>
                                                <span className="font-semibold text-gray-700">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 capitalize">{product.category.replace('-', ' ')}</td>
                                        <td className="p-3 font-medium text-green-600">50 units</td>
                                        <td className="p-3 font-semibold">{product.price}</td>
                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => handleEditClick(product)} className="p-2 text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
                                                <button onClick={() => handleDeleteClick(product)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
            
            <AnimatePresence>
                {isModalOpen && <AddEditProductModal product={productToEdit} onSave={handleSaveProduct} onCancel={() => setIsModalOpen(false)} />}
                {productToDelete && <DeleteConfirmationModal product={productToDelete} onConfirm={handleConfirmDelete} onCancel={() => setProductToDelete(null)} />}
            </AnimatePresence>
        </>
    );
}

