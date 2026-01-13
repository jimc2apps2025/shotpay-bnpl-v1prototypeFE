"use client";

import React from "react";
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Circle
} from "lucide-react";
import { RECENT_ORDERS, SALES_DATA, SETUP_STEPS } from "@/lib/mock-data";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from "@/lib/utils";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-shopify-text">Home</h1>
          <p className="text-shopify-subdued">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-shopify-border rounded-md bg-white text-sm font-medium text-shopify-text hover:bg-gray-50">
            <Calendar size={16} className="mr-2" />
            Last 7 days
          </button>
          <button className="px-4 py-2 bg-shopify-green text-white rounded-md text-sm font-medium hover:bg-shopify-darkGreen transition-colors">
            Create order
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Sales" 
          value="$45,280.00" 
          change="+18.5%" 
          isPositive={true} 
          icon={DollarSign}
        />
        <StatCard 
          title="Total Orders" 
          value="145" 
          change="+8.2%" 
          isPositive={true} 
          icon={ShoppingCart}
        />
        <StatCard 
          title="Total Customers" 
          value="1,240" 
          change="-2.4%" 
          isPositive={false} 
          icon={Users}
        />
        <StatCard 
          title="Conversion Rate" 
          value="4.8%" 
          change="+1.5%" 
          isPositive={true} 
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Setup Guide */}
          <div className="shopify-card overflow-hidden">
            <div className="p-6 border-b border-shopify-border">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-shopify-text">Setup Guide</h2>
                <span className="text-sm text-shopify-subdued">1 of 4 completed</span>
              </div>
              <div className="w-full bg-shopify-gray h-2 rounded-full overflow-hidden">
                <div className="bg-shopify-green h-full w-1/4 transition-all duration-500"></div>
              </div>
            </div>
            <div className="divide-y divide-shopify-border">
              {SETUP_STEPS.map((step) => (
                <div key={step.id} className="p-6 hover:bg-shopify-gray transition-colors cursor-pointer group">
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-4">
                      {step.completed ? (
                        <CheckCircle2 size={24} className="text-shopify-green" />
                      ) : (
                        <Circle size={24} className="text-shopify-subdued group-hover:text-shopify-text" />
                      )}
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-sm font-semibold",
                        step.completed ? "text-shopify-subdued line-through" : "text-shopify-text"
                      )}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-shopify-subdued mt-1">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Chart */}
          <div className="shopify-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-shopify-text">Sales Overview</h2>
                <p className="text-sm text-shopify-subdued">View sales performance over time</p>
              </div>
              <button className="p-2 text-shopify-subdued hover:bg-gray-100 rounded-md">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#008060" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#008060" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e3e5" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12, fill: '#6d7175'}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12, fill: '#6d7175'}}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #e1e3e5',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#008060" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="shopify-card overflow-hidden">
            <div className="p-6 border-b border-shopify-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-shopify-text">Recent Orders</h2>
              <button className="text-sm text-shopify-green font-medium hover:underline">
                View all orders
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-shopify-gray text-shopify-subdued text-xs uppercase tracking-wider">
                    <th className="px-6 py-3 font-semibold">Order</th>
                    <th className="px-6 py-3 font-semibold">Customer</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold">Total</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-shopify-border">
                  {RECENT_ORDERS.slice(0, 4).map((order) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar/Activity) */}
        <div className="space-y-8">
          {/* Active Store Stats */}
          <div className="shopify-card p-6">
            <h2 className="text-lg font-semibold text-shopify-text mb-4">Active store stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-shopify-subdued">Visitors right now</span>
                <span className="text-sm font-bold text-shopify-text">42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-shopify-subdued">Active carts</span>
                <span className="text-sm font-bold text-shopify-text">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-shopify-subdued">Completed checkouts</span>
                <span className="text-sm font-bold text-shopify-text">8</span>
              </div>
              <div className="pt-4 border-t border-shopify-border">
                <button className="w-full text-center text-sm font-semibold text-shopify-green hover:underline">
                  View live view
                </button>
              </div>
            </div>
          </div>

          {/* Merchant Tips */}
          <div className="shopify-card p-6">
            <h2 className="text-lg font-semibold text-shopify-text mb-4">Merchant Tips</h2>
            <div className="space-y-4">
              <TipItem 
                title="Add new products" 
                description="Get more eyes on your store by adding more products."
                buttonText="Add product"
              />
              <TipItem 
                title="Customise your store" 
                description="Make your store stand out with a custom theme."
                buttonText="Customise"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, change, isPositive, icon: Icon }: any) {
  return (
    <div className="shopify-card p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-shopify-subdued">{title}</span>
        <div className="p-2 bg-shopify-lightGreen rounded-lg">
          <Icon size={18} className="text-shopify-green" />
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <h3 className="text-2xl font-bold text-shopify-text">{value}</h3>
        <span className={cn(
          "flex items-center text-xs font-medium",
          isPositive ? "text-green-600" : "text-red-600"
        )}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
      </div>
    </div>
  );
}

function TipItem({ title, description, buttonText }: any) {
  return (
    <div className="p-4 bg-shopify-gray rounded-lg border border-shopify-border">
      <h4 className="text-sm font-semibold text-shopify-text">{title}</h4>
      <p className="text-xs text-shopify-subdued mt-1 mb-3">{description}</p>
      <button className="text-xs font-semibold text-shopify-green hover:underline">
        {buttonText}
      </button>
    </div>
  );
}
