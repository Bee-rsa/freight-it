import Layout from "../layouts/Layout"; // Adjust path as needed

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col w-full h-screen bg-yellow-200 justify-center items-center font-poppins">

        {/* Centered Content Section */}
        <div className="flex flex-col md:flex-row w-full justify-center items-center mt-8 px-4">
          <div className="flex flex-col items-center text-center md:text-left md:w-3/5">
            <h1 className="text-4xl sm:text-5xl font-bold text-custom-blue">
              Seamless Shipping Simplified
            </h1>
            
            {/* Loading Spinner on the Right */}
            <div className="flex justify-center items-center mt-8 md:mt-0 md:ml-8">
              <div className="loader"></div>
            </div>

            <p className="mt-4 text-lg sm:text-xl text-yellow-900">
              Cargo Connect app coming soon in 2025. Follow our socials to stay up to date with the latest updates.
            </p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-8 mb-8 flex-wrap">
          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" 
              alt="LinkedIn" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=32292&format=png&color=FFFFFF" 
              alt="Instagram" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=118467&format=png&color=FFFFFF" 
              alt="Facebook" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
          <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=37326&format=png&color=FFFFFF" 
              alt="YouTube" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
        </div>

        {/* Copyright and Trademark Notice */}
        <p className="text-sm text-custom-blue mt-4 text-center font-poppins">
          © {new Date().getFullYear()} Cargo Connect ™. All rights reserved.
        </p>

      </div>

      {/* Inline styles for loader */}
      <style>{`
        .loader {
          border: 12px solid #f3f3f3; /* Light gray */
          border-top: 12px solid #1E10AF; /* Custom Blue */
          border-radius: 50%;
          width: 120px; /* Increased size */
          height: 120px; /* Increased size */
          animation: spin 1.5s linear infinite; /* Continuous spinning animation */
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Layout>
  );
};

export default Home;
