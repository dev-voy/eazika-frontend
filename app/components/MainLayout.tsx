import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Bottom Navigation */}
      <BottomNav />
      
      {/* Main Content Area */}
      <div className="md:ml-64">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
