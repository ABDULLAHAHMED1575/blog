import { images } from '@/constants'
import React from 'react'
import {  AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube } from 'react-icons/ai'
import { CgFacebook } from 'react-icons/cg'
import { FaHeart } from "react-icons/fa";
import { MdCopyright } from 'react-icons/md';
export const Footer = () => {
  return (
    <section className='bg-dark-hard'>
        <footer className='container mx-auto grid px-5 py-10 grid-cols-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10'>
          <div className='col-span-5 md:col-span-4 lg:col-span-2'>
            <h3 className='text-dark-light font-bold md:text-lg'>
              Product
            </h3>
            <ul className='text-[#959EAD] text-sm mt-5 space-y-4 md:text-base'>
              <li>
                <a href="/">Landing page</a>
              </li>
              <li>
                <a href="/">Features</a>
              </li>
              <li>
                <a href="/">Documentation</a>
              </li>
              <li>
                <a href="/">Referral Program</a>
              </li>
              <li>
                <a href="/">Pricing</a>
              </li>
            </ul>
          </div>
          <div className='col-span-5 md:col-span-4 lg:col-span-2'>
            <h3 className='text-dark-light font-bold md:text-lg'>
              Services
            </h3>
            <ul className='text-[#959EAD] text-sm mt-5 space-y-4 md:text-base'>
              <li>
                <a href="/">Documentation</a>
              </li>
              <li>
                <a href="/">Design</a>
              </li>
              <li>
                <a href="/">Themes</a>
              </li>
              <li>
                <a href="/">Illustration</a>
              </li>
              <li>
                <a href="/">Ui Kit</a>
              </li>
            </ul>
          </div>
          <div className='col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto'>
            <h3 className='text-dark-light font-bold md:text-lg'>
              Company
            </h3>
            <ul className='text-[#959EAD] text-sm mt-5 space-y-4 md:text-base'>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Terms</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Careers</a>
              </li>
            </ul>
          </div>
          <div className='col-span-5 md:col-span-4 lg:col-span-2'>
            <h3 className='text-dark-light font-bold md:text-lg'>
              More
            </h3>
            <ul className='text-[#959EAD] text-sm mt-5 space-y-4 md:text-base'>
              <li>
                <a href="/">Documentation</a>
              </li>
              <li>
                <a href="/">License</a>
              </li>
              <li>
                <a href="/">Changelog</a>
              </li>
            </ul>
          </div>
          <div className='col-span-10 md:order-first md:col-span-4'>
            <h1 className='text-xl md:justify-start font-bold font-opensans text-white flex justify-center items-center'>POST VISTA</h1>
            <p className='text-sm md:text-left md:text-base text-dark-light flex justify-center items-center mt-4 lg:text-sm'>Build a modern and creative website with crealand</p>
            <ul className='flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start'>
              <li><a href="https://www.instagram.com/"><AiOutlineInstagram className='w-6 h-auto'/></a></li>
              <li><a href="https://www.youtube.com/"><AiOutlineYoutube className='w-6 h-auto'/></a></li>
              <li><a href="https://www.facebook.com/"><CgFacebook className='w-6 h-auto'/></a></li>
            </ul>
          </div>
          <div className='hidden md:flex flex-col items-center space-y-4 md:col-span-12'>
            <div className='bg-primary text-white p-3 rounded-full'>
              <FaHeart className='w-7 h-auto'/>
            </div>
            <p className='font-bold italic text-dark-light'>
            Copyright © 2024.
            </p>
          </div>
        </footer>
    </section>
  )
}
