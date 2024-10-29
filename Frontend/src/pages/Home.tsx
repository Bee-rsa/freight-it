import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Importing images
import image1 from '../assets/Screenshot_20241012_144049_Chrome.jpg';
import image2 from '../assets/Screenshot_20241012_144052_Chrome.jpg';
import image3 from '../assets/Screenshot_20241012_145904_Chrome.jpg';

// Importing step images
import step1Image from '../assets/Freight iT_20240926_155145_0001.png';
import step2Image from '../assets/Freight iT_20240926_154924_0001.png';
import step3Image from '../assets/Freight iT_20240926_154659_0001.png';

const Home: React.FC = () => {
  // State for FAQ section
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Sample data for blog posts with images
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Freight: Trends to Watch',
      description: 'Discover the latest trends shaping the future of freight logistics and how they can impact your business.',
      link: '/blog/future-of-freight',
      image: image1,
    },
    {
      id: 2,
      title: 'How to Choose the Right Carrier',
      description: 'Learn how to select the best carrier for your shipping needs and optimize your logistics strategy.',
      link: '/blog/choose-the-right-carrier',
      image: image2,
    },
    {
      id: 3,
      title: 'The Importance of Real-Time Tracking',
      description: 'Explore the benefits of real-time tracking in freight shipping and how it enhances customer satisfaction.',
      link: '/blog/importance-of-real-time-tracking',
      image: image3,
    },
  ];

  return (
    <div className="w-full p-6">
      {/* How to Transport Section */}
      <section className="bg-white p-6 mb-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-left custom-font font-poppins">
          How To Transport Your Cargo With Freight iT
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Step 1 */}
          <div className="flex flex-col items-left p-6 border rounded-lg bg-gray-50 mx-2 w-full md:w-1/3 h-auto">
            <img src={step1Image} alt="Step 1" className="w-full h-60 object-cover mb-4" />
            <h3 className="font-semibold text-xl text-custom-blue font-poppins">Step 1: Register</h3>
            <p className="text-left mb-4 font-poppins">Create an account with Freight iT by providing your email and creating a secure password. This account will allow you to manage your shipments efficiently and access all features of our platform.</p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-left p-6 border rounded-lg bg-gray-50 mx-2 w-full md:w-1/3 h-auto">
            <img src={step2Image} alt="Step 2" className="w-full h-60 object-cover mb-4" />
            <h3 className="font-semibold text-xl text-custom-blue font-poppins">Step 2: Get Instant Quotes</h3>
            <p className="text-left mb-4 font-poppins">Once registered, input your shipping details, including the dimensions and weight of your cargo. Our system will provide you with instant quotes from various carriers, ensuring you find the best price and service for your needs.</p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-left p-6 border rounded-lg bg-gray-50 mx-2 w-full md:w-1/3 h-auto">
            <img src={step3Image} alt="Step 3" className="w-full h-60 object-cover mb-4" />
            <h3 className="font-semibold text-xl text-custom-blue font-poppins">Step 3: Book & Track</h3>
            <p className="text-left mb-4 font-poppins">After selecting your preferred carrier based on the quotes, proceed to book your shipment. Make the payment securely and then track your shipment in real-time through our platform until it arrives at its destination.</p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <h2 className="text-3xl font-bold mb-6 text-center font-poppins">Latest News & Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 font-poppins">{post.title}</h3>
            <p className="text-gray-700 mb-4 flex-grow font-poppins">{post.description}</p>
            <Link to={post.link} className="text-custom-sage font-semibold hover:underline font-poppins mt-auto">
              Read More
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <section className="p-6 mt-8 w-full">
        <h2 className="text-3xl font-bold text-black-900 mb-4 text-left font-poppins">Frequently Asked Questions</h2>
        {[{ question: 'What is Freight iT?', answer: 'Freight iT is a platform designed to simplify your logistics needs by providing easy access to multiple carriers, instant quotes, and real-time shipment tracking.' },
          { question: 'How will Freight iT help my business?', answer: 'Freight iT helps streamline your shipping process by allowing you to compare rates, manage shipments, and track deliveries all in one place, making logistics hassle-free for your business.' },
          { question: 'How do I register and sign up?', answer: 'To sign up, click on "Sign In" in the top right corner and select "Register." Complete the required fields and create your account to start using Freight iT.' },
          { question: 'I forgot my password. What should I do?', answer: 'If you forgot your password, go to the "Sign In" page and click on "Forgot Password." Follow the instructions to reset it.' },
          { question: 'How do I update my profile information?', answer: 'To update your profile, sign in and go to "My Account." From there, you can update your contact details, preferences, and other account information.' },
          { question: 'How can I access my booking history?', answer: 'After signing in, go to "My Bookings" to view your past shipments, track current ones, and see details for each booking.' },
          { question: 'Can I manage multiple users under one account?', answer: 'Yes, Freight iT offers options for businesses to manage multiple users under one account. Please contact our support team for assistance in setting this up.' },
        ].map((faq, index) => (
          <div key={index} className="mb-4 pb-2">
            <h3
              className="font-poppins text-l text-black-800 cursor-pointer flex justify-between items-center py-2 hover:bg-gray-200 transition duration-200"
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
            {activeFAQ === index && <p className="text-gray-700 mt-2 font-poppins">{faq.answer}</p>}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
