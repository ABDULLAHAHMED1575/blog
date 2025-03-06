import { Card } from '@/components/Card'
import { CTA } from '@/pages/home/container/CTA';
import { IoIosArrowForward } from "react-icons/io";
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getUserPosts } from '@/services/index/post';

export const Articles = () => {
    const {data,isLoading,isError} = useQuery({
        queryFn:()=>getUserPosts(),
        queryKey:["posts"],
        onError:(error)=>{
            toast.error(error.message);
        }
    })
  return (
    <>
        <section className='container mx-auto flex flex-col md:gap-x-5 gap-y-5 px-5 py-10'>
            <div className='flex flex-wrap md:gap-x-5 gap-y-5 pb-10'>
                {!isLoading && !isError && data.map((posts)=>(
                    <Card key={posts._id}
                    posts={posts}
                    className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] " 
                    />
                ))}
            </div>
            <button className='mx-auto flex gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg items-center'>
                <span>More articles</span>
                <IoIosArrowForward className='w-3 h-3'/>
            </button>
        </section>
        <div>
            <CTA/>
        </div>
    </>
  )
}
