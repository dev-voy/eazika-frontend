"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Home,
  LayoutGrid,
  ShoppingCart,
  Heart,
  User,
  Bell,
  ArrowLeftIcon,
} from "lucide-react";

const nabLinks = [
  { name: "Home", href: "/", icon: Home, backButtonName: "All Categories" },
  {
    name: "Categories",
    href: "/categories",
    icon: LayoutGrid,
    backButtonName: "All Categories",
  },
  {
    name: "Cart",
    href: "/cart",
    icon: ShoppingCart,
    isCart: true,
    backButtonName: "Shopping Cart",
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: Heart,
    backButtonName: "My Wishlist",
  },
  { name: "Profile", href: "/profile", icon: User },
];

function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Sidebar />
      <BottomNav />
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}

const Header = () => {
  const { user, auth } = useSelector((state: RootState) => state);
  const pathname = usePathname();
  return (
    <header className="px-4 md:px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-20 border-b">
      {auth.isAuthenticated ? (
        <>
          <div>
            <p className="text-sm text-gray-500">Hello</p>
            <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/notifications"
              className="relative p-2 rounded-full hover:bg-gray-100"
            >
              <Bell />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </Link>
          </div>
        </>
      ) : (
        <>
          {pathname == "/" ? (
            <>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome to Eazika
              </h1>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <Link href="/" aria-label="Go back">
                  <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">
                  {nabLinks.find((link) => link.href === pathname)
                    ?.backButtonName || "Back"}
                </h1>
              </div>
            </>
          )}
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </>
      )}
    </header>
  );
};

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen px-4 py-8 bg-white border-r fixed">
      <h2 className="text-3xl font-bold text-orange-500 mb-8">
        <Link href="/">Eazika</Link>
      </h2>
      <div className="flex flex-col justify-between flex-1">
        <nav>
          {nabLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center px-4 py-2 mb-5 rounded-md",
                link.href === pathname
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <link.icon className="w-6 h-6" />
              <span className="mx-4 font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

const BottomNav = () => {
  const pathname = usePathname();

  const numberOfCartItems = 2;

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 w-full  bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {nabLinks.map((link) =>
          link.isCart ? (
            <Link
              key={link.href}
              href={link.href}
              className="relative w-1/5 flex justify-center"
            >
              <div
                className={cn(
                  "transition-transform duration-300",
                  pathname == link.href && "transform scale-110"
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 bg-white rounded-full flex items-center justify-center -mt-8 border-4 shadow-md transition-colors duration-300",
                    pathname === link.href
                      ? "border-orange-500"
                      : "border-gray-100"
                  )}
                >
                  <div className="w-11 h-11 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800">
                    <link.icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
              {numberOfCartItems > 0 && (
                <span className="absolute top-0 right-1 text-xs bg-orange-500 text-white font-semibold rounded-full px-1.5 py-0.5">
                  {numberOfCartItems}
                </span>
              )}
            </Link>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "w-1/5 flex flex-col items-center justify-center gap-1 transition-colors duration-300",
                pathname === link.href
                  ? "text-orange-500"
                  : "text-gray-500 hover:text-orange-500"
              )}
            >
              <link.icon className="w-6 h-6" />
              <span className="text-xs font-bold">{link.name}</span>
            </Link>
          )
        )}
      </div>
    </footer>
  );
};
export default HeaderLayout;
export { Header, Sidebar, BottomNav };
