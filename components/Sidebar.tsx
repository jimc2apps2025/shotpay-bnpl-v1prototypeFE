"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-shopify-gray border-r border-shopify-border transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo / Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-shopify-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 relative flex-shrink-0">
                <Image
                  src="/logo-shield.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  sizes="32px"
                />
              </div>
              <span className="font-semibold text-shopify-text">Shotpay</span>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 text-shopify-subdued hover:bg-gray-200 rounded-md">
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const isDisabled = item.disabled === true;
                
                if (isDisabled) {
                  return (
                    <div
                      key={item.name}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-not-allowed opacity-50",
                        "text-shopify-subdued"
                      )}
                      title="Coming soon"
                    >
                      <item.icon className="mr-3 h-5 w-5 text-shopify-subdued" />
                      {item.name}
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive 
                        ? "bg-white text-shopify-text shadow-sm border border-shopify-border" 
                        : "text-shopify-subdued hover:bg-gray-200"
                    )}
                  >
                    <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-shopify-green" : "text-shopify-subdued")} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 px-4">
              <h3 className="text-xs font-semibold text-shopify-subdued uppercase tracking-wider">
                Sales channels
              </h3>
            </div>
            
            <nav className="mt-2 space-y-1 px-2">
              {SECONDARY_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive 
                        ? "bg-white text-shopify-text shadow-sm border border-shopify-border" 
                        : "text-shopify-subdued hover:bg-gray-200"
                    )}
                  >
                    <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-shopify-green" : "text-shopify-subdued")} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Section */}
          <div className="p-4 border-t border-shopify-border">
            <div className="flex items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                JD
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-shopify-text truncate">John's Store</p>
                <p className="text-xs text-shopify-subdued truncate">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
