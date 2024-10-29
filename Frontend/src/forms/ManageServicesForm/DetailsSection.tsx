import { useFormContext } from "react-hook-form";
import { servicesTypes } from "../../config/services-options-config";
import { ServicesFormData } from "./ManageServicesForm";

const DetailsSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ServicesFormData>();

  const typeWatch = watch("type");

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800 tracking-tight">
        Please Fill Out Company Details:
      </h1>

      {/* Business Name */}
      <label className="flex flex-col">
        <span className="text-gray-800 text-sm font-semibold mb-1">Company Name</span>
        <input
          type="text"
          className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.businessName ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register("businessName", { required: "This field is required" })}
        />
        {errors.businessName && (
          <span className="text-red-500 mt-1">{errors.businessName.message}</span>
        )}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contact Person's Name */}
        <label className="flex flex-col">
          <span className="text-gray-800 text-sm font-semibold mb-1">Contact Person's Name</span>
          <input
            type="text"
            className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.contactPersonsName ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("contactPersonsName", { required: "This field is required" })}
          />
          {errors.contactPersonsName && (
            <span className="text-red-500 mt-1">{errors.contactPersonsName.message}</span>
          )}
        </label>

        
        {/* Business Email Address */}
        <label className="flex flex-col">
          <span className="text-gray-800 text-sm font-semibold mb-1">Company Email Address</span>
          <input
            type="text"
            className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.businessEmailAddress ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("businessEmailAddress", { required: "This field is required" })}
          />
          {errors.businessEmailAddress && (
            <span className="text-red-500 mt-1">{errors.businessEmailAddress.message}</span>
          )}
        </label>

        {/* Website */}
        <label className="flex flex-col">
          <span className="text-gray-800 text-sm font-semibold mb-1">Website</span>
          <input
            type="text"
            className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.website ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("website", { required: "This field is required" })}
            placeholder="www.example.com"
            onChange={(e) => {
              let value = e.target.value;
              if (!value.startsWith("www.")) {
                value = "www." + value.replace(/^www\./, '');
              }
              e.target.value = value;
            }}
          />
          {errors.website && (
            <span className="text-red-500 mt-1">{errors.website.message}</span>
          )}
        </label>

        {/* City */}
        <label className="flex flex-col">
          <span className="text-gray-800 text-sm font-semibold mb-1">City</span>
          <input
            type="text"
            className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500 mt-1">{errors.city.message}</span>
          )}
        </label>

        {/* Country */}
        <label className="flex flex-col">
          <span className="text-gray-800 text-sm font-semibold mb-1">Country</span>
          <select
            className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("country", { required: "This field is required" })}
          >
            <option value="" disabled>Select your country</option>
            <option value="South Africa">South Africa</option>
            {/* Add more countries as needed */}
          </select>
          {errors.country && (
            <span className="text-red-500 mt-1">{errors.country.message}</span>
          )}
        </label>
      </div>

      {/* Business Description */}
      <label className="flex flex-col">
        <span className="text-gray-800 text-sm font-semibold mb-1">Business Description</span>
        <textarea
          rows={5}
          className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 mt-1">{errors.description.message}</span>
        )}
      </label>

      {/* Service Type Selection */}
      <h2 className="text-xl lg:text-2xl font-semibold text-gray-700 mb-6">
        Select Service Type
      </h2>

      {/* Service Type Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {servicesTypes.map((type, index) => (
          <label
            key={index}
            className={`flex items-center justify-center cursor-pointer rounded-lg px-4 py-3 font-semibold transition-all duration-300 ease-in-out transform border-2 ${
              typeWatch === type
                ? "bg-blue-900 text-white border-blue-900 scale-105"
                : "bg-transparent text-gray-700 border-gray-300 hover:bg-blue-100 hover:scale-105"
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
            <span className={`text-center ${typeWatch === type ? 'text-white' : 'text-gray-700'}`}>{type}</span>
          </label>
        ))}
      </div>

      {/* Error Message */}
      {errors.type && (
        <span className="text-red-500 text-sm font-medium mt-4">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default DetailsSection;
