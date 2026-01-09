'use client';

interface SubscriptionOptionsProps {
  total: number;
  selectedPlan: string | null;
  onSelectPlan: (plan: string) => void;
}

export default function SubscriptionOptions({ total, selectedPlan, onSelectPlan }: SubscriptionOptionsProps) {
  const plans = [
    {
      id: 'onetime',
      name: 'One-Time Payment',
      description: 'Single payment, no recurring charges',
      frequency: 'One-Time',
      price: total,
    },
    {
      id: 'monthly',
      name: 'Monthly Subscription',
      description: 'Recurring monthly delivery',
      frequency: 'Monthly',
      price: total,
    },
    {
      id: 'biweekly',
      name: 'Bi-Weekly Subscription',
      description: 'Recurring delivery every 2 weeks',
      frequency: 'Bi-Weekly',
      price: total,
    },
  ];

  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm text-gray-600 mb-3">Choose your subscription plan:</p>
      
      {plans.map((plan) => (
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
                {plan.id !== 'onetime' && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    Auto-Renew
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 ml-6">{plan.description}</p>
              
              {selectedPlan === plan.id && (
                <div className="mt-3 ml-6 p-4 bg-white rounded-lg border-2 border-green-300 shadow-sm">
                  <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    {plan.id === 'onetime' ? 'Payment Details' : 'Subscription Details'}
                  </p>
                  <div className="space-y-2.5">
                    {plan.id === 'onetime' ? (
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <span className="text-gray-700 font-medium">One-Time Payment</span>
                          <span className="text-xs text-gray-500 block">Single payment, no recurring charges</span>
                        </div>
                        <span className="font-bold text-gray-900 text-base">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center text-sm pb-2 border-b border-gray-100">
                          <div>
                            <span className="text-gray-700 font-medium">First Delivery</span>
                            <span className="text-xs text-gray-500 block">Immediate shipment</span>
                          </div>
                          <span className="font-bold text-gray-900 text-base">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="text-gray-700 font-medium">Recurring Payment</span>
                            <span className="text-xs text-gray-500 block">
                              {plan.frequency === 'Monthly' ? 'Every month' : 'Every 2 weeks'}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                        <div className="pt-3 mt-3 border-t-2 border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-700">Per Delivery</span>
                            <span className="text-base font-bold text-gray-900">${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          
            {!selectedPlan && (
              <div className="text-right ml-4">
                <p className="text-sm font-semibold text-gray-900">
                  ${total.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  {plan.id === 'onetime' ? 'one-time' : 'per delivery'}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-xs text-blue-800">
            <p className="font-semibold mb-1">How subscription works:</p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>First order ships immediately</li>
              <li>Automatic recurring deliveries based on your plan</li>
              <li>Cancel or modify anytime</li>
              <li>Same great prices every delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
