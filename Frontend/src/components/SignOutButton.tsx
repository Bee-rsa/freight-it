import React from "react"; // Import React
import { useMutation, useQueryClient } from "react-query"; // Import hooks from react-query
import * as apiClient from "../api-client"; // Import the API client for sign out
import { useAppContext } from "../contexts/AppContext"; // Import context for showing toast notifications
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SignOutButton: React.FC = () => {
  const queryClient = useQueryClient(); // Initialize query client for cache management
  const { showToast } = useAppContext(); // Get showToast function from context
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Define mutation for sign-out
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken"); // Invalidate token query to refresh the state
      showToast({ message: "Signed Out!", type: "SUCCESS" }); // Show success message
      navigate("/"); // Redirect to home page after signing out
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" }); // Show error message
    },
  });

  // Handle sign-out button click
  const handleClick = () => {
    mutation.mutate(); // Trigger the sign-out mutation
  };

  return (
    <button
      onClick={handleClick} // Set onClick event handler
      className="bg-red-900 text-white font-semibold rounded-lg px-4 py-2 text-lg transition-all duration-300 hover:bg-red-800 shadow-lg focus:outline-none"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton; // Export the component
