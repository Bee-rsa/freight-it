import React from 'react';
import rightImage from '../assets/rb_2147680890.png';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-custom-blue p-6 pt-40">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold text-center w-full mb-8 text-white whitespace-nowrap">
        Seamless Shipping Simplified
      </h1>
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl items-center">
        {/* Left Image */}
        
        {/* Text Description */}
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center text-center mt-8 md:text-left ml-48">
        <h1 className="text-xl sm:text-5xl md:text-4xl font-poppins text-center w-full mb-8 text-custom-sage">
            For all your transport needs,<br /> Let Freight iT handle iT.
          </h1>
          <p className="text-base sm:text-xl font-poppins text-gray-100 mb-6">
            Freight iT makes shipping simple and seamless. Get instant quotes, book easily, and track shipments in real time - all in one place. Reliable carriers, competitive rates, and a smooth experience every step of the way.
          </p>
          {/* Modern Classy Buttons */}
          <div className="flex space-x-4 -ml-12 mt-0">
          <Link to="/operator-sign-in">
              <button className="bg-custom-sage text-white font-poppins font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:bg-white hover:text-custom-sage border border-custom-sage transform hover:scale-105">
                Compare Instant Quotes
              </button>
            </Link>
            <Link to="/operator-sign-in">
              <button className="bg-transparent border-2 border-custom-sage text-custom-sage font-poppins font-semibold py-3 px-8 rounded-full transition duration-300 hover:bg-custom-sage hover:text-white transform hover:scale-105">
                Business Solutions
              </button>
            </Link>
          </div>
        </div>
        
        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-start mt-0 md:mt-4 -mr-24"> {/* Adjust margin here */}
          <img
            src={rightImage}
            alt="Right Image"
            className="w-1/2 md:w-[100%] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
