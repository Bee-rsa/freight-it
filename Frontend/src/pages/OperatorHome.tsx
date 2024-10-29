import { useState } from 'react';
import step1Image from '../assets/Freight iT_20240926_155145_0001.png';
import step2Image from '../assets/Freight iT_20240926_154924_0001.png';
import step3Image from '../assets/Freight iT_20240926_154659_0001.png';
import aboutImage from '../assets/Freight iT_20240926_154459_0000.png'; // About section image
import newsletterImage from '../assets/1000128161-removebg-preview.png'; // Newsletter image

const OperatorHome = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-4">
      {/* How to Transport Section */}
      <section className="bg-white p-6 mb-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-left custom-font">
          How To Transport your Cargo With Freight iT
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Step 1 */}
          <div className="flex flex-col items-left p-6 border rounded-lg bg-gray-50 mx-2 w-full md:w-1/3 h-auto">
            <img src={step1Image} alt="Step 1" className="w-full h-60 object-cover mb-4" />
            <h3 className="font-semibold text-xl text-blue-900">Step 1: Register</h3>
            <p className="text-left mb-4">Create an account with Freight iT by providing your email and creating a secure password. This account will allow you to manage your shipments efficiently and access all features of our platform.</p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-left p-6 border rounded-lg bg-gray-50 mx-2 w-full md:w-1/3 h-auto">
            <img src={step2Image} alt="Step 2" className="w-full h-60 object-cover mb-4" />
            <h3 className="font-semibold text-xl text-blue-900">Step 2: Get Instant Quotes</h3>
            <p className="text-left mb-4">Once registered, input your shipping details, including the dimensions and weight of your cargo. Our system will provide you with instant quotes from various carriers, ensuring you find the best price and service for your needs.</p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-left p-6 border rounded-lg bg-gray-50 mx-2 w-full md:w-1/3 h-auto">
            <img src={step3Image} alt="Step 3" className="w-full h-60 object-cover mb-4" />
            <h3 className="font-semibold text-xl text-blue-900">Step 3: Book & Track</h3>
            <p className="text-left mb-4">After selecting your preferred carrier based on the quotes, proceed to book your shipment. Make the payment securely and then track your shipment in real-time through our platform until it arrives at its destination.</p>
          </div>
        </div>
      </section>

      {/* About Freight iT Section */}
      <section className="bg-white p-6 mb-8 w-full flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img src={aboutImage} alt="About Freight iT" className="w-full h-80 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 md:pl-6 text-left">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">About Freight iT</h2>
          <p className="text-gray-700 mb-4">
            Freight iT is your go-to platform for booking reliable and affordable freight services. Whether you're an individual or a company, we make it easy to move your cargo from one point to another by providing you with instant quotes from multiple carriers, allowing you to compare rates and select the best option.
          </p>
          <p className="text-gray-700">
            Our goal is to simplify the logistics process, from registration to booking and real-time tracking, giving you full control over your shipping needs. With Freight iT, you're not just booking a shipment—you're ensuring that your cargo is transported with the utmost care and efficiency.
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 p-6 rounded-lg w-full mb-8 flex flex-col md:flex-row items-start">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img src={newsletterImage} alt="Newsletter" className="w-55 h-80 rounded-md" />
        </div>
        <div className="md:w-1/2 flex flex-col items-start">
          <h2 className="text-2xl font-bold text-blue-900 mb-1 text-left">Receive our newsletter</h2>
          <p className="text-gray-700 text-left mb-2">Sign up for email updates with travel recommendations and Private Deals.</p>
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-2 border border-blue-900 rounded-md mb-2 w-3/4 md:w-1/2"
            required
          />
          <button className="bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
            Subscribe
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="p-6 mb-8 w-full rounded-lg">
        <h2 className="text-3xl font-bold text-black-900 mb-4 text-left">Frequently Asked Questions</h2>

        {/* FAQ Items */}
        {[
          { question: 'How do I get a quote for my shipment?', answer: 'To get a quote, simply register an account, enter your shipment details such as the size, weight, and destination, and Freight iT will provide you with instant quotes from multiple carriers.' },
          { question: 'Can I track my shipment?', answer: 'Yes, once your shipment is booked, you can track it in real-time through our platform. You\'ll receive updates on the status of your shipment from pickup to delivery.' },
          { question: 'What payment methods are accepted?', answer: 'We accept all major credit and debit cards, as well as online payment services such as PayPal. Payments are processed securely through our platform.' },
          { question: 'What happens if my shipment is delayed?', answer: 'In case of a delay, Freight iT will notify you through the platform and provide updates on the new estimated delivery time. If there are any issues, our customer service team will be available to assist you.' }
        ].map((faq, index) => (
          <div key={index} className="mb-4 border-b border-gray-300 pb-2">
            <h3
              className="font-semibold text-xl text-black-800 cursor-pointer flex justify-between items-center py-2 hover:bg-gray-200 transition duration-200"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="ml-2 text-sm"> {/* Adjusting the size of the arrows */}
                {activeFAQ === index ? (
                  <i className="fas fa-chevron-up"></i> // Font Awesome icon for up arrow
                ) : (
                  <i className="fas fa-chevron-down"></i> // Font Awesome icon for down arrow
                )}
              </span>
            </h3>
            {activeFAQ === index && <p className="text-gray-700 mt-2">{faq.answer}</p>}
          </div>
        ))}
      </section>

      <footer className="mt-auto text-center py-4">
        <p className="text-gray-600">&copy; 2024 Freight iT. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OperatorHome;
