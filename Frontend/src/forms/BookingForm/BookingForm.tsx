import { useForm } from "react-hook-form";
import { PaymentIntentResponse, UserType } from "../../../../Backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  servicesId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { servicesId } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    }
  );

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      servicesId: servicesId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <div className="flex justify-end w-full p-0 m-0"> {/* Align form to the far right */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg ml-auto" 
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Your Details</h2>
        <div className="grid grid-cols-2 gap-8">
          <label className="text-gray-700 text-lg font-medium">
            First Name
            <input
              className="mt-2 border rounded w-full py-3 px-4 bg-gray-50 text-gray-800"
              type="text"
              readOnly
              disabled
              {...register("firstName")}
            />
          </label>
          <label className="text-gray-700 text-lg font-medium">
            Last Name
            <input
              className="mt-2 border rounded w-full py-3 px-4 bg-gray-50 text-gray-800"
              type="text"
              readOnly
              disabled
              {...register("lastName")}
            />
          </label>
          <label className="text-gray-700 text-lg font-medium">
            Email
            <input
              className="mt-2 border rounded w-full py-3 px-4 bg-gray-50 text-gray-800"
              type="text"
              readOnly
              disabled
              {...register("email")}
            />
          </label>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Your Price Summary</h3>
          <div className="bg-blue-100 p-5 rounded-md">
            <div className="font-semibold text-xl text-gray-700">
              Total Cost: R{paymentIntent.totalCost.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Includes taxes and charges</div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Payment Details</h3>
          <CardElement
            id="payment-element"
            className="border rounded-md p-4 text-lg bg-gray-50"
          />
        </div>

        <div className="flex justify-end mt-8">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-500 text-lg disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
