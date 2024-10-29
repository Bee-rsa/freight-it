import { useState } from 'react';

const UserHome = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav className="space-y-4">
          <a href="#user-stats" className="block text-lg hover:bg-blue-700 p-2 rounded">User Statistics</a>
          <a href="#recent-bookings" className="block text-lg hover:bg-blue-700 p-2 rounded">Recent Bookings</a>
          <a href="#manage-shipments" className="block text-lg hover:bg-blue-700 p-2 rounded">Manage Shipments</a>
          <a href="#faq-management" className="block text-lg hover:bg-blue-700 p-2 rounded">FAQ Management</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Admin Dashboard</h1>

        {/* User Statistics Section */}
        <section id="user-stats" className="bg-white p-6 mb-8 w-full rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Statistics</h2>
          <div className="flex justify-around text-center">
            <div className="p-4 bg-blue-50 rounded-lg shadow-md w-1/4">
              <h3 className="text-xl font-bold text-blue-900">Total Users</h3>
              <p className="text-2xl text-gray-700">1,234</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg shadow-md w-1/4">
              <h3 className="text-xl font-bold text-blue-900">Active Bookings</h3>
              <p className="text-2xl text-gray-700">567</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg shadow-md w-1/4">
              <h3 className="text-xl font-bold text-blue-900">Pending Shipments</h3>
              <p className="text-2xl text-gray-700">89</p>
            </div>
          </div>
        </section>

        {/* Recent Bookings Section */}
        <section id="recent-bookings" className="bg-white p-6 mb-8 w-full rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {['#12345', '#12346', '#12347'].map((booking, index) => (
              <div key={index} className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                <span className="font-semibold text-gray-800">Booking ID: {booking}</span>
                <span className="text-gray-600">Status: In Transit</span>
              </div>
            ))}
          </div>
        </section>

        {/* Manage Shipments Section */}
        <section id="manage-shipments" className="bg-white p-6 mb-8 w-full rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Manage Shipments</h2>
          <div className="flex justify-around">
            <div className="p-4 bg-green-50 rounded-lg shadow-md w-1/3">
              <h3 className="text-xl font-bold text-green-900">Active Shipments</h3>
              <p className="text-2xl text-gray-700">125</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg shadow-md w-1/3">
              <h3 className="text-xl font-bold text-red-900">Delayed Shipments</h3>
              <p className="text-2xl text-gray-700">10</p>
            </div>
          </div>
        </section>

        {/* FAQ Management Section */}
        <section id="faq-management" className="bg-white p-6 mb-8 w-full rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">FAQ Management</h2>
          {[
            { question: 'How do I get a quote for my shipment?', answer: 'To get a quote, simply register an account, enter your shipment details...' },
            { question: 'Can I track my shipment?', answer: 'Yes, once your shipment is booked, you can track it in real-time through our platform...' },
          ].map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-300 pb-2">
              <h3
                className="font-semibold text-xl text-black-800 cursor-pointer flex justify-between items-center py-2 hover:bg-gray-200 transition duration-200"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="ml-2 text-sm">
                  {activeFAQ === index ? (
                    <i className="fas fa-chevron-up"></i>
                  ) : (
                    <i className="fas fa-chevron-down"></i>
                  )}
                </span>
              </h3>
              {activeFAQ === index && <p className="text-gray-700 mt-2">{faq.answer}</p>}
            </div>
          ))}
        </section>

        <footer className="mt-auto text-center py-4">
          <p className="text-gray-600">&copy; 2024 Freight iT Admin Dashboard. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default UserHome;
