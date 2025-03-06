import React from 'react'
import { FaFacebookSquare, FaRedditSquare, FaTwitterSquare, FaWhatsappSquare } from 'react-icons/fa'

export const SocialShareButton = ({url,title}) => {
  return (
    <div className='w-full flex justify-between md:items-center md:justify-center md:space-x-[105px]'>
        <a title="_blank" rel='noreferel' href={`https://www.facebook.com/dialog/share?app_id=1180206992856877&display=popup&href=${url}`}><FaFacebookSquare className='text-[#3b5998] w-12 h-auto'/></a>
        <a title="_blank" rel='noreferel' href={`https://www.twitter.com/intent/tweet?url=${url}`}><FaTwitterSquare className='text-[#00acee] w-12 h-auto'/></a>
        <a title="_blank" rel='noreferel' href={`https://www.reddit.com/submit?url=${url}&title=${title}`}><FaRedditSquare className='text-[#ff4500] w-12 h-auto'/></a>
        <a title="_blank" rel='noreferel' href={`https://api.whatsapp.com/send/?text=${url}`}><FaWhatsappSquare className='text-[#25D366] w-12 h-auto'/></a>
    </div>
  )
}
