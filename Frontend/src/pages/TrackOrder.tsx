
import { useAppContext } from '../contexts/AppContext';

// Import any necessary assets

const TrackOrder = () => {
  useAppContext();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}

      {/* Track Order Section */}
      <main className="max-w-screen-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="orderId" className="block text-lg font-medium text-gray-700">
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              placeholder="Enter your Order ID"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email Address"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition-all duration-300"
          >
            Track Order
          </button>
        </form>
      </main>
    </div>
  );
};

export default TrackOrder;
