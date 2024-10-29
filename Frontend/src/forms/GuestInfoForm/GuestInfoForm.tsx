import { useForm } from "react-hook-form"; 
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  servicesId: string;
  totalCosts: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ servicesId, totalCosts }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,   
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/services/${servicesId}/booking`);
  };

  return (
    <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg gap-6 border border-gray-300">
      {/* Price Display */}
      <h3 className="text-xl font-bold text-gray-800">R{totalCosts} Total Costs </h3>
      
      {/* Form */}
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 gap-6">
          {/* Check-in and Check-out Dates */}
          <div className="flex flex-col gap-4">
            <DatePicker
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <DatePicker
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Adult and Children Count */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Adults</label>
              <input
                className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "Please enter number of adults",
                  min: { value: 1, message: "At least 1 adult required" },
                })}
              />
              {errors.adultCount && (
                <span className="text-red-500 text-sm">
                  {errors.adultCount.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Children</label>
              <input
                className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                min={0}
                max={20}
                {...register("childCount", { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-200">
            {isLoggedIn ? "Book Now" : "Sign in to Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;




