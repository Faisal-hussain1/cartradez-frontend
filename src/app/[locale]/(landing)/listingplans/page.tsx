'use client';

import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';

type Plan = {
  name: string;
  price: string;
  duration: string;
  features: string[];
  recommended?: boolean;
};

export default function ListingPlans() {
  const plans: Plan[] = [
    {
      name: 'Premium',
      price: '5,000',
      duration: '30 Days',
      recommended: true,
      features: ['Top Position', 'Featured Badge', 'Unlimited Images'],
    },
    {
      name: 'Quick',
      price: '2,500',
      duration: '15 Days',
      features: ['Fast Approval', '10 Images', 'Standard Support'],
    },
    {
      name: 'Standard',
      price: '1,000',
      duration: '7 Days',
      features: ['5 Images', 'Basic Support'],
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 py-14 px-4'>
      <div className='max-w-5xl mx-auto text-center mb-10'>
        <h1 className='text-3xl font-bold text-primary'>Listing Plans</h1>
        <p className='text-gray-500 text-sm mt-2'>
          Select a plan to boost your car visibility
        </p>
      </div>

      <div className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition hover:shadow-lg
              ${plan.recommended ? 'border border-primary' : 'border border-gray-100'}`}
          >
            {/* Plan Header */}
            <div>
              <div className='flex justify-between items-center mb-3'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  {plan.name}
                </h2>
                {plan.recommended && (
                  <span className='text-xs bg-primary text-white px-2 py-1 rounded-full'>
                    Recommended
                  </span>
                )}
              </div>

              <p className='text-2xl font-bold text-primary mb-1'>
                US {plan.price}
              </p>
              <p className='text-xs text-gray-500 mb-4'>{plan.duration}</p>

              <ul className='space-y-2 text-sm text-gray-600 mb-6'>
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <PrimaryButton
              buttonText='Pay Now'
              onClick={() => alert(`${plan.name} selected`)}
              styles='w-full'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
