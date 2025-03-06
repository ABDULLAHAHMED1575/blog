
import { VscVerifiedFilled } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import React from 'react'
import { images, stables } from "@/constants";
import { Link } from "react-router-dom";

export const Card = ({posts,className, image}) => {
  return (
    <div className={`rounded-xl overflow-hidden hover:cursor-pointer shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ${className}`}>
        <Link to={`/blog/${posts.slug}`}>
            <img src={posts.photo ? stables.UPLOAD_FOLDER_BASE_URL + posts.photo : images.noPhoto} 
            alt="Articles"  className='w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60'/>
        </Link>
        <div className='p-5'>
            <Link to={`/blog/${posts.slug}`}>
                <h2 className='font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]'>
                    {posts.title}
                </h2>
                <p className='text-dark-light mt-3 text-sm md:text-lg'>
                    {posts.caption}
                </p>
            </Link>
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
