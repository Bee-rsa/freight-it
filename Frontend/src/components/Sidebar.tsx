import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import logo from "../assets/1000140889-removebg-preview.png"; // Adjust the path as needed

const Sidebar = () => {
  const { isLoggedIn } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar for larger screens */}
      <aside className="hidden sm:flex flex-col bg-blue-900 text-white h-screen w-64 fixed top-0 left-0 shadow-lg">
        <div className="p-4">
          <Link to="/">
            <img src={logo} alt="Freight iT Logo" className="h-12 mx-auto" />
          </Link>
        </div>
        <nav className="flex flex-col mt-6 space-y-4 px-4">
          {[
            "Dashboard Overview",
            "Orders and Bookings Management",
            "Pricing Management",
            "Fleet and Vehicle Management",
            "Employee and Driver Management",
            "Inventory and Warehouse Management",
            "Analytics and Reports",
            "Customer Management",
            "Financial Management",
            "Service Management",
            "Route and Delivery Optimization",
            "Settings and User Management",
            "Marketing and Customer Engagement",
            "Compliance and Documentation",
          ].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-lg font-medium hover:text-blue-400 transition duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>
        {isLoggedIn && <SignOutButton />}
      </aside>

      {/* Mobile Sidebar */}
      <header className="sm:hidden bg-blue-900 py-2 fixed top-0 left-0 w-full flex justify-between items-center z-50 px-4">
        <Link to="/">
          <img src={logo} alt="Freight iT Logo" className="h-10" />
        </Link>
        <button onClick={toggleSidebar} className="text-white">
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
      </header>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-95 z-40 sm:hidden flex flex-col items-center p-4 space-y-4">
          <button
            onClick={toggleSidebar}
            className="self-end text-white mb-4"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          {[
            "Dashboard Overview",
            "Orders and Bookings Management",
            "Pricing Management",
            "Fleet and Vehicle Management",
            "Employee and Driver Management",
            "Inventory and Warehouse Management",
            "Analytics and Reports",
            "Customer Management",
            "Financial Management",
            "Service Management",
            "Route and Delivery Optimization",
            "Settings and User Management",
            "Marketing and Customer Engagement",
            "Compliance and Documentation",
          ].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-lg font-medium text-white hover:text-blue-400 transition duration-300"
              onClick={toggleSidebar}
            >
              {item}
            </Link>
          ))}
          {isLoggedIn && <SignOutButton />}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
