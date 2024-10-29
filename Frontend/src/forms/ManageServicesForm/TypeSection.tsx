import { useFormContext } from "react-hook-form"; 
import { servicesTypes } from "../../config/services-options-config";
import { ServicesFormData } from "./ManageServicesForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ServicesFormData>();

  const typeWatch = watch("type");

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-10 bg-white shadow-lg rounded-lg w-full max-w-6xl mx-auto">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 text-center">Select Service Type</h2>

      {/* Service Type Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {servicesTypes.map((type, index) => (
          <label
            key={index}
            className={`flex items-center justify-center cursor-pointer rounded-lg px-4 py-3 font-semibold transition-colors border-2 ${
              typeWatch === type
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
            }`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span className="text-center">{type}</span>
          </label>
        ))}
      </div>

      {/* Error Message */}
      {errors.type && (
        <span className="text-red-500 text-sm lg:text-base font-semibold mt-4 text-center">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
