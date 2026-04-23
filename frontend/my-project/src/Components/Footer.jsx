import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-10
         py-10 border-b border-gray-300 text-gray-500'>
            <div>
                <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />
                <p className='mt-2'>QuickBlog is a platform for sharing knowledge
                     and ideas.</p>
            </div>

            <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
                {footer_data.map((section) => (
                    <div key={section.title}>
                        <h3 className='text-lg font-semibold mb-3'>{section.title}</h3>
                        <ul className='space-y-2'>
                            {section.links.map((link, index) => (
                                <li key={index} className='text-sm hover:underline hover:text-primary cursor-pointer'><a href="#">{link}</a></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

        </div>
        <p className='text-center py-4 text-sm md:text-base text-gray-500'>
            © 2024 QuickBlog. All rights reserved.</p>

    </div>
  )
}

export default Footer