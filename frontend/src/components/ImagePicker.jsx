import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const ImagePicker = ({ onImageSelect }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      onImageSelect(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    onImageSelect(null);
    toast.success("Removed successfully")
  };

  return (
    
    <div className="flex flex-col items-center gap-4 p-4 border border-gray-300 rounded-lg">
      <Toaster position="top-center" reverseOrder={false}/>
      {imagePreview ? (
        <div className="relative h-48">
          <img src={imagePreview} alt="Selected" className="w-full h-full object-contain rounded-lg" />
          <button
            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
            onClick={removeImage}
          >
            <IoMdCloseCircleOutline />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer w-40 flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 md:w-56 lg:w-72 h-56 text-gray-500 hover:bg-gray-100">
          <span>Upload Image</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      )}
    </div>
  );
};

