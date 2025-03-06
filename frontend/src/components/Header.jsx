import { images } from '@/constants'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '@/store/acion/user';
import { Link, useNavigate } from 'react-router-dom';



const NavItemsInfo = [
  {"name":"Home", type: "link", href:'/'},
  {"name":"Articles", type: "link", href:"/articles"},
  {"name":"Pages", type: "dropdown", items: [{title:"About us",href:"/about"},{title:'Contact us',href:'/contact'}]},
  {"name":"Pricing", type: "link", href:"/pricing"},
  {"name":"FAQ", type: "link", href:"/faq"},
]

const NavItem = ({item}) => {
  const [dropdown,setdropdown] = useState(false);
  const toggleDropdownHandler =()=>{
    setdropdown((currentState) => !currentState)
  }

  return (
    <li className='relative group'>
      {item.type ==="link" ?( <>
        <Link to={item.href} className='px-4 py-2 '>{item.name}</Link>
        <span className='cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100'>/</span>
      </>):(
        <div className='flex flex-col items-center'>
        <button className='px-4 py-2 flex gap-x-1 items-center ' onClick={toggleDropdownHandler}>
          <span>{item.name}</span> 
          <RiArrowDropDownLine/>
        </button>
        <div className=''>
          <div className={`${dropdown ? "block":"hidden"} lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}>
            <ul className='bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden'>
              {
                item.items.map((page, index) => (
                  <Link key={index} to={page.href} className='hover:bg-dark-hard hover:text-white px-4 py-2 lg:text-dark-soft'>
                    {page.title}
                  </Link>
                ))
              }
            </ul>
          </div>
        </div>
      </div>) }
      </li>
  )
};

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible,setVisisble] = useState(false);
  const userState = useSelector(state => state.user);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
  }

  const navVisibilityHandle = () => {
    setVisisble((currentState) => !currentState)
  }
  return (
    <section className='sticky top-0 left-0 right-0 z-50 bg-white'>
        <header className='containers mx-auto flex justify-between items-center py-3 '>
          <Link to="/">
            <img src={images.Logo} alt="Logo" className='w-16 h-16 object-contain'/>
          </Link>
          <div className='lg:hidden z-50'>
            {visible ? ( 
              <AiOutlineClose className="w-6 h-6" onClick={navVisibilityHandle}/> 
            ):( 
              <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandle}/>
            )}
          </div>
          <div className={`${visible ? "right-0": "right-full"} mt-[80px] lg:mt-0 lg:text-black bg-dark-hard lg:bg-transparent z-[49] flex flex-col lg:flex-row w-full lg:w-auto justify-center lg:justify-end fixed top-0 bottom-0 lg:static gap-5 items-center transition-all duration-300`}>

            <ul className='flex text-white items-center gap-y-5 lg:text-dark-soft flex-col lg:flex-row gap-3 font-semibold'>
              {NavItemsInfo.map((items) => (
                <NavItem key={items.name} item={items}/>
              ))}
            </ul>
            {userState.userInfo ? 
            (<div className='flex text-white items-center gap-y-5 lg:text-dark-soft
             flex-col lg:flex-row gap-3 font-semibold'>
              <div className='relative group'>
                <div className='flex flex-col items-center'>
                <button className='flex gap-x-1 items-center text-white
                 lg:text-black border-2 border-blue-500 rounded-full px-6 py-2
             hover:bg-blue-500 hover:text-white transition-all duration-300' onClick={() => setProfileDropdown(!profileDropdown)}>
                  <span>Account</span> 
                  <RiArrowDropDownLine/>
                </button>
                <div className=''>
                  <div className={`
                    ${profileDropdown ? "block":"hidden"} lg:hidden transition-all duration-500 pt-4 
                    lg:absolute lg:bottom-0 
                    lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}>
                    <ul 
                    className='bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg 
                    rounded-lg overflow-hidden'>
                      <button 
                      onClick={()=> navigate("/profile")}
                      type='button'
                      className='hover:bg-dark-hard hover:text-white px-6 py-2 lg:text-dark-soft'
                      >
                        Profile page
                      </button>
                      <button 
                      onClick={logoutHandler}
                      type='button'
                      className='hover:bg-dark-hard hover:text-white px-6 py-2 lg:text-dark-soft'
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
              </div>
              
            </div>):
            (<button onClick={()=> navigate("/login")} className='text-white lg:text-black border-2 border-blue-500 rounded-full px-6 py-2
             hover:bg-blue-500 hover:text-white transition-all duration-300'>Sign in</button>)}
            
          </div>
        </header>
    </section>
  )
}
