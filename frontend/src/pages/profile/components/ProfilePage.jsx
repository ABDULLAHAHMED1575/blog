import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {getUserProfile, updateUserProfile} from "@/services/index/users"
import { ProfilePicture } from '@/components/ProfilePicture';
import { userAction } from '@/store/reducers/userReducer';
import toast from 'react-hot-toast';


export const ProfilePage = () => {
    const dispatch = useDispatch();
    
    const userState = useSelector(state => state.user);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data:profileData,
        isLoading: profileIsLoading, 
        error: profileError
    } = useQuery({
        queryFn:()=>{
            return getUserProfile({token: userState.userInfo.token})
        },
        queryKey:['profile'],
    })

    const {mutate,isLoading} = useMutation({
        mutationFn:({name,email,password})=>{
            return updateUserProfile({token:userState.userInfo.token,userData:{name,email,password}});
        },
        onSuccess:(data)=>{
            dispatch(userAction.setUserInfo(data));
            localStorage.setItem("account",JSON.stringify(data));
            queryClient.invalidateQueries(['profile']);
            toast.success("Profile is updated")
        },
        onError:(error)=>{
            toast.error(error.message)
            console.log(error);
        },
    })

    useEffect(()=>{
        if(!userState.userInfo){
            navigate("/");
        }
    },[navigate,userState.userInfo])

    const {register,handleSubmit,formState:{errors,isValid}} = useForm({
        defaultValues:{
        name: "",
        email: "",
        password:"",
        },
        values:{
            name:profileIsLoading || !profileData ? "" : profileData.name,
            email:profileIsLoading || !profileData ? "" : profileData.email,
        },
        mode:"onChange",
    })
    const submitHandler = (data) => {
        const {name,email,password} = data
        mutate({name,email,password});
    };
  return (
        <section className = "container mx-auto px-5 py-10">
            <div className='w-full max-w-sm mx-auto'>
                <ProfilePicture avatar={profileData?.avatar}/>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className='flex flex-col mb-6 w-full'>
                        <label htmlFor="name" className='text-dark-light font-semibold block'>
                            Name
                        </label>
                        <input 
                        type="text" 
                        id='name' 
                        {...register("name",{
                            minLength:{
                                value:1,
                                message:"name must be atleast one character",
                            },
                            required:{
                                value:true,
                                message:"Name is required",
                            }
                        })}
                        placeholder='Enter Name' 
                        className={`placeholder:text-[#969ead] text-dark-hard font-semibold block mt-3 
                        rounded-lg px-5 py-4 outline-none border border-[#c3cad9] ${
                            errors.name ? "border-red-500":"border-[#c3cad9]"
                        }`}
                        />
                        {errors.name?.message && (
                            <p className='text-red-500 text-xs mt-1'>
                                {errors.name?.message}
                            </p>
                        )}
                        </div>
                        <div className='flex flex-col mb-6 w-full'>
                        <label htmlFor="email" className='text-dark-light font-semibold block'>
                            Email
                        </label>
                        <input 
                        type="text" 
                        id='email' 
                        {...register("email",{
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                            required:{
                                value:true,
                                message:"Email is required",
                            },
                        })}
                        placeholder='Enter Email' 
                        className={`placeholder:text-[#969ead] text-dark-hard font-semibold block mt-3 
                            rounded-lg px-5 py-4 outline-none border border-[#c3cad9] ${
                                errors.email ? "border-red-500":"border-[#c3cad9]"
                            }`}/>
                        {errors.email?.message && (
                            <p className='text-red-500 text-xs mt-1'>
                                {errors.email?.message}
                            </p>
                        )}
                        </div>
                        <div className='flex flex-col mb-6 w-full'>
                        <label htmlFor="newPassword" className='text-dark-light font-semibold block'>
                            New Password (optional)
                        </label>
                        <input 
                        type="password" 
                        id='newPassword'
                        placeholder='Enter new Password' 
                        className={`placeholder:text-[#969ead] text-dark-hard font-semibold block mt-3 
                            rounded-lg px-5 py-4 outline-none border border-[#c3cad9] ${
                                errors.password ? "border-red-500":"border-[#c3cad9]"
                            }`}/>
                        {errors.password?.message && (
                            <p className='text-red-500 text-xs mt-1'>
                                {errors.password?.message}
                            </p>
                        )}

                        </div>
                        
                    <button type='submit' 
                    disabled={!isValid || profileIsLoading}
                    className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-500'>
                        Update
                    </button>
                </form>
            </div>
        </section>
  )
}
