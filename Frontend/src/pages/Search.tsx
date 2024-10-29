import { useQuery } from "react-query";   
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "./SearchResultsCard";
import Pagination from "./Pagination";
import StarRatingFilter from "./StarRatingFilter";
import ServicesTypesFilter from "./ServicesTypesFilter";
import FacilitiesFilter from "./FacilitiesFilter";
import PriceFilter from "./PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedServicesTypes, setSelectedServicesTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedServicesTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: servicesData } = useQuery(["searchServices", searchParams], () =>
    apiClient.searchServices(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleServicesTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const servicesType = event.target.value;
    setSelectedServicesTypes((prevServicesTypes) =>
      event.target.checked
        ? [...prevServicesTypes, servicesType]
        : prevServicesTypes.filter((services) => services !== servicesType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;
    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 p-4 h-auto lg:min-h-screen">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="lg:hidden mb-4 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition flex items-center justify-between"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span>{isSidebarOpen ? 'Close Filters' : 'Open Filters'}</span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter Sidebar */}
      <div
        className={`flex-shrink-0 w-full lg:w-1/4 max-w-[250px] rounded-lg border border-slate-300 p-5 shadow-md bg-white ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}
        style={{ height: 'auto', maxHeight: 'fit-content' }}
      >
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <ServicesTypesFilter
            selectedServicesTypes={selectedServicesTypes}
            onChange={handleServicesTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-5 w-full lg:w-3/4 overflow-auto lg:max-h-[calc(100vh-8rem)]">
        {/* Services Count and Sort Dropdown */}
        <div className="flex flex-col mb-4 mt-6">
          <span className="text-xl font-bold">
            {servicesData?.pagination.total} Services found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <div className="flex flex-col mt-2">
          <select
  value={sortOption}
  onChange={(event) => setSortOption(event.target.value)}
  className="p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 transition"
>
  <option value="">Select Option</option>
  <option value="starRating">Star Rating</option>
  <option value="pricePerNightAsc">Price Per Night (low to high)</option>
  <option value="pricePerNightDesc">Price Per Night (high to low)</option>
</select>
          </div>
        </div>

        {/* Services Cards */}
        <div className="flex flex-col gap-4">
          {servicesData?.data.map((services) => (
            <SearchResultsCard key={services._id} services={services} />
          ))}
        </div>

        {/* Pagination */}
        <div>
          <Pagination
            page={servicesData?.pagination.page || 1}
            pages={servicesData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
