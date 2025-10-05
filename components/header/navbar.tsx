"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const nabLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Categories", href: "/categories", icon: LayoutGrid },
  { name: "Cart", href: "/cart", icon: ShoppingCart, isCart: true },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "Profile", href: "/profile", icon: User },
];

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
                "flex items-center px-4 py-2 rounded-md",
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

export { BottomNav, Sidebar };
