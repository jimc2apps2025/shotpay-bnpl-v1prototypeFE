'use client';

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface SalesData {
  month: string;
  sales: number;
  orders: number;
  revenue: number;
}

interface SalesChartProps {
  data?: SalesData[];
}

// Sample sales data for the last 12 months
const defaultData: SalesData[] = [
  { month: 'Jan', sales: 8500, orders: 120, revenue: 10200 },
  { month: 'Feb', sales: 9200, orders: 135, revenue: 11040 },
  { month: 'Mar', sales: 8800, orders: 128, revenue: 10560 },
  { month: 'Apr', sales: 10100, orders: 145, revenue: 12120 },
  { month: 'May', sales: 11200, orders: 162, revenue: 13440 },
  { month: 'Jun', sales: 10800, orders: 158, revenue: 12960 },
  { month: 'Jul', sales: 12500, orders: 180, revenue: 15000 },
  { month: 'Aug', sales: 13200, orders: 190, revenue: 15840 },
  { month: 'Sep', sales: 11800, orders: 170, revenue: 14160 },
  { month: 'Oct', sales: 14200, orders: 205, revenue: 17040 },
  { month: 'Nov', sales: 15100, orders: 218, revenue: 18120 },
  { month: 'Dec', sales: 16800, orders: 242, revenue: 20160 },
];

const formatCurrency = (value: number) => {
  return `$${(value / 1000).toFixed(1)}k`;
};

const formatNumber = (value: number) => {
  return value.toString();
};

export default function SalesChart({ data = defaultData }: SalesChartProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={formatCurrency}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number | undefined, name: string | undefined) => {
              if (value === undefined) {
                return ['N/A', name || 'Unknown'];
              }
              const nameStr = name || '';
              if (nameStr === 'sales' || nameStr === 'revenue') {
                return [`$${value.toLocaleString()}`, nameStr === 'sales' ? 'Sales' : 'Revenue'];
              }
              return [value, 'Orders'];
            }}
            labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => {
              const labels: { [key: string]: string } = {
                sales: 'Sales',
                revenue: 'Revenue',
                orders: 'Orders',
              };
              return labels[value] || value;
            }}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSales)"
            name="sales"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            name="revenue"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ fill: '#f59e0b', r: 4 }}
            activeDot={{ r: 6 }}
            name="orders"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

