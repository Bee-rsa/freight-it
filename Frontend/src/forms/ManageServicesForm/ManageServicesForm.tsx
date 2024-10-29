import { FormProvider, useForm } from "react-hook-form"; 
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestSection";
import ImagesSection from "./ImageSection";
import Subscriptions from "./Subscriptions"; // Import the new component
import { ServicesType } from '../../../../Backend/src/shared/types';
import { useEffect, useState } from "react";

export type ServicesFormData = {
  businessName: string;
  contactPersonsName: string;
  fuelSurcharge: number;
  businessEmailAddress: string;
  website: string;
  city: string;
  country: string;
  description: string;
  type: string;
  totalCosts: number;
  AccessorialCharges: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  services?: ServicesType;
  onSave: (servicesFormData: FormData) => void;
  isLoading: boolean;
};

const ManageServicesForm = ({ onSave, isLoading, services }: Props) => {
  const formMethods = useForm<ServicesFormData>();
  const { handleSubmit, reset, watch } = formMethods;

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Watch the 'type' field
  const selectedType = watch("type");

  useEffect(() => {
    reset(services);
  }, [services, reset]);

  const onSubmit = handleSubmit((formDataJson: ServicesFormData) => {
    const formData = new FormData();
    if (services) {
      formData.append("servicesId", services._id);
    }
    formData.append("businessName", formDataJson.businessName);
    formData.append("contactPersonsName", formDataJson.contactPersonsName);
    formData.append("fuelSurcharge", formDataJson.fuelSurcharge.toString());
    formData.append("businessEmailAddress", formDataJson.businessEmailAddress);
    formData.append("website", formDataJson.website);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("totalCosts", formDataJson.totalCosts.toString());
    formData.append("AccessorialCharges", formDataJson.AccessorialCharges.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        {/* Subscription Plans Section moved to Subscriptions component */}
        <Subscriptions selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />

        {/* Show Add Services and Type sections only if Basic Plan is selected */}
        {selectedPlan === "Basic Plan" && (
          <>
            <DetailsSection />
          </>
        )}

        {/* Show the following sections only if "Truckload" is selected */}
        {selectedType === "Truckload" && (
          <>
            <FacilitiesSection />
            <GuestsSection />
            <ImagesSection />
          </>
        )}

        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className={`bg-blue-900 text-white py-3 px-6 font-bold rounded-lg transition duration-300 ease-in-out hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed`}
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {isLoading ? "Saving..." : "Save Details"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};  

export default ManageServicesForm;
