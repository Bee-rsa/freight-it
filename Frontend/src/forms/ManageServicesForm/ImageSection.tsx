import { useFormContext } from "react-hook-form"; 
import { ServicesFormData } from "./ManageServicesForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<ServicesFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6 bg-white shadow-md rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Images</h2>
      
      {/* Image Grid */}
      <div className="border rounded-lg p-4 flex flex-col gap-4 bg-gray-100">
        {existingImageUrls && existingImageUrls.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {existingImageUrls.map((url) => (
              <div key={url} className="relative group rounded-lg overflow-hidden shadow-md">
                <img src={url} alt="Uploaded" className="w-full h-48 object-cover transition duration-200 ease-in-out transform group-hover:scale-105" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white text-lg font-semibold transition-opacity duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No images uploaded yet.</p>
        )}

        {/* File Input */}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 font-normal bg-white hover:border-blue-500 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + (existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            },
          })}
        />
      </div>

      {/* Error Message */}
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold mt-1">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
