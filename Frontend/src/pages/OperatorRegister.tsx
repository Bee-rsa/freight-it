import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../operatorApiClient";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type OperatorRegisterFormData = {
  cellNumber: string; // Keep as string for formatting
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean; // Add this line
  companyName: string;
};

const Registers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<OperatorRegisterFormData>();

  const mutation = useMutation(apiClient.registers, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 font-poppins" onSubmit={onSubmit}>
      <h2 className="text-4xl font-semibold text-center mb-6">Create Your Account</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <label className="text-gray-700 font-medium flex-1">
            Company Name
            <input
              className="border rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("companyName", { required: "This field is required" })}
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm" aria-live="assertive">{errors.companyName.message}</span>
            )}
          </label>
        </div>
        <label className="text-gray-700 font-medium">
          Cell Number
          <input
            className="border rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("cellNumber", { required: "This field is required" })}
          />
          {errors.cellNumber && (
            <span className="text-red-500 text-sm" aria-live="assertive">{errors.cellNumber.message}</span>
          )}
        </label>
        <label className="text-gray-700 font-medium">
          Email
          <input
            type="email"
            className="border rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", { 
              required: "This field is required", 
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email format
                message: "Invalid email address"
              } 
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm" aria-live="assertive">{errors.email.message}</span>
          )}
        </label>

        <label className="text-gray-700 font-medium">
          Password
          <input
            type="password"
            className="border rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm" aria-live="assertive">{errors.password.message}</span>
          )}
        </label>

        <label className="text-gray-700 font-medium">
          Confirm Password
          <input
            type="password"
            className="border rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Your passwords do not match";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm" aria-live="assertive">{errors.confirmPassword.message}</span>
          )}
        </label>
      </div>

      {/* Terms and Conditions Checkbox */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="terms"
          className="mr-2"
          {...register("terms", {
            required: "You must accept the Terms and Conditions",
          })}
        />
        <label htmlFor="terms" className="text-gray-700 font-medium">
          I accept the{" "}
          <a href="/terms-and-conditions" className="text-blue-600 underline">
            Terms and Conditions
          </a>
        </label>
        {errors.terms && (
          <span className="text-red-500 text-sm" aria-live="assertive">{errors.terms.message}</span>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-custom-blue text-white p-3 rounded-md font-bold hover:bg-blue-900 transition duration-200 ease-in-out"
        >
          Create Account
        </button>
      </div>

      {/* Sign In Link */}
      <p className="mt-4 text-left">
        Already have an account?{" "}
        <a href="/operator-sign-in" className="text-blue-600 underline">
          Sign in here
        </a>
      </p>
    </form>
  );
};

export default Registers;
