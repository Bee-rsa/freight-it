import { Link } from "react-router-dom";
import { ServicesType } from "../../../Backend/src/shared/types";

type Props = {
  services: ServicesType;
};

const SearchResultsCard = ({ services }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-300 rounded-lg p-4 lg:p-8 gap-4 lg:gap-8">
      {/* Image - fixed height and full width */}
      <div className="w-full h-[150px] lg:h-[150px] overflow-hidden">
        <img
          src={services.imageUrls[0]}
          className="w-full h-full object-cover object-center"
          alt={services.businessName}
          style={{ width: '100%', height: 'auto' }} // Ensure the image width fits correctly
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col justify-between">
        {/* Business Name and Star Rating */}
        <div>
          <div className="flex items-center mb-2">
            <span className="ml-2 text-sm text-gray-500">{services.type}</span>
          </div>
          <Link
            to={`/detail/${services._id}`}
            className="text-2xl font-bold text-blue-700 hover:underline cursor-pointer"
          >
            {services.businessName}
          </Link>
        </div>

        {/* Facilities */}
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">Facilities:</h4>
          <div className="flex gap-2">
            {services.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="bg-slate-300 px-2 py-1 rounded-lg font-bold text-xs text-gray-700"
              >
                {facility}
              </span>
            ))}
            {services.facilities.length > 3 && (
              <span className="text-sm text-gray-500">
                +{services.facilities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Description:</h3>
          <p className="line-clamp-3 text-sm lg:text-base text-gray-600">
            {services.description}
          </p>
        </div>

        {/* Price and Call to Action */}
        <div className="flex justify-between items-center mt-4">
          {/* Price per night on the left with increased font size */}
          <span className="font-bold text-xl text-gray-800">
            R{services.totalCosts} <span className="text-xl font-normal">Total Cost</span>
          </span>

          {/* Call to Action button on the right */}
          <Link
            to={`/detail/${services._id}`}
            className="inline-block bg-blue-600 text-white mt-2 py-2 px-4 font-bold text-lg hover:bg-blue-500 rounded shadow-lg transition duration-200"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
