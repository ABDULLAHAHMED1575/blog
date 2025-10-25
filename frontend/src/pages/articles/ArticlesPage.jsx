import { MainLayout } from '@/components/MainLayout'
import { Card } from '@/components/Card'
import { IoIosArrowForward } from "react-icons/io";
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getUserPosts } from '@/services/index/post';

export const ArticlesPage = () => {
    const {data,isLoading,isError} = useQuery({
        queryFn:()=>getUserPosts(),
        queryKey:["posts"],
        onError:(error)=>{
            toast.error(error.message);
        }
    })

  return (
    <MainLayout>
        <section className='container mx-auto flex flex-col px-5 py-10'>
            <div className='mb-10'>
                <h1 className='text-4xl font-bold text-dark-hard mb-4'>Articles</h1>
                <p className='text-dark-soft'>Explore our collection of articles</p>
            </div>

            <div className='flex flex-wrap md:gap-x-5 gap-y-5 pb-10'>
                {isLoading && (
                    <p className='text-center w-full'>Loading posts...</p>
                )}
                {isError && (
                    <p className='text-center w-full text-red-500'>Error loading posts</p>
                )}
                {!isLoading && !isError && data && Array.isArray(data) && data.length > 0 ? (
                    data.map((posts)=>(
                        <Card key={posts._id}
                        posts={posts}
                        className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] "
                        />
                    ))
                ) : (
                    !isLoading && !isError && <p className='text-center w-full'>No posts available</p>
                )}
            </div>

            {!isLoading && !isError && data && data.length > 0 && (
                <button className='mx-auto flex gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg items-center hover:bg-primary hover:text-white transition-colors'>
                    <span>Load more</span>
                    <IoIosArrowForward className='w-3 h-3'/>
                </button>
            )}
        </section>
    </MainLayout>
  )
}
