import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../operatorApiClient";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FreightItLogo from "../assets/1000140889-removebg-preview.png";

export type OperatorSignInFormData = {
  email: string;
  password: string;
};

const OperatorSignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<OperatorSignInFormData>();

  const mutation = useMutation(apiClient.operatorSignIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateTokens");
      navigate(location.state?.from?.pathname || "/operator-home");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 mt-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg">
        {/* Left Section: Sign In Form */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
              Not Registered?{" "}
                <Link className="text-blue-600 hover:underline" to="/registers">
                  Create an account here
                </Link>
              </span>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: Logo */}
        <div className="hidden md:flex md:w-1/2 bg-red-900 rounded-r-lg items-center justify-center flex-col">
          <img src={FreightItLogo} alt="Freight It Logo" className="w-2/3 mb-4" />
          <p className="text-lg md:text-2xl font-bold mb-6 text-center text-white px-4 py-2"> {/* Added padding */}
            "Welcome Back! Let's get you signed in to continue where you left off and keep things moving."
          </p>
        </div>
      </div>
    </div>
  );
};

export default OperatorSignIn;
