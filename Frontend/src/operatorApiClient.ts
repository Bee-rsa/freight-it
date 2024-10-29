import { OperatorRegisterFormData } from "./pages/OperatorRegister";
import { OperatorSignInFormData } from "./pages/OperatorSignIn";
import { OperatorType, PaymentIntentResponse, ServicesSearchResponse, ServicesType } from '../../Backend/src/shared/types';
import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentOperator = async (): Promise<OperatorType> => {
  const response = await fetch(`${API_BASE_URL}/api/operators/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const registers = async (formData: OperatorRegisterFormData) => { 
const response = await fetch(`${API_BASE_URL}/api/operators/registers`, {
    method: 'POST',
    credentials: "include",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
});

const responseBody = await response.json();

if (!response.ok) {
    throw new Error(responseBody.message);
    }
};

export const operatorSignIn = async (formData: OperatorSignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/operatorAuth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };
  
export const validateTokens = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-tokens`, {
      credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Token invalid");
      }
      
      return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyServices = async (servicesFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-services`, {
    method: "POST",
    credentials: "include",
    body: servicesFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add services");
  }

  return response.json();
};

export const fetchMyServices = async (): Promise<ServicesType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-services`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching services");
  }

  return response.json();
};

export const fetchMyServicesById = async (servicesId: string): Promise<ServicesType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-services/${servicesId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Services");
  }

  return response.json();
};

export const updateMyServicesById = async (servicesFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-services/${servicesFormData.get("servicesId")}`,
    {
      method: "PUT",
      body: servicesFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Services");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchServices = async (
  searchParams: SearchParams
): Promise<ServicesSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/services/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching services");
  }

  return response.json();
};

export const fetchServices = async (): Promise<ServicesType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/services`);
  if (!response.ok) {
    throw new Error("Error fetching services");
  }
  return response.json();
};

export const fetchServicesById = async (servicesId: string): Promise<ServicesType> => {
  const response = await fetch(`${API_BASE_URL}/api/services/${servicesId}`);
  if (!response.ok) {
    throw new Error("Error fetching Services");
  }

  return response.json();
};

export const createPaymentIntent = async (
  servicesId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/services/${servicesId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};
export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/services/${formData.servicesId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async (): Promise<ServicesType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};

