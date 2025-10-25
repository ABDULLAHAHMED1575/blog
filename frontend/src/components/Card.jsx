
import { VscVerifiedFilled } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { AiOutlineDelete } from "react-icons/ai";
import React from 'react'
import { images, stables } from "@/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/services/index/post";
import toast from "react-hot-toast";

export const Card = ({posts,className, image}) => {
  const userState = useSelector(state => state.user);
  const queryClient = useQueryClient();

  const { mutate: mutateDeletePost, isLoading: isDeleting } = useMutation({
    mutationFn: ({ slug, token }) => {
      return deletePost({ slug, token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleDeletePost = () => {
    if (!userState.userInfo) {
      toast.error("Please login to delete posts");
      return;
    }

    if (window.confirm("Are you sure you want to delete this post?")) {
      mutateDeletePost({
        slug: posts.slug,
        token: userState.userInfo.token
      });
    }
  };

  // Check if current user can delete this post (owner or admin)
  const canDelete = userState.userInfo &&
    (userState.userInfo._id === posts.user._id || userState.userInfo.admin);

  return (
    <div className={`rounded-xl overflow-hidden hover:cursor-pointer shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ${className}`}>
        <Link to={`/blog/${posts.slug}`}>
            <img src={posts.photo ? stables.UPLOAD_FOLDER_BASE_URL + posts.photo : images.noPhoto} 
            alt="Articles"  className='w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60'/>
        </Link>
        <div className='p-5'>
            <div className='flex justify-between items-start'>
                <Link to={`/blog/${posts.slug}`} className="flex-1">
                    <h2 className='font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]'>
                        {posts.title}
                    </h2>
                    <p className='text-dark-light mt-3 text-sm md:text-lg'>
                        {posts.caption}
                    </p>
                </Link>
                {canDelete && (
                    <button
                        onClick={handleDeletePost}
                        disabled={isDeleting}
                        className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                        title="Delete post"
                    >
                        <AiOutlineDelete className="w-5 h-5" />
                    </button>
                )}
            </div>
            <div className='flex justify-between flex-nowrap items-center mt-6 '>
                <div className='flex items-center gap-x-2 md:gap-x-2.5'>
                        <img src={posts.user.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + posts.user.avatar
                        : images.profilePic} alt="Post Profile" className="w-9 h-9 md:w-10 md:h-10 rounded-full"/>
                
                    
                    <div className='flex flex-col'>
                        <h4 className='font-bold italic text-dark-soft text-sm md:text-base'>
                            Abdullah ahmed
                        </h4>
                        <div className='flex items-center gap-x-2'>
                            {posts.user.verified ? (
                                <>
                                    <span>
                                        <VscVerifiedFilled/>
                                    </span> 
                                    <span className='text-dark-light italic text-xs md:text-sm'>
                                        Verified Writer
                                    </span>
                                </>
                            ):(
                                <span className='text-dark-light italic text-xs md:text-sm'>
                                    Unverified Writer
                                </span>
                            )}
                            
                            
                        </div>
                    </div>
                </div>
                <div className='font-bold text-dark-light italic text-sm md:text-base'>
                    {new Date(posts.createdAt).getDate()} {new Date(posts.createdAt).toLocaleString("default",{
                        month:"long",
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}
