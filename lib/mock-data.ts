import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart2, 
  Tag, 
  Store, 
  Settings, 
  HelpCircle,
  Bell,
  Search,
  User,
  Wallet
} from "lucide-react";

export const NAV_ITEMS = [
  { name: "Home", icon: Home, href: "/dashboard", disabled: false },
  { name: "Orders", icon: ShoppingCart, href: "/dashboard/orders", disabled: false },
  { name: "Products", icon: Package, href: "/dashboard/products", disabled: false },
  { name: "Customers", icon: Users, href: "/dashboard/customers", disabled: true },
  { name: "Analytics", icon: BarChart2, href: "/dashboard/analytics", disabled: true },
  { name: "Marketing", icon: Bell, href: "/dashboard/marketing", disabled: true },
  { name: "Discounts", icon: Tag, href: "/dashboard/discounts", disabled: true },
  { name: "Shotpay Finance", icon: Wallet, href: "/dashboard/finance/payouts", disabled: false },
];

export const SECONDARY_NAV_ITEMS = [
  { name: "Online Store", icon: Store, href: "/dashboard/store" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export const SALES_DATA = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 2000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
];

export const RECENT_ORDERS = [
  { id: "#1001", customer: "John Doe", total: "$520.00", status: "Paid", date: "Today", fulfillment: "Unfulfilled" },
  { id: "#1002", customer: "Jane Smith", total: "$1,285.50", status: "Pending", date: "Today", fulfillment: "Fulfilled" },
  { id: "#1003", customer: "Bob Johnson", total: "$45.00", status: "Paid", date: "Yesterday", fulfillment: "Unfulfilled" },
  { id: "#1004", customer: "Alice Brown", total: "$850.00", status: "Refunded", date: "Jan 8", fulfillment: "Restocked" },
  { id: "#1005", customer: "Charlie Wilson", total: "$120.00", status: "Paid", date: "Jan 7", fulfillment: "Fulfilled" },
  { id: "#1006", customer: "David Miller", total: "$2,100.00", status: "Paid", date: "Jan 7", fulfillment: "Unfulfilled" },
];

export const PRODUCTS = [
  { id: 1, name: "9mm Semi-Auto Handgun", price: "$499.00", stock: "15 in stock", status: "Active", type: "Handgun", vendor: "Glock", image: "/images/products/placeholder.jpg" },
  { id: 2, name: "Tactical Bolt-Action Rifle", price: "$1,250.00", stock: "8 in stock", status: "Active", type: "Rifle", vendor: "Remington", image: "/images/products/placeholder.jpg" },
  { id: 3, name: ".223 Remington Bullets (Box of 50)", price: "$45.00", stock: "120 in stock", status: "Active", type: "Ammunition", vendor: "Winchester", image: "/images/products/placeholder.jpg" },
  { id: 4, name: "Paper Shooting Target (Pack of 20)", price: "$15.00", stock: "0 in stock", status: "Draft", type: "Target", vendor: "RangeMaster", image: "/images/products/placeholder.jpg" },
  { id: 5, name: "Steel Reactive Target", price: "$85.00", stock: "22 in stock", status: "Active", type: "Target", vendor: "RangeMaster", image: "/images/products/placeholder.jpg" },
];

export const SETUP_STEPS = [
  { id: 1, title: "Add your first product", description: "Add physical products, digital files, or services you want to sell.", completed: true },
  { id: 2, title: "Customise your online store", description: "Choose a theme and add your logo, colors, and fonts.", completed: false },
  { id: 3, title: "Add a domain", description: "Your current domain is johns-store.shotpay.com.", completed: false },
  { id: 4, title: "Set up payments", description: "Choose how your customers will pay you.", completed: false },
];

// Shopify-style Payout Data
export interface Payout {
  id: string;
  date: string;
  status: "Paid" | "Pending" | "In Transit" | "Failed";
  amount: string;
  currency: string;
  fees: string;
  net: string;
  description: string;
  destination: string;
  account: string;
}

export const PAYOUTS: Payout[] = [
  {
    id: "PO-2024-001",
    date: "Jan 15, 2024",
    status: "Paid",
    amount: "$12,450.00",
    currency: "USD",
    fees: "$245.00",
    net: "$12,205.00",
    description: "Payout for sales period Jan 1-14, 2024",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-002",
    date: "Jan 8, 2024",
    status: "Paid",
    amount: "$8,920.50",
    currency: "USD",
    fees: "$178.41",
    net: "$8,742.09",
    description: "Payout for sales period Dec 25 - Jan 7, 2024",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-003",
    date: "Jan 1, 2024",
    status: "Paid",
    amount: "$15,680.25",
    currency: "USD",
    fees: "$313.61",
    net: "$15,366.64",
    description: "Payout for sales period Dec 18-31, 2023",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-004",
    date: "Dec 25, 2023",
    status: "Paid",
    amount: "$22,340.75",
    currency: "USD",
    fees: "$446.82",
    net: "$21,893.93",
    description: "Payout for sales period Dec 11-24, 2023",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-005",
    date: "Dec 18, 2023",
    status: "Paid",
    amount: "$9,125.00",
    currency: "USD",
    fees: "$182.50",
    net: "$8,942.50",
    description: "Payout for sales period Dec 4-17, 2023",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-006",
    date: "Dec 11, 2023",
    status: "Paid",
    amount: "$6,890.50",
    currency: "USD",
    fees: "$137.81",
    net: "$6,752.69",
    description: "Payout for sales period Nov 27 - Dec 10, 2023",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-007",
    date: "Dec 4, 2023",
    status: "Paid",
    amount: "$11,230.25",
    currency: "USD",
    fees: "$224.61",
    net: "$11,005.64",
    description: "Payout for sales period Nov 20 - Dec 3, 2023",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-008",
    date: "Nov 27, 2023",
    status: "Paid",
    amount: "$7,645.75",
    currency: "USD",
    fees: "$152.92",
    net: "$7,492.83",
    description: "Payout for sales period Nov 13-26, 2023",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-009",
    date: "Nov 20, 2023",
    status: "Paid",
    amount: "$13,520.00",
    currency: "USD",
    fees: "$270.40",
    net: "$13,249.60",
    description: "Payout for sales period Nov 6-19, 2023",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-010",
    date: "Nov 13, 2023",
    status: "Paid",
    amount: "$5,890.25",
    currency: "USD",
    fees: "$117.81",
    net: "$5,772.44",
    description: "Payout for sales period Oct 30 - Nov 12, 2023",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-011",
    date: "Jan 22, 2024",
    status: "Pending",
    amount: "$14,230.50",
    currency: "USD",
    fees: "$284.61",
    net: "$13,945.89",
    description: "Payout for sales period Jan 15-21, 2024",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-012",
    date: "Jan 29, 2024",
    status: "In Transit",
    amount: "$18,750.25",
    currency: "USD",
    fees: "$375.01",
    net: "$18,375.24",
    description: "Payout for sales period Jan 22-28, 2024",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-013",
    date: "Feb 5, 2024",
    status: "Pending",
    amount: "$16,420.75",
    currency: "USD",
    fees: "$328.42",
    net: "$16,092.33",
    description: "Payout for sales period Jan 29 - Feb 4, 2024",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-014",
    date: "Oct 23, 2023",
    status: "Failed",
    amount: "$3,250.00",
    currency: "USD",
    fees: "$65.00",
    net: "$3,185.00",
    description: "Payout for sales period Oct 16-22, 2023 - Failed due to account issue",
    destination: "Bank Account",
    account: "****1234"
  },
  {
    id: "PO-2024-015",
    date: "Oct 30, 2023",
    status: "Paid",
    amount: "$4,125.50",
    currency: "USD",
    fees: "$82.51",
    net: "$4,042.99",
    description: "Payout for sales period Oct 23-29, 2023",
    destination: "Bank Account",
    account: "****1234"
  },
];

// Payout Summary Statistics
export const PAYOUT_SUMMARY = {
  totalPayouts: 15,
  totalAmount: "$178,475.00",
  totalFees: "$3,569.50",
  totalNet: "$174,905.50",
  pendingAmount: "$30,650.75",
  inTransitAmount: "$18,375.24",
  failedAmount: "$3,185.00",
  nextPayoutDate: "Feb 12, 2024",
  nextPayoutAmount: "$12,450.00",
};
