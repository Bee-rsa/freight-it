import { useMutation } from "react-query";
import ManageServicesForm from "../forms/ManageServicesForm/ManageServicesForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddServices = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyServices, {
    onSuccess: () => {
      showToast({ message: "Services Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Services", type: "ERROR" });
    },
  });

  const handleSave = (servicesFormData: FormData) => {
    mutate(servicesFormData);
  };

  return <ManageServicesForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddServices;