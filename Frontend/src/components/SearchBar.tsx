import { FormEvent, useState } from "react";  
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore, MdSearch } from "react-icons/md"; 
import { AiOutlineCalendar } from "react-icons/ai"; // New calendar icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date | null>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date | null>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Ensure checkIn and checkOut are valid Date objects or fallback to new Date()
    const validCheckIn = checkIn ? checkIn : new Date(); // Default to now if null
    const validCheckOut = checkOut ? checkOut : new Date(); // Default to now if null

    search.saveSearchValues(destination, validCheckIn, validCheckOut, adultCount, childCount);
    navigate("/search");
  };

  const handleClear = () => {
    setDestination("");
    setCheckIn(null);
    setCheckOut(null);
    setAdultCount(0);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  // Only render the SearchBar if the current path is the index page
  if (location.pathname !== '/user-home') {
    return null; // Don't render anything if not on the index page
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-4 bg-orange-900 rounded shadow-md border border-gray-300 flex flex-col sm:flex-row items-center gap-4"
    >
      {/* Destination Input */}
      <div className="flex items-center bg-white rounded p-2 flex-grow">
        <MdTravelExplore size={30} className="mr-2" />
        <input
          placeholder="From?"
          className="text-md w-full focus:outline-none p-2 font-sans"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      {/* Adults and Children Inputs */}
      <div className="flex flex-col sm:flex-row items-center bg-white rounded p-2 gap-2">
        <label className="flex items-center font-sans">
          <span className="mr-2">Kilometers:</span>
          <input
            className="w-16 p-2 focus:outline-none font-bold" 
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value) || 0)}
          />
        </label>
        <label className="flex items-center font-sans">
          <span className="mr-2">Kilograms:</span>
          <input
            className="w-16 p-2 focus:outline-none font-bold" 
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value) || 0)}
          />
        </label>
      </div>

      {/* Date Pickers */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex flex-col">
          <div className="flex items-center bg-white rounded h-12 p-2">
            <AiOutlineCalendar size={25} className="mr-2" />
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in"
              className="w-40 bg-white rounded focus:outline-none font-sans h-full"
            />
          </div>
        </div>
        <div className="flex flex-col sm:ml-2">
          <div className="flex items-center bg-white rounded h-12 p-2">
            <AiOutlineCalendar size={25} className="mr-2" />
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn ? checkIn : minDate} // Prevent selecting a check-out before check-in
              maxDate={maxDate}
              placeholderText="Check-out"
              className="w-40 bg-white rounded focus:outline-none font-sans h-full"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <button 
          type="submit" 
          className="bg-blue-900 text-white p-3 font-bold text-xl rounded hover:bg-blue-300 transition w-24 font-sans flex items-center justify-center h-12"
        >
          <MdSearch size={25} className="mr-2" />
        </button>
        <button 
          type="button" 
          onClick={handleClear} 
          className="bg-red-900 text-white p-3 font-bold text-xl rounded hover:bg-red-400 transition w-24 font-sans h-12"
        > 
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
