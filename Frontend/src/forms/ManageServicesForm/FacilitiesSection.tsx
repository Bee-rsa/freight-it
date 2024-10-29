import { useFormContext } from "react-hook-form"; 
import { servicesFacilities } from "../../config/services-options-config";
import { ServicesFormData } from "./ManageServicesForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ServicesFormData>();

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-extrabold text-left mb-6 text-gray-800 tracking-tight">Type Of Company Trucks:</h2>

      {/* Facilities Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {servicesFacilities.map((facility, index) => (
          <label
            key={index}
            className={`flex items-center gap-3 text-sm lg:text-base text-gray-800 cursor-pointer rounded-lg p-3 border transition duration-150 ease-in-out
              ${errors.facilities ? 'border-red-500' : 'border-gray-300 hover:bg-blue-100'} 
              ${errors.facilities && 'bg-red-50'}`}
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) =>
                  facilities && facilities.length > 0
                    ? true
                    : "At least one facility is required",
              })}
              className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="font-medium">{facility}</span>
          </label>
        ))}
      </div>

      {/* Error Message */}
      {errors.facilities && (
        <span className="text-red-500 text-sm lg:text-base font-semibold mt-4 text-center">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
