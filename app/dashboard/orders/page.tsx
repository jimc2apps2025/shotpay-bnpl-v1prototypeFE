"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { RECENT_ORDERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Search, Filter, Download } from "lucide-react";

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-shopify-text">Orders</h1>
            <p className="text-shopify-subdued">View and manage all your orders</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 border border-shopify-border rounded-md bg-white text-sm font-medium text-shopify-text hover:bg-gray-50">
              <Download size={16} className="mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 border border-shopify-border rounded-md bg-white text-sm font-medium text-shopify-text hover:bg-gray-50">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-shopify-subdued" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-shopify-border rounded-md bg-white text-sm placeholder-shopify-subdued focus:outline-none focus:ring-1 focus:ring-shopify-green focus:border-shopify-green"
              placeholder="Search orders..."
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="shopify-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-shopify-gray text-shopify-subdued text-xs uppercase tracking-wider">
                  <th className="px-6 py-3 font-semibold">Order</th>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Total</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Fulfillment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-shopify-border">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-shopify-text">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-shopify-text">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-shopify-subdued">{order.date}</td>
                    <td className="px-6 py-4 text-sm text-shopify-text font-medium">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        order.status === "Paid" ? "bg-green-100 text-green-800" : 
                        order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        order.fulfillment === "Fulfilled" ? "bg-blue-100 text-blue-800" : 
                        order.fulfillment === "Unfulfilled" ? "bg-gray-100 text-gray-800" : 
                        "bg-green-100 text-green-800"
                      )}>
                        {order.fulfillment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-shopify-text">{RECENT_ORDERS.length}</p>
          </div>
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-shopify-text">
              ${RECENT_ORDERS.reduce((sum, order) => {
                const amount = parseFloat(order.total.replace(/[^0-9.]/g, ''));
                return sum + amount;
              }, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Paid Orders</p>
            <p className="text-2xl font-bold text-shopify-text">
              {RECENT_ORDERS.filter(o => o.status === "Paid").length}
            </p>
          </div>
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Pending Orders</p>
            <p className="text-2xl font-bold text-shopify-text">
              {RECENT_ORDERS.filter(o => o.status === "Pending").length}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
