import { ImagePicker } from "@/components/ImagePicker";
import { createPost, getUserPosts } from "@/services/index/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PostData = () => {
  const [title, setTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (userState.userInfo && userState.userInfo.token) {
  //     console.log("Token available on component mount:", userState.userInfo.token.substring(0, 10) + "...");
  //   } else {
  //     console.log("No token available on component mount");
  //   }
  // }, [userState.userInfo]);


  const {
    data: postsData,
    isLoading: postsIsLoading,
    error: postsError
  } = useQuery({
    queryFn: () => {
      return getUserPosts({ token: userState.userInfo?.token });
    },
    queryKey: ['posts'],
    enabled: !!userState.userInfo?.token,
    onError: (error) => {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts: " + error.message);
    }
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: (postData) => {
      if (!userState.userInfo || !userState.userInfo.token) {
        throw new Error("Not authorized, No token");
      }
      
      return createPost({
        token: userState.userInfo.token,
        postData
      });
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(['posts']);
      toast.success("Post created successfully!");
      setTitle("");
      setPostDescription("");
      setSelectedImage(null);
      setFormErrors({});
      setCharCount(0);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post");
      console.error(error);
    }
  });

  const validateForm = () => {
    const errors = {};
    
    if (!title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!postDescription.trim()) {
      errors.description = "Description is required";
    }
    
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!userState.userInfo || !userState.userInfo.token) {
      toast.error("Not authorized, No token");
      navigate("/");
      return;
    }
    if (validateForm()) {
      setIsSubmitting(true);
      const submissionData = {
        title: title.trim(),
        caption: postDescription.trim(),
        photo: selectedImage
      };
      
      mutate(submissionData, {
        onSettled: () => {
          setIsSubmitting(false);
        }
      });
    }
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setPostDescription(text);
      setCharCount(text.length);
    }
  };

  const handleImageSelect = (imageFile) => {
    setSelectedImage(imageFile);
    
    if (imageFile) {
      toast.success("Image selected: " + (imageFile.name || "File"));
    }
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="flex flex-col md:flex-row justify-center items-start md:space-x-6 p-4">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="w-full md:w-1/2 max-w-md bg-white rounded-xl shadow-lg p-6 mb-6 md:mb-0 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-dark-hard">Upload Image</h2>
          <div className={`${formErrors.image ? 'border-red-500 border-2 rounded-lg p-2' : ''}`}>
            <ImagePicker onImageSelect={handleImageSelect} />
            {formErrors.image && (
              <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>
            )}
          </div>
          {selectedImage && (
            <div className="mt-2 text-sm text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Image selected: {selectedImage.name || "File"}
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/2 max-w-md bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-dark-hard">Post Details</h2>
          
          <div className="flex flex-col mb-6 w-full">
            <label htmlFor="title" className="text-dark-light font-semibold block">
              Title
            </label>
            <input 
              id="title"
              type="text" 
              placeholder="Enter a catchy title..." 
              className={`placeholder:text-[#969ead] text-dark-hard font-semibold block mt-3 
                rounded-lg px-5 py-4 outline-none border ${
                  formErrors.title ? "border-red-500" : "border-[#c3cad9]"
                }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {formErrors.title && (
              <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
            )}
          </div>
          
          <div className="flex flex-col mb-6 w-full">
            <label htmlFor="caption" className="text-dark-light font-semibold block">
              Description
            </label>
            <div className="relative">
              <textarea
                id="caption"
                placeholder="What's on your mind?"
                className={`placeholder:text-[#969ead] text-dark-hard font-semibold block mt-3 w-full
                  h-32 border rounded-lg px-5 py-4 resize-none outline-none ${
                    formErrors.description ? "border-red-500" : "border-[#c3cad9]"
                  }`}
                value={postDescription}
                onChange={handleDescriptionChange}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {charCount}/{maxChars}
              </div>
            </div>
            {formErrors.description && (
              <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            onClick={handleSubmit}
          >
            {(isSubmitting || isLoading) ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </>
            ) : "Post Now"}
          </button>
        </div>
      </div>
    </div>
  );
}