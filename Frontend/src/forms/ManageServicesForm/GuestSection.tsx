import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { ServicesFormData } from "./ManageServicesForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<ServicesFormData>();

  // Watch the necessary fields for dynamic calculations
  const adultCount = watch("adultCount", 1);
  const fuelSurcharge = watch("fuelSurcharge", 0); // Start with 0 to allow 0% surcharge
  const childCount = watch("childCount", 0);
  const accessorialCharges = watch("AccessorialCharges", 1);

  // State to hold calculated total costs
  const [totalCosts, setTotalCosts] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0); // For grand total calculation
  const [showExample, setShowExample] = useState(false); // State to manage example visibility

  useEffect(() => {
    // Calculate total1 as the total number of guests
    const total1 = Number(adultCount) + Number(childCount); // Calculate total1
    const total2 = total1 + Number(accessorialCharges); // Calculate total2
    const surchargeAmount = (total2 * Number(fuelSurcharge)) / 100; // Calculate surcharge as a percentage
    const calculatedTotalCosts = total2 + surchargeAmount; // Final total costs

    // Update the totalCosts field in the form and local state
    setValue("totalCosts", calculatedTotalCosts);
    setTotalCosts(calculatedTotalCosts);

    // Example Calculation for grandTotal
    const kilometers = 189; // Distance for the example
    const cargoWeight = 2000; // Weight of the cargo in kilograms
    const costForDistance = Number(adultCount) * kilometers; // {adultCount * 189 kilometers}
    const costForWeight = Number(childCount) * cargoWeight; // {2000kg * childCount}
    const total4 = Number(costForDistance) + Number(costForWeight) + Number(accessorialCharges); // {adultCount + childCount + AccessorialCharges}
    const total5 = (total4 * Number(fuelSurcharge)) / 100; // {total4 * fuelSurcharge%}
    const calculatedGrandTotal = total4 + total5; // {total4 + total5 = grandTotal}
    setGrandTotal(calculatedGrandTotal); // Set grand total
  }, [adultCount, fuelSurcharge, childCount, accessorialCharges, setValue]);

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">Rates and Charges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg shadow-inner">
        {/* Adult Count */}
        <label className="flex flex-col text-gray-700 text-sm font-semibold">
          Base Rate
          <input
            className={`border rounded w-full py-2 px-3 font-normal transition duration-200 ease-in-out ${
              errors.adultCount ? "border-red-500" : "border-gray-300"
            }`}
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-bold mt-1">
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        {/* Fuel Surcharge as a Percentage */}
        <label className="flex flex-col">
          <span className="text-gray-800 text-sm font-semibold mb-1">Fuel Surcharge (%)</span>
          <input
            type="number"
            min={0}
            className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.fuelSurcharge ? "border-red-500" : "border-gray-300"
            }`}
            {...register("fuelSurcharge", {
              required: "This field is required",
            })}
          />
          {errors.fuelSurcharge && (
            <span className="text-red-500 mt-1">{errors.fuelSurcharge.message}</span>
          )}
        </label>

        {/* Accessorial Charges */}
        <label className="flex flex-col">
          <span className="text-gray-800 text-sm font-semibold mb-1">Accessorial Charges</span>
          <input
            type="number"
            min={1}
            className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.AccessorialCharges ? "border-red-500" : "border-gray-300"
            }`}
            {...register("AccessorialCharges", { required: "This field is required" })}
          />
          {errors.AccessorialCharges && (
            <span className="text-red-500 mt-1">{errors.AccessorialCharges.message}</span>
          )}
        </label>

        {/* Child Count */}
        <label className="flex flex-col text-gray-700 text-sm font-semibold">
          Weight Rate
          <input
            className={`border rounded w-full py-2 px-3 font-normal transition duration-200 ease-in-out ${
              errors.childCount ? "border-red-500" : "border-gray-300"
            }`}
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-bold mt-1">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>

      {/* Total Service Costs */}
      <div className="flex flex-col mt-6">
        <label className="text-gray-800 text-sm font-semibold mb-1">Total Service Costs</label>
        <div className="relative flex items-center">
          <span className="absolute left-2 top-2.2 text-gray-600 text-m">ZAR</span>
          <input
            type="text"
            value={totalCosts.toFixed(2)} // Display as fixed decimal
            readOnly
            className="border rounded w-full py-2 pl-10 pr-3 text-gray-700 bg-gray-200 cursor-not-allowed focus:outline-none"
          />
        </div>
      </div>

      {/* Example Calculation */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowExample(!showExample)}
          className="text-blue-500 hover:underline"
        >
          {showExample ? "Hide Example Calculation" : "Show Example Calculation"}
        </button>

        {showExample && (
          <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">Example Calculation</h3>
            <p className="text-gray-600">
              A customer requests transportation of cargo from the Port of Durban to Keate Street in Ladysmith, which is approximately 189 kilometers away. The total weight of the cargo is 2,000 kilograms.
            </p>
            <p className="text-gray-800 font-semibold">
              <strong>Grand Total:</strong> ZAR {grandTotal.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestsSection;
