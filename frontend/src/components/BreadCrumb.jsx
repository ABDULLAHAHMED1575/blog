import React from 'react'
import { Link } from 'react-router-dom'

export const BreadCrumb = ({data}) => {
  return (
    <div className='flex items-center py-4 overflow-auto whitespace-nowrap '>
        {data.map((item,index) => (
            <div key={index} className='text-black opacity-50 text-xs font-roboto md:text-sm '>
                <Link to={item.link}>
                    {item.name}
                </Link>
                {index !== data.length-1 && <span className='px-3'>/</span>}
            </div>
        ))}
    </div>
  )
}
