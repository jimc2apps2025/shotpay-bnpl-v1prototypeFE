"use client";

import { DashboardLayout } from "@/components/DashboardLayout";

export default function OnlineStorePage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-shopify-text mb-2">Online Store</h1>
        <p className="text-shopify-subdued mb-8">Manage your online store settings and preferences.</p>
        
        <div className="shopify-card p-6">
          <h2 className="text-lg font-semibold text-shopify-text mb-4">Store Settings</h2>
          <p className="text-sm text-shopify-subdued">Configure your online store appearance, domain, and preferences.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
