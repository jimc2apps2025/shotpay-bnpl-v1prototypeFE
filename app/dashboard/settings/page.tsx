"use client";

import { DashboardLayout } from "@/components/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-shopify-text mb-2">Settings</h1>
        <p className="text-shopify-subdued mb-8">Manage your account and store settings.</p>
        
        <div className="shopify-card p-6">
          <h2 className="text-lg font-semibold text-shopify-text mb-4">Account Settings</h2>
          <p className="text-sm text-shopify-subdued">Update your account information, preferences, and security settings.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
