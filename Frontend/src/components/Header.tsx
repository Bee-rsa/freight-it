import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
// Import the image from assets
import logo from "../assets/1000140889-removebg-preview.png"; // Adjust the path according to your project structure

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isBusinessHubDropdownOpen, setIsBusinessHubDropdownOpen] = useState(false);

  // Ref to detect clicks outside of dropdowns
  const dropdownRefs = {
    main: useRef<HTMLDivElement | null>(null),
    resources: useRef<HTMLDivElement | null>(null),
    businessHub: useRef<HTMLDivElement | null>(null),
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
    closeOtherDropdowns("main");
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesDropdownOpen(prev => !prev);
    closeOtherDropdowns("resources");
  };

  const toggleBusinessHubDropdown = () => {
    setIsBusinessHubDropdownOpen(prev => !prev);
    closeOtherDropdowns("businessHub");
  };

  const closeOtherDropdowns = (dropdown: "main" | "resources" | "businessHub") => {
    if (dropdown !== "main") setIsDropdownOpen(false);
    if (dropdown !== "resources") setIsResourcesDropdownOpen(false);
    if (dropdown !== "businessHub") setIsBusinessHubDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefs.main.current && !dropdownRefs.main.current.contains(event.target as Node) &&
        dropdownRefs.resources.current && !dropdownRefs.resources.current.contains(event.target as Node) &&
        dropdownRefs.businessHub.current && !dropdownRefs.businessHub.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsResourcesDropdownOpen(false);
        setIsBusinessHubDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <header className="bg-custom-blue py-2 w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-4 max-w-screen-xl mx-auto">
        {/* Logo Section (Always visible) */}
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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            )}
          </svg>
        </button>

        {/* Navigation Links (hidden on mobile) */}
        <nav className="hidden sm:flex items-center">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-6">
                <Link
                  className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 flex items-center font-poppins"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
                <Link
                  className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 flex items-center font-poppins"
                  to="/my-services"
                >
                  My Services
                </Link>
                <Link
                  className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 flex items-center font-poppins"
                  to="/track-parcel"
                >
                  Track Parcel
                </Link>
                <Link
                  className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 flex items-center font-poppins"
                  to="/track-parcel"
                >
                  
                </Link>
              </div>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                to="/operator-sign-in" // Always visible Operator link
                className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 flex items-center font-poppins"
              >
                Products
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 10l6 6 6-6"
                  ></path>
                </svg>
              </Link>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 flex items-center"
                    onClick={toggleBusinessHubDropdown}
                  >
                    Business Hub
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M6 10l6 6 6-6"
                      ></path>
                    </svg>
                  </button>
                </div>
                {isBusinessHubDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                    <Link
                        to="/sign-in"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Login in
                      </Link>
                      <Link
                        to="/trucking"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Trucking
                      </Link>
                      <Link
                        to="/courier-services"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Courier Services
                      </Link>
                      <Link
                        to="/ocean-freight"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Ocean Freight
                      </Link>
                      <Link
                        to="/air-freight"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Air Freight
                      </Link>
                      <Link
                        to="/rail-freight"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Rail Freight
                      </Link>
                      <Link
                        to="/warehousing"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Warehousing
                      </Link>
                      <Link
                        to="/operations"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Operations
                      </Link>
                      <Link
                        to="/freight-forwarders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Freight Forwarders
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 flex items-center"
                    onClick={toggleResourcesDropdown}
                  >
                    Resources
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M6 10l6 6 6-6"
                      ></path>
                    </svg>
                  </button>
                </div>
                {isResourcesDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                      <Link
                        to="/guides"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Guides
                      </Link>
                      <Link
                        to="/blog"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Blog
                      </Link>
                      <Link
                        to="/market-update"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Market Update
                      </Link>
                      <Link
                        to="/research"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Research
                      </Link>
                      <Link
                        to="/case-study"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Case Study
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 flex items-center"
                    onClick={toggleDropdown}
                  >
                    Company
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M6 10l6 6 6-6"
                      ></path>
                    </svg>
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                      <Link
                        to="/about-freight-it"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        About Us
                      </Link>
                      <Link
                        to="/policy"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        to="/terms-and-conditions"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
                      >
                        Terms & Conditions
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/pricing" // Always visible Operator link
                className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 mx-4 font-poppins"
              >
                Pricing
              </Link>
              <Link
                to="/operator-sign-in"
                className="bg-custom-sage text-white font-semibold rounded-lg px-4 py-2 text-base hover:bg-custom-sage transition duration-300 mx-4"
              >
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
