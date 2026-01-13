"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { PRODUCTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-shopify-text">Products</h1>
            <p className="text-shopify-subdued">Manage your product inventory</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-shopify-green text-white rounded-md text-sm font-medium hover:bg-shopify-darkGreen transition-colors">
            <Plus size={16} className="mr-2" />
            Add product
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-shopify-subdued" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-shopify-border rounded-md bg-white text-sm placeholder-shopify-subdued focus:outline-none focus:ring-1 focus:ring-shopify-green focus:border-shopify-green"
              placeholder="Search products..."
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-shopify-border rounded-md bg-white text-sm font-medium text-shopify-text hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="shopify-card overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-shopify-gray">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-shopify-text mb-1">{product.name}</h3>
                    <p className="text-xs text-shopify-subdued">{product.type} • {product.vendor}</p>
                  </div>
                  <button className="p-1 text-shopify-subdued hover:bg-gray-100 rounded-md">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-lg font-bold text-shopify-text">{product.price}</p>
                    <p className="text-xs text-shopify-subdued">{product.stock}</p>
                  </div>
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    product.status === "Active" ? "bg-green-100 text-green-800" : 
                    "bg-gray-100 text-gray-800"
                  )}>
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Total Products</p>
            <p className="text-2xl font-bold text-shopify-text">{PRODUCTS.length}</p>
          </div>
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Active Products</p>
            <p className="text-2xl font-bold text-shopify-text">
              {PRODUCTS.filter(p => p.status === "Active").length}
            </p>
          </div>
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Total Stock</p>
            <p className="text-2xl font-bold text-shopify-text">
              {PRODUCTS.reduce((sum, product) => {
                const stock = parseInt(product.stock.split(' ')[0]) || 0;
                return sum + stock;
              }, 0)}
            </p>
          </div>
          <div className="shopify-card p-4">
            <p className="text-sm text-shopify-subdued mb-1">Low Stock</p>
            <p className="text-2xl font-bold text-shopify-text">
              {PRODUCTS.filter(p => {
                const stock = parseInt(p.stock.split(' ')[0]) || 0;
                return stock < 10 && stock > 0;
              }).length}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
