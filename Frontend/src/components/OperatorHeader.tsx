import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import logo from "../assets/1000140889-removebg-preview.png";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current route

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Logic to show specific links only on the operator-home page
  const isOperatorHomePage = location.pathname === "/operator-home";

  return (
    <header className="bg-custom-blue py-2 w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-4 max-w-screen-xl mx-auto">
        {/* Logo Section */}
        <div className="text-2xl sm:text-3xl text-white font-extrabold tracking-tight z-50">
          <Link to="/">
            <img src={logo} alt="Freight iT Logo" className="h-8 sm:h-10" />
          </Link>
        </div>

        {/* Hamburger Icon for Mobile View */}
        <button
          className="block sm:hidden text-white focus:outline-none z-50"
          onClick={toggleSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className="hidden sm:flex items-center">
          {isLoggedIn && isOperatorHomePage ? (
            <>
              <Link className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 flex items-center" to="/business-account">
                Business Account
              </Link>
              <Link className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 flex items-center" to="/my-services">
                My Services
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              {/* Other links when not on operator-home page */}
              <Link to="/operator-sign-in" className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 font-poppins">
                Business Account
              </Link>
              <Link to="/my-services" className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 font-poppins">
                My Services
              </Link>
              <SignOutButton />
              {/* Additional links, dropdowns, etc. */}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
