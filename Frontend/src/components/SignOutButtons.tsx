import { useMutation, useQueryClient } from "react-query"; 
import * as apiClient from "../operatorApiClient";
import { useAppContext } from "../contexts/AppContext";

const SignOutButtons = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateTokens");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-900 text-white font-semibold rounded-lg px-6 py-3 text-lg transition-all duration-300 hover:bg-red-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500"
    >
      Sign Out
    </button>
  );
};

export default SignOutButtons;
