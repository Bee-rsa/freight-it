import { useLocation } from "react-router-dom"; // Import useLocation 
import Footer from "../components/Footer";
import Header from "../components/Header";
import OperatorHeader from "../components/OperatorHeader"; // Import OperatorHeader
import Hero from "../components/Hero";
import TruckingHero from "../components/TruckingHero"; // Import TruckingHero
import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
  header?: React.ReactNode; // Added prop for custom header
}

const Layout = ({ children, header }: Props) => {
  const location = useLocation(); // Get the current location

  return (
    <div className="flex flex-col min-h-screen">
      {/* Render OperatorHeader only on the OperatorHome page */}
      {location.pathname === "/operator-home" ? <OperatorHeader /> : header || <Header />}

      {/* Conditionally render the Hero component only on the homepage ("/") and not on OperatorHome */}
      {location.pathname === "/" && (
        <div className="w-full"> {/* Ensure full width */}
          <Hero />
        </div>
      )}
      
      {/* Conditionally render the TruckingHero component only on the Trucking page */}
      {location.pathname === "/trucking" && ( // Adjust the path as needed
        <div className="w-full"> {/* Ensure full width */}
          <TruckingHero />
        </div>
      )}
      
      {/* Use full-width div for SearchBar with padding for responsiveness */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </div>
      
      {/* Full-width content area with padding */}
      <div className="w-full py-10 flex-1 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      {location.pathname !== "/register" &&
       location.pathname !== "/operator-register" &&
       location.pathname !== "/sign-in" && 
       location.pathname !== "/operator-home" && // Exclude Sign In page
       <Footer />}
    </div>
  );
};

export default Layout;
