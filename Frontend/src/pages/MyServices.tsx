import { useQuery } from "react-query";  
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel } from "react-icons/bi";

const MyServices = () => {
  const { data: servicesData } = useQuery(
    "fetchMyServices",
    apiClient.fetchMyServices,
    {
      onError: () => {},
    }
  );

  if (!servicesData) {
    return <span>No Services found</span>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-5">
      <span className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1
          className="text-2xl md:text-3xl font-bold text-gray-800"
          style={{ fontFamily: 'YourChosenFont, sans-serif' }} // Replace 'YourChosenFont' with your desired font
        >
          My Services
        </h1>
        <Link
          to="/add-services"
          className="mt-4 md:mt-0 bg-blue-600 text-white text-lg md:text-xl font-semibold p-3 rounded-md transition duration-300 hover:bg-blue-500"
        >
          Add Services
        </Link>
      </span>
  
      <div className="grid grid-cols-1 gap-8">
        {servicesData.map((services) => (
          <div
            key={services._id} // Ensure you add a key prop
            data-testid="services-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-6 md:p-8 gap-5 shadow-md transition-transform duration-300 hover:scale-105"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{services.businessName}</h2>
            <div className="whitespace-pre-line text-gray-600">{services.description}</div>

            {/* Change to a flex column layout for vertical listing */}
            <div className="flex flex-col space-y-4 mt-4">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {services.city}, {services.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {services.contactPersonsName}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {services.type}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {services.adultCount.toString()} Kilometers, {services.childCount.toString()} kilograms
              </div>
              
            </div>
            <span className="flex justify-end mt-4">
              <Link
                to={`/edit-services/${services._id}`}
                className="flex bg-blue-600 text-white text-lg md:text-xl font-semibold p-2 rounded-md transition duration-300 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};  

export default MyServices;

