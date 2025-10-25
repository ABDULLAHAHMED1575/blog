import { BreadCrumb } from '@/components/BreadCrumb'
import { MainLayout } from '@/components/MainLayout'
import { images, stables } from '@/constants';
import { SuggestedPost } from './container/SuggestedPost';
import { CommentsContainer } from '@/components/comments/CommentsContainer';
import { SocialShareButton } from '@/components/SocialShareButton';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPost, deletePost } from '@/services/index/post';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';



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
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);
    const queryClient = useQueryClient();

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

    const { mutate: mutateDeletePost, isLoading: isDeleting } = useMutation({
        mutationFn: ({ slug, token }) => {
            return deletePost({ slug, token });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
            toast.success("Post deleted successfully!");
            navigate("/");
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
                slug: slug,
                token: userState.userInfo.token
            });
        }
    };

    // Check if current user can delete this post (owner or admin)
    const canDelete = userState.userInfo && data &&
        (userState.userInfo._id === data.user?._id || userState.userInfo.admin);

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
                    {data?.categories?.[0]?.name || 'UNCATEGORIZED'}
                </Link>
                <div className='flex justify-between items-start mt-4'>
                    <h1 className='text-xl font-medium font-roboto text-dark-hard md:text-[26px] flex-1'>{data?.title || 'Loading...'}</h1>
                    {canDelete && (
                        <button
                            onClick={handleDeletePost}
                            disabled={isDeleting}
                            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            <AiOutlineDelete className="w-5 h-5" />
                            {isDeleting ? 'Deleting...' : 'Delete Post'}
                        </button>
                    )}
                </div>
                <div className='mt-4 text-dark-soft'>
                    <p className='leading-7 '>
                        {data?.caption || 'Loading content...'}
                    </p>
                </div>
                <CommentsContainer className="mt-10" logginedUserId={data?.user?._id} postSlug={slug}/>
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
