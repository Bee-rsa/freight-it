import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageServicesForm from "../forms/ManageServicesForm/ManageServicesForm";
import { useAppContext } from "../contexts/AppContext";

const EditServices = () => {
  const { servicesId } = useParams();
  const { showToast } = useAppContext();

  const { data: services } = useQuery(
    "fetchMyServicesById",
    () => apiClient.fetchMyServicesById(servicesId || ""),
    {
      enabled: !!servicesId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyServicesById, {
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

  return (
    <ManageServicesForm services={services} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditServices;