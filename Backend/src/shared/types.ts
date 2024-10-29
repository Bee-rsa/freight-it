import { Key } from "readline";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cellNumber: string;
};

export type OperatorType = {
  _Id: string;
  email: string;
  password: string;
  companyName: string;
  cellNumber: string;
};

export type ServicesType = {
    id: string;
    _id: any;
    userId: string;
    businessName: string;
    contactPersonsName: string;
    fuelSurcharge: number;
    businessEmailAddress: string;
    website: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    totalCosts: number;
    AccessorialCharges: number,
    imageUrls: string[];
    lastUpdated: Date;
    bookings: BookingType[];
  }

  export type BookingType = {
    id: Key | null | undefined;
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
  };

  export type ServicesSearchResponse = {
    data: ServicesType[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };

  export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};