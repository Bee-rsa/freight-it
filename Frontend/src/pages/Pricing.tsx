import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Pricing: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center bg-white p-8">
      <h1 className="text-4xl font-bold text-center text-custom-blue mb-8 mt-6 font-poppins">Our Pricing</h1>
      <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl">
        For cost-effective shipping and logistics solutions, start with our Essential plan. Scale up to our Premium plan as your business grows, including advanced tracking and analytics.
      </p>
      
      {/* Pricing Plans */}
      <div className="flex flex-wrap justify-between gap-8 w-full max-w-6xl mb-10">
        {/* Economy Plan */}
        <div className="flex-1 border border-gray-300 rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-custom-blue mb-4">Economy</h2>
          <p className="text-3xl font-bold text-gray-800 mb-2">ZAR 500–1,000</p>
          <p className="text-sm text-gray-500 mb-6">/month</p>
          <p className="text-sm text-gray-600 mb-2">Standard listing, basic analytics, and limited visibility.</p>
          <div className="border-b border-gray-300 w-full mb-2" />
          <ul className="text-sm text-gray-700 mb-6 space-y-2 w-full text-left leading-6">
            <li>✓ Standard listing on the platform</li>
            <li>✓ Automated quote generator</li>
            <li>✓ Freight management tools</li>
            <li>✓ Basic analytics</li>
            <li>✓ Customer support</li> 
            <li>✓ Limited to one service type option</li>
          </ul>
          <Link to="/sign-in"> {/* Wrap button with Link */}
            <button className="bg-custom-blue text-white py-2 px-4 rounded-lg w-full">Sign in to access</button>
          </Link>
        </div>
        
        {/* Premium Plan */}
        <div className="flex-1 border border-gray-300 rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-custom-blue mb-4">Premium</h2>
          <p className="text-3xl font-bold text-gray-800 mb-2">ZAR 1,500–2,500</p>
          <p className="text-sm text-gray-500 mb-6">/month</p>
          <p className="text-sm text-gray-600 mb-2">Enhanced visibility, detailed analytics, customer matching, and marketing features.</p>
          <div className="border-b border-gray-300 w-full mb-2" />
          <ul className="text-sm text-gray-700 mb-6 space-y-2 w-full text-left leading-6">
            <li>✓ Enhanced visibility in search results</li>
            <li>✓ Advanced analytics</li>
            <li>✓ Detailed analytics and performance metrics</li>
            <li>✓ Customizable shipping reports</li>
            <li>✓ Integration with tracking APIs</li>
            <li>✓ Limited to three service type options</li>
          </ul>
          <Link to="/sign-in"> {/* Wrap button with Link */}
            <button className="bg-custom-blue text-white py-2 px-4 rounded-lg w-full">Sign in to access</button>
          </Link>
        </div>
        
        {/* Enterprise Plan */}
        <div className="flex-1 border border-gray-300 rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-custom-blue mb-4">Enterprise</h2>
          <p className="text-3xl font-bold text-gray-800 mb-2">ZAR 3,000–5,000</p>
          <p className="text-sm text-gray-500 mb-6">/month</p>
          <p className="text-sm text-gray-600 mb-2">Full feature set, including real-time tracking integration, advanced analytics.</p>
          <div className="border-b border-gray-300 w-full mb-2" />
          <ul className="text-sm text-gray-700 mb-6 space-y-2 w-full text-left leading-6">
            <li>✓ Premium plan features</li>
            <li>✓ Advanced security features</li>
            <li>✓ Customer management tools</li>
            <li>✓ Bulk shipment discounts</li>
            <li>✓ Lead generation features</li>
            <li>✓ Unlimited service type options</li>
          </ul>
          <Link to="/sign-in"> {/* Wrap button with Link */}
            <button className="bg-custom-blue text-white py-2 px-4 rounded-lg w-full">Sign in to access</button>
          </Link>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="w-full max-w-7xl mt-12 text-center">
        <h3 className="text-4xl mb-6">Freight iT Offers More for the Price</h3>
 
        {/* Structuring Additional Information */}
        <div className="flex flex-wrap justify-between gap-4 w-full mt-16">
          {/* Unit 1 */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-custom-blue mb-2 font-poppins text-left">Scalable Pricing</h2>
            <p className="text-m text-gray-600 mb-2 font-poppins text-left">
              With scalable pricing, you can invite as many admins as needed to manage your shipments efficiently.
            </p>
          </div>

          {/* Unit 2 */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-custom-blue mb-2 font-poppins text-left">Management</h2>
            <p className="text-m text-gray-600 mb-2 font-poppins text-left">
              Seamless Integrations: Freight iT integrates with popular tracking APIs, payroll, and management systems to streamline your logistics.
            </p>
          </div>

          {/* Unit 3 */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-custom-blue mb-2 font-poppins text-left">Analytics Tools</h2>
            <p className="text-m text-gray-600 mb-2 font-poppins text-left">
              Advanced Features: Gain access to robust tools and analytics without additional charges. We believe in straightforward pricing with powerful capabilities.
            </p>
          </div>

          {/* Unit 4 */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-custom-blue mb-2 font-poppins text-left">Customer Support</h2>
            <p className="text-m text-gray-600 mb-2 font-poppins text-left">
              Get top-tier customer support and management tools to help grow your logistics capabilities seamlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
