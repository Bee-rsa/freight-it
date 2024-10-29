import { useLocation } from "react-router-dom"; // Import useLocation
import Header from "../components/OperatorHeader";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode;
}

const OperatorLayout = ({ children }: Props) => {
  const location = useLocation(); // Get the current location

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Conditionally render the Hero component */}
      {location.pathname !== "/about-freight-it" && 
       location.pathname !== "/register" &&
       location.pathname !== "/operator-register" &&
       location.pathname !== "/sign-in" && 
       location.pathname !== "/operator-home" && // Exclude Sign In page
       <Hero />}
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

export default OperatorLayout;
