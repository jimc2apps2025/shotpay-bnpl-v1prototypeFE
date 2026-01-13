"use client";

import React from "react";
import { Search, Bell, Menu, User } from "lucide-react";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export const Header = ({ onOpenSidebar }: HeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-shopify-border sticky top-0 z-30 px-4 lg:px-6 flex items-center justify-between">
      <div className="flex items-center flex-1">
        <button 
          onClick={onOpenSidebar}
          className="p-2 mr-4 text-shopify-subdued hover:bg-gray-100 rounded-md lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="max-w-md w-full relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-shopify-subdued" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-shopify-border rounded-md bg-shopify-gray text-sm placeholder-shopify-subdued focus:outline-none focus:ring-1 focus:ring-shopify-green focus:border-shopify-green"
            placeholder="Search"
          />
        </div>
        <button className="p-2 text-shopify-subdued hover:bg-gray-100 rounded-md sm:hidden">
          <Search size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-4">
        <button className="p-2 text-shopify-subdued hover:bg-gray-100 rounded-md relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="flex items-center p-1 lg:p-2 text-shopify-subdued hover:bg-gray-100 rounded-md">
          <span className="hidden sm:inline mr-2 text-sm font-medium text-shopify-text">John Doe</span>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={18} />
          </div>
        </button>
      </div>
    </header>
  );
};
