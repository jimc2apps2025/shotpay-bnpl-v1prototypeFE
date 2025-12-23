import SalesChart from '@/components/SalesChart';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Sales', value: '$125,430', change: '+12.5%' },
    { label: 'Orders', value: '1,234', change: '+8.2%' },
    { label: 'Customers', value: '5,678', change: '+15.3%' },
    { label: 'Revenue', value: '$89,120', change: '+10.1%' },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFC] py-4 sm:py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0C0D0C] mb-4 sm:mb-8 uppercase">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#192B17]/10">
              <p className="text-[#192B17] text-xs sm:text-sm mb-2">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold text-[#0C0D0C] mb-1">{stat.value}</p>
              <p className="text-[#4C773B] text-xs sm:text-sm font-medium">{stat.change} from last month</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#192B17]/10">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#0C0D0C]">Sales Overview</h2>
            <SalesChart />
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#192B17]/10">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#0C0D0C]">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-[#192B17]/10 pb-3 last:border-0">
                  <div>
                    <p className="font-bold text-[#0C0D0C]">Order #{1000 + item}</p>
                    <p className="text-sm text-[#192B17]">2 hours ago</p>
                  </div>
                  <p className="font-bold text-[#4C773B]">$299.99</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


