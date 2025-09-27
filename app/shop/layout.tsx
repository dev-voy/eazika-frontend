import React from 'react';
import ShopSidebar from '@/app/components/ShopSidebar';
import ShopHeader from '@/app/components/ShopHeader';
import ShopBottomNav from '@/app/components/ShopBottomNav'; // Import the new mobile navigation

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar for desktop */}
      <ShopSidebar />
      
      <div className="md:ml-64">
        <ShopHeader />
        {/* Added padding-bottom to prevent content from hiding behind the mobile nav */}
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* Bottom navigation for mobile */}
      <ShopBottomNav />
    </div>
  );
}

