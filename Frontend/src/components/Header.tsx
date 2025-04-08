import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-custom-blue py-2 w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-center px-4 max-w-screen-xl mx-auto">
        {/* Text Logo (Cargo Connect) */}
        <div className="text-2xl sm:text-3xl text-white font-extrabold tracking-tight z-50 font-poppins">
          <Link to="/">Cargo Connect</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
