import { ServicesType } from "../../../Backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  services: ServicesType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  services,
}: Props) => {
  return (
    <div className="grid gap-6 rounded-lg border border-slate-200 p-6 bg-white shadow-md h-fit max-w-lg ml-0">
      <h2 className="text-2xl font-semibold text-gray-800">Booking Details</h2>

      {/* Location */}
      <div className="py-3 border-b">
        <p className="text-sm text-gray-500">Location</p>
        <div className="font-bold text-lg text-gray-700">{`${services.businessName}, ${services.city}, ${services.country}`}</div>
      </div>

      {/* Check-in and Check-out Dates */}
      <div className="flex justify-between py-3">
        <div>
          <p className="text-sm text-gray-500">Check-in</p>
          <div className="font-bold text-lg text-gray-700">{checkIn.toDateString()}</div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Check-out</p>
          <div className="font-bold text-lg text-gray-700">{checkOut.toDateString()}</div>
        </div>
      </div>

      {/* Total Length of Stay */}
      <div className="py-3 border-t border-b">
        <p className="text-sm text-gray-500">Length of stay</p>
        <div className="font-bold text-lg text-gray-700">{numberOfNights} nights</div>
      </div>

      {/* Guests */}
      <div className="py-3">
        <p className="text-sm text-gray-500">Guests</p>
        <div className="font-bold text-lg text-gray-700">
          {adultCount} {adultCount === 1 ? "adult" : "adults"} & {childCount}{" "}
          {childCount === 1 ? "child" : "children"}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
