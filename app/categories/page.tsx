import React from 'react';
import Link from 'next/link'; // Import Link
import BottomNav from '../components/BottomNav';

// --- SVG Icons (same as before) ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const FruitsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M11.13 16.05C11.33 16.53 11.66 17 12.19 17H12.22C12.75 17 13.08 16.53 13.28 16.05L15 12H9.42L11.13 16.05z" /><path d="M12.79 12c.98-.02 1.84-.42 2.52-1.05.73-.68 1.15-1.58 1.19-2.5.07-1.49-.83-2.74-2.14-3.23" /><path d="M11.21 12c-.98-.02-1.84-.42-2.52-1.05-.73-.68-1.15-1.58-1.19-2.5C7.43 7.02 6.53 5.77 5.22 5.28" /><path d="M16 12h-2" /><path d="M12 17c0 2.21-1.79 4-4 4" /><path d="M16.5 14c-2.3 0-4.18-1.53-4.45-3.5" /></svg>;
const VegetablesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M5.62 15.38a3.1 3.1 0 0 0-.25 3.33l1.1 1.7a1 1 0 0 0 1.6 0l1.1-1.7c.3-.5.35-1.1.25-1.62l-3.8-5.38" /><path d="M12 14v-2" /><path d="M15.04 16.46a3.1 3.1 0 0 0 3.32-.25l1.7-1.1a1 1 0 0 0 0-1.6l-1.7-1.1a3.1 3.1 0 0 0-3.32-.25l-5.38 3.8" /><path d="M12 21a2 2 0 0 0 2-2v-2H5a2 2 0 0 0-2 2" /><path d="M16 4c0 2.21-1.79 4-4 4S8 6.21 8 4" /><path d="m14 8-1.23 1.23a2 2 0 0 1-2.82 0L8.72 8.01" /></svg>;
const MushroomIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M20 11.5c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 1.54.44 2.97 1.2 4.15C2.47 16.71 2 18.26 2 20h20c0-1.74-.47-3.29-1.2-4.35.76-1.18 1.2-2.61 1.2-4.15z" /><path d="M8 20v-2a4 4 0 0 1 8 0v2" /></svg>;
const DairyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M8 2h8v2H8z" /><path d="M9 4.11V20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4.11" /><path d="M17 9.11h-2.5a1.5 1.5 0 0 0 0 3H17" /><path d="m12.5 15-1-1-1 1" /><path d="m12.5 12-1-1-1 1" /></svg>;
const OatsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M21.01 17.29c.14-.36.2-1.04.1-1.72-.1-.71-.29-1.33-.56-1.87-.27-.54-.6-.99-1.01-1.35s-.89-.6-1.43-.73c-.54-.13-1.12-.13-1.68.02-.56.15-1.06.4-1.48.75-.42.35-.76.78-1.01 1.28-.25.5-.41 1.05-.48 1.63-.07.58-.05 1.18.06 1.76s.31 1.11.59 1.58c.28.47.64.88 1.06 1.2s.9.55 1.41.67c.5.12 1.03.13 1.51.02s.93-.34 1.32-.71c.39-.37.71-.82.93-1.32.22-.5.35-1.04.38-1.58Z" /><path d="M12.53 7.82c.11-.27.24-.65.26-1.14s-.06-1.01-.26-1.42c-.2-.41-.5-.73-.86-.95s-.78-.34-1.2-.34c-.42,0-.81.08-1.14.24-.33.16-.62.4-.84.7s-.37.66-.43 1.04-.03.77.1 1.1c.13.33.34.62.61.85s.59.39.93.46.68.03,1-.09c.32-.12.6-.33.82-.61s.36-.6.44-.95Z" /><path d="m5.5 12.5 3.5-1" /><path d="M2 16h.01" /><path d="M22 12h-2" /><path d="m4 4 1 1" /><path d="M19 8h-2" /></svg>;
const BreadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M21 11v1a8 8 0 0 1-8 8H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h11a8 8 0 0 1 8 8Z" /><path d="M2 8h20" /><path d="M14 3v8" /></svg>;
const RiceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M21.2 11.2 18 12.5l-3.3-3.3" /><path d="M20 6 18 8" /><path d="M12 18a6 6 0 0 1 6-6h-6Z" /><path d="M12 2a4 4 0 0 0-4 4c0 1.5.78 2.78-2 3.44" /><path d="M18 12a6 6 0 0 1-6 6v-6h6Z" /><path d="M12 2a4 4 0 0 1 4 4c0 1.5-.78 2.78-2 3.44" /></svg>;
const EggIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M12 22c-5 0-9-4.5-9-10S7 2 12 2s9 4.5 9 10-4 10-9 10Z" /><path d="M15.33 13.67a4 4 0 0 1-6.66 0" /><path d="M8.67 10.33a4 4 0 0 1 6.66 0" /></svg>;

// --- Mock Data ---
const categoryData = [
  { name: 'Fruits', count: 87, icon: <FruitsIcon /> },
  { name: 'Vegetables', count: 87, icon: <VegetablesIcon /> },
  { name: 'Mushroom', count: 87, icon: <MushroomIcon /> },
  { name: 'Dairy', count: 87, icon: <DairyIcon /> },
  { name: 'Oats', count: 87, icon: <OatsIcon /> },
  { name: 'Bread', count: 87, icon: <BreadIcon /> },
  { name: 'Rice', count: 27, icon: <RiceIcon /> },
  { name: 'Egg', count: 120, icon: <EggIcon /> },
];

export default function CategoriesPage() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto bg-gray-50 flex flex-col h-screen">
        <header className="px-4 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
          <Link href="/" aria-label="Go back">
            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Categories</h1>
        </header>
        <main className="flex-grow overflow-y-auto p-4 pb-24">
          <div className="grid grid-cols-2 gap-4">
            {categoryData.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 aspect-square">
                <div className="w-16 h-16 flex items-center justify-center">{category.icon}</div>
                <p className="text-lg font-bold text-orange-500">{category.name}</p>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </div>
            ))}
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

