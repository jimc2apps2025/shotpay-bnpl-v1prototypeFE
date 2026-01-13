"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { PAYOUTS, PAYOUT_SUMMARY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Search, Download, Filter, DollarSign, TrendingUp, Clock, XCircle } from "lucide-react";

export default function PayoutsPage() {
  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-shopify-text">Payouts</h1>
            <p className="text-shopify-subdued">View your payout history and pending payments</p>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="shopify-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-shopify-subdued">Total Payouts</span>
              <div className="p-2 bg-shopify-lightGreen rounded-lg">
                <DollarSign size={18} className="text-shopify-green" />
              </div>
            </div>
            <p className="text-2xl font-bold text-shopify-text">{PAYOUT_SUMMARY.totalPayouts}</p>
            <p className="text-xs text-shopify-subdued mt-1">{PAYOUT_SUMMARY.totalNet} net</p>
          </div>
          <div className="shopify-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-shopify-subdued">Pending</span>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock size={18} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-shopify-text">{PAYOUT_SUMMARY.pendingAmount}</p>
            <p className="text-xs text-shopify-subdued mt-1">Awaiting processing</p>
          </div>
          <div className="shopify-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-shopify-subdued">In Transit</span>
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp size={18} className="text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-shopify-text">{PAYOUT_SUMMARY.inTransitAmount}</p>
            <p className="text-xs text-shopify-subdued mt-1">Processing</p>
          </div>
          <div className="shopify-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-shopify-subdued">Next Payout</span>
              <div className="p-2 bg-shopify-lightGreen rounded-lg">
                <DollarSign size={18} className="text-shopify-green" />
              </div>
            </div>
            <p className="text-2xl font-bold text-shopify-text">{PAYOUT_SUMMARY.nextPayoutAmount}</p>
            <p className="text-xs text-shopify-subdued mt-1">{PAYOUT_SUMMARY.nextPayoutDate}</p>
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
              placeholder="Search payouts..."
            />
          </div>
        </div>

        {/* Payouts Table */}
        <div className="shopify-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-shopify-gray text-shopify-subdued text-xs uppercase tracking-wider">
                  <th className="px-6 py-3 font-semibold">Payout ID</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                  <th className="px-6 py-3 font-semibold">Fees</th>
                  <th className="px-6 py-3 font-semibold">Net Amount</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Destination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-shopify-border">
                {PAYOUTS.map((payout) => (
                  <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-shopify-text">{payout.id}</td>
                    <td className="px-6 py-4 text-sm text-shopify-subdued">{payout.date}</td>
                    <td className="px-6 py-4 text-sm text-shopify-text font-medium">{payout.amount}</td>
                    <td className="px-6 py-4 text-sm text-shopify-subdued">{payout.fees}</td>
                    <td className="px-6 py-4 text-sm text-shopify-text font-semibold">{payout.net}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        payout.status === "Paid" ? "bg-green-100 text-green-800" : 
                        payout.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                        payout.status === "In Transit" ? "bg-blue-100 text-blue-800" : 
                        "bg-red-100 text-red-800"
                      )}>
                        {payout.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-shopify-subdued">
                      {payout.destination} {payout.account}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-shopify-text">{PAYOUT_SUMMARY.totalAmount}</p>
          </div>
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Total Fees</p>
            <p className="text-2xl font-bold text-shopify-text">{PAYOUT_SUMMARY.totalFees}</p>
          </div>
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Net Total</p>
            <p className="text-2xl font-bold text-shopify-text">{PAYOUT_SUMMARY.totalNet}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
