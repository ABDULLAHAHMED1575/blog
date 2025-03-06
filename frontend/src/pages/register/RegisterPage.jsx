import { MainLayout } from '@/components/MainLayout'
import { signup } from '@/services/index/users';
import { userAction } from '@/store/reducers/userReducer';
import { useMutation } from '@tanstack/react-query';

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';



export const RegisterPage = () => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user);
    const navigate = useNavigate();

    const {mutate,isLoading} = useMutation({
        mutationFn:({name,email,password})=>{
            return signup({name,email,password});
        },
        onSuccess:(data)=>{
            dispatch(userAction.setUserInfo(data));
            localStorage.setItem("account",JSON.stringify(data));
        },
        onError:(error)=>{
            toast.error(error.message)
            console.log(error);
        },
    })

    useEffect(()=>{
        if(userState.userInfo){
            navigate("/");
        }
    },[navigate,userState.userInfo])

    const {register,handleSubmit,formState:{errors,isValid},watch} = useForm({
        defaultValues:{
        name: "",
        email: "",
        password:"",
        confirmPassword:"",
        },
        mode:"onChange",
    })
    const submitHandler = (data) => {
        const {name,email,password} = data;
        mutate({name,email,password});
    };
    const password= watch("password")
  return (
    <MainLayout>
        <section className = "container mx-auto px-5 py-10">
            <div className='w-full max-w-sm mx-auto'>
                <h1 className='font-roboto text-2xl font-bold text-center text-dark-hard mb-8'>
                    Sign Up
                </h1>
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
                        <label htmlFor="password" className='text-dark-light font-semibold block'>
                            Password
                        </label>
                        <input 
                        type="password" 
                        id='password' 
                        {...register("password",{
                            minLength:{
                                value:8,
                                message:"password must be atleast 8 character",
                            },
                            required:{
                                value:true,
                                message:"Password is required",
                            },
                        })}
                        placeholder='Enter Password' 
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
                        <div className='flex flex-col mb-6 w-full'>
                        <label htmlFor="confirmPassword" className='text-dark-light font-semibold block'>
                        Confirm Password
                        </label>
                        <input 
                        type="password" 
                        id='confirmPassword' 
                        {...register("confirmPassword",{
                            minLength:{
                                value:8,
                                message:"password must be atleast 8 character",
                            },
                            required:{
                                value:true,
                                message:"Password is required",
                            },
                            validate:(value)=>{
                                if(value !== password){
                                    return "Password don't match";
                                }
                            },
                        })}
                        placeholder='Enter Password again' 
                        className={`placeholder:text-[#969ead] text-dark-hard font-semibold block mt-3 
                            rounded-lg px-5 py-4 outline-none border border-[#c3cad9] ${
                                errors.confirmPassword ? "border-red-500":"border-[#c3cad9]"
                            }`}/>
                        {errors.confirmPassword?.message && (
                            <p className='text-red-500 text-xs mt-1'>
                                {errors.confirmPassword?.message}
                            </p>
                        )}
                    </div>
                    <button type='submit' 
                    disabled={!isValid || isLoading}
                    className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-500'>
                        Register
                    </button>
                    <p className='text-sm font-semibold text-[#5a7184]'>
                        You have an account?
                        <Link to="/login" className='text-primary'>Login Now</Link>
                    </p>
                </form>
            </div>
        </section>
    </MainLayout>
  )
}
