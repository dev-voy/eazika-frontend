import React from 'react';
import { BellIcon } from './Icons';

const Header = () => {
  return (
    <header className="px-4 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Good Morning</p>
          <h1 className="text-2xl font-bold text-gray-800">Rafatul Islam</h1>
        </div>
        <div className="relative">
          <BellIcon className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
