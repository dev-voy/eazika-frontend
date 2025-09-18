"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation"; // Import the useParams hook
import MainLayout from "@/app/components/MainLayout";
import ProductCard from "@/app/components/ProductCard";
import { allCategories } from "@/app/data/mockData";
import { useProductStore } from "@/app/hooks/useProductStore";

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
const FilterIcon = ({ className }: { className?: string }) => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
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
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// REMOVED params from function signature
export default function SpecificCategoryPage() {
  const params = useParams(); // Use the hook to get params
  const slug = params.slug as string; // Get the slug from the params object

  const { products, handleLikeToggle } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");

  const categoryInfo = allCategories.find((c) => c.slug === slug);
  const categoryName = categoryInfo ? categoryInfo.name : "Category";

  const searchedProducts = useMemo(() => {
    const categoryProducts = products.filter((p) => p.category === slug);
    if (!searchTerm) return categoryProducts;
    return categoryProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, slug, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto bg-white flex flex-col min-h-screen">
        <header className="bg-yellow-500/80 backdrop-blur-sm px-4 md:px-6 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center mb-4">
            <Link href="/categories">
              <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
            </Link>
            <button>
              <FilterIcon className="w-6 h-6 text-gray-800" />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {categoryName} Category
          </h1>
          <p className="text-gray-700">{categoryInfo?.count || 0} items</p>
        </header>
        <main className="flex-grow overflow-y-auto p-4 md:p-6 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-6 max-w-md"
          >
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-3 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </motion.div>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {searchedProducts.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link
                  href={`/products/${item.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <ProductCard
                    {...item}
                    onLikeToggle={(e: React.MouseEvent) => {
                      e.preventDefault();
                      handleLikeToggle(item.id);
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </MainLayout>
  );
}
