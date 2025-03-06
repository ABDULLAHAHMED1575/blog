import { BreadCrumb } from '@/components/BreadCrumb'
import { MainLayout } from '@/components/MainLayout'
import { images } from '@/constants';
import { SuggestedPost } from './container/SuggestedPost';
import { CommentsContainer } from '@/components/comments/CommentsContainer';
import { SocialShareButton } from '@/components/SocialShareButton';

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/services/index/post';



const postData =[
    {
        id:"1",
        image: images.post1,
        title:"Help children get better education",
        createdAt:"2023-01-08T10:00:00Z",
        updatedAt:"",
    },
    {
        id:"1",
        image: images.post1,
        title:"Help children get better education",
        createdAt:"2023-01-08T10:00:00Z",
        updatedAt:"",
    },
    {
        id:"1",
        image: images.post1,
        title:"Help children get better education",
        createdAt:"2023-01-08T10:00:00Z",
        updatedAt:"",
    },
    {
        id:"1",
        image: images.post1,
        title:"Help children get better education",
        createdAt:"2023-01-08T10:00:00Z",
        updatedAt:"",
    },
]

const tagsData = [
    "Medical",
    "Lifestyle",
    "Learn",
    "Healthy",
    "Food",
    "Diet",
    "Education",
]

export const ArticleDetail = () => {
    const [breadCrumbsData,setBreadCrumbsData] = useState([])
    const {slug} = useParams();
    
    const {data,isLoading,isError,error} = useQuery({
        queryFn:()=>getPost({slug}),
        enabled:!!slug,
        queryKey:[slug],
        onSuccess:(data)=>{
            console.log("data: ",data)
            setBreadCrumbsData([
                {name: "Home",link:"/"},
                {name: "Blog",link:"/blog"},
                {name: "Article",link:`/blog/${data.slug}`},
            ])
        },
    })
    useEffect(() => {
        if (isLoading) console.log("Fetching post...");
        if (isError) console.log("Query Error:", error);
        console.log("Query Data:", data);
    }, [data, isLoading, isError, error]);
  return (
    <MainLayout>
        <section className='container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start'>
            <article className='flex-1'>
                <BreadCrumb data={breadCrumbsData}/>
                <img src={data ?.photo?stables.UPLOAD_FOLDER_BASE_URL + data?.photo : images.noPhoto} alt="Article" className='rounded-xl w-full'/>
                <Link to="/blog?category=selectedCategory" className='text-primary text-sm font-roboto inline-block mt-4 md:text-base'>
                    EDUCATION
                </Link>
                <h1 className='text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]'>| </h1>
                <div className='mt-4 text-dark-soft'>
                    <p className='leading-7 '>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus neque ipsa enim? Tenetur, natus sed illo dolorum adipisci eaque! Laudantium corrupti minima magni fugit perspiciatis tempora animi asperiores explicabo? Harum.
                    </p>
                </div>
                <CommentsContainer className="mt-10" logginedUserId='a'/>
            </article>
            <div className='lg:flex lg:flex-col'>
                <div className='flex items-center justify-center'>
                    <SuggestedPost 
                    header="Latest Articles" 
                    posts={postData} tags={tagsData} 
                    className="mt-8 lg:mt-0 md:max-w-lg max-w-sm"/>
                </div> 
                <div className='mt-7'>
                    <h2 className='font-roboto font-medium text-dark-hard mb-4 md:text-xl md:mx-28 lg:mx-0'>Share On:</h2>
                    <SocialShareButton url={
                        encodeURI("https://www.google.com/")
                    }
                    title={
                        encodeURIComponent("Google")
                    }
                    
                    />
                </div>
            </div>
        </section>
    </MainLayout>
  )
}
