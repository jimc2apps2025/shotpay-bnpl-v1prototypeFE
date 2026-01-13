"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Site Navigation */}
      <Navigation />
      
      {/* Dashboard Layout */}
      <div className="flex flex-1 bg-shopify-gray overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
          
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {children}
            </div>
          </main>
        </div>
      </div>
      
      {/* Main Site Footer */}
      <Footer />
    </div>
  );
};
