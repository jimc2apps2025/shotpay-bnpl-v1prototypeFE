'use client';

interface BNPLOptionsProps {
  total: number;
  selectedPlan: string | null;
  onSelectPlan: (plan: string) => void;
}

// Helper function to format date
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

// Helper function to get payment dates
const getPaymentDates = (installments: number): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  
  // First payment is today
  dates.push(today);
  
  // Subsequent payments are bi-weekly (every 14 days)
  for (let i = 1; i < installments; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + (i * 14)); // Bi-weekly = 14 days
    dates.push(nextDate);
  }
  
  return dates;
};

export default function BNPLOptions({ total, selectedPlan, onSelectPlan }: BNPLOptionsProps) {
  const plans = [
    {
      id: 'pay4',
      name: 'Pay in 4',
      description: '4 interest-free payments over 6 weeks',
      installments: 4,
      weeks: 6,
      installmentAmount: total / 4,
    },
    {
      id: 'pay6',
      name: 'Pay in 6',
      description: '6 interest-free payments over 12 weeks',
      installments: 6,
      weeks: 12,
      installmentAmount: total / 6,
    },
  ];

  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm text-gray-600 mb-3">Choose your payment plan:</p>
      
      {plans.map((plan) => {
        const paymentDates = selectedPlan === plan.id ? getPaymentDates(plan.installments) : [];
        
        return (
          <div
            key={plan.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectPlan(plan.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id ? 'border-green-600' : 'border-gray-300'
                  }`}>
                    {selectedPlan === plan.id && (
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    No Interest
                  </span>
                </div>
                <p className="text-sm text-gray-600 ml-6">{plan.description}</p>
                
                {selectedPlan === plan.id && paymentDates.length > 0 && (
                  <div className="mt-3 ml-6 p-4 bg-white rounded-lg border-2 border-green-300 shadow-sm">
                    <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      Payment Schedule
                    </p>
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center text-sm pb-2 border-b border-gray-100">
                        <div>
                          <span className="text-gray-700 font-medium">{formatDate(paymentDates[0])}</span>
                          <span className="text-xs text-gray-500 block">Down Payment (Today)</span>
                        </div>
                        <span className="font-bold text-gray-900 text-base">
                          ${plan.installmentAmount.toFixed(2)}
                        </span>
                      </div>
                      {paymentDates.slice(1).map((date, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="text-gray-700 font-medium">{formatDate(date)}</span>
                            <span className="text-xs text-gray-500 block">Auto-pay (bi-weekly)</span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            ${plan.installmentAmount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="pt-3 mt-3 border-t-2 border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">Total Amount</span>
                          <span className="text-base font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            
              {!selectedPlan && (
                <div className="text-right ml-4">
                  <p className="text-sm font-semibold text-gray-900">
                    ${plan.installmentAmount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">per payment</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-xs text-blue-800">
            <p className="font-semibold mb-1">How it works:</p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>Make your first payment today</li>
              <li>Remaining payments are automatic every 2 weeks</li>
              <li>No interest, no fees</li>
              <li>Manage payments anytime in your account</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

