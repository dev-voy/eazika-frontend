import React from 'react';
import AdminSidebar from '@/app/components/AdminSidebar';
import AdminBottomNav from '@/app/components/AdminBottomNav'; // Import the new mobile navigation

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar for desktop */}
      <AdminSidebar />
      
      <div className="md:ml-64">
        {/* Added padding-bottom to clear the fixed mobile nav */}
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* Bottom navigation for mobile */}
      <AdminBottomNav />
    </div>
  );
}

