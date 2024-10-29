// Subscriptions.tsx
import React from 'react';

const subscriptionPlans = [
  {
    label: "Economy Plan",
    price: "ZAR 500–1,000 per month",
    description: "Standard listing, basic analytics, and limited visibility.",
    benefits: [
      "Standard listing on the platform",
      "Access to basic analytics",
      "Limited visibility to customers", 
      "Limited to one service type options"
    ],
  },
  {
    label: "Premium Plan",
    price: "ZAR 1,500–2,500 per month",
    description: "Enhanced visibility, detailed analytics, customer matching, and marketing features.",
    benefits: [
      "Enhanced visibility in search results",
      "Detailed analytics and performance metrics",
      "Customer matching features",
      "Marketing support",
      "Limited to three service type options"
    ],
  },
  {
    label: "Enterprise Plan",
    price: "ZAR 3,000–5,000 per month",
    description: "Full feature set, including real-time tracking integration, advanced analytics, customer management, and lead generation.",
    benefits: [
      "Full feature set access",
      "Real-time tracking integration",
      "Advanced analytics and reporting",
      "Customer management tools",
      "Lead generation features",
      "Unlimited service type options"
    ],
  },
];

// Define the props type
type SubscriptionsProps = {
  selectedPlan: string | null; // or string if you want to avoid null
  setSelectedPlan: React.Dispatch<React.SetStateAction<string | null>>;
};

const Subscriptions: React.FC<SubscriptionsProps> = ({ selectedPlan, setSelectedPlan }) => {
  return (
    <div>
      <h2 className="text-4xl font-extrabold text-left mb-6 text-gray-800 tracking-tight mt-10">Select Subscription Plan:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-lg shadow-lg border transition duration-300 ease-in-out transform hover:bg-blue-900 hover:text-white ${selectedPlan === plan.label ? 'bg-blue-900 text-white shadow-xl' : 'bg-white border-gray-300'}`} 
            onClick={() => setSelectedPlan(plan.label)}
          >
            <h3 className="font-bold text-xl">{plan.label}</h3>
            <p className="text-lg font-semibold text-white-900">{plan.price}</p> {/* Price color changed to red-900 */}
            <p className="mt-2 text-white-700">{plan.description}</p>
            <h4 className="font-semibold mt-4">Benefits:</h4>
            <ul className="list-disc list-inside ml-5">
              {plan.benefits.map((benefit, index) => (
                <li key={index} className="text-white-700">{benefit}</li>
              ))}
            </ul>
            {selectedPlan === plan.label && (
              <span className="mt-4 inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                Selected
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
