import { useQuery } from "react-query"; 
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { servicesId } = useParams();

  const { data: services } = useQuery(
    "fetchServicesById",
    () => apiClient.fetchServicesById(servicesId || ""),
    {
      enabled: !!servicesId,
    }
  );

  if (!services) {
    return <></>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Business Name and Star Rating */} 
      <div className="flex items-center space-x-2">
        <span className="flex text-yellow-400">
          {Array.from({ length: services.AccessorialCharges }).map((_, index) => (
            <AiFillStar key={index} className="w-6 h-6" />
          ))}
        </span>
        <h1 className="text-4xl font-bold">{services.businessName}</h1>
      </div>

      {/* Image Gallery */}
      <div className="flex space-x-2 overflow-hidden">
        {services.imageUrls.map((image, index) => (
          <div key={index} className="h-[300px] w-[200px] border border-gray-500 rounded-lg">
            <img
              src={image}
              alt={services.businessName}
              className="rounded-lg w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Facilities Section */}z
      <div className="flex justify-between space-x-4">
        {services.facilities.map((facility, index) => (
          <div
            key={index}
            className="border border-gray-500 rounded-lg p-4 text-center text-sm shadow-md hover:shadow-lg transition-shadow duration-200 w-full flex-grow"
          >
            {facility}
          </div>
        ))}
      </div>

      {/* Description and Guest Info Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 border border-gray-500 rounded-lg shadow-md whitespace-pre-line">
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{services.description}</p>
        </div>
        <div className="h-fit border border-gray-500 rounded-lg">
          <GuestInfoForm
            totalCosts={services.totalCosts}
            servicesId={services._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
