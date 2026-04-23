import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-4 my-20 mx-8 sm:mx-20 xl:mx-32'>
        <h1 className='text-2xl md:text-4xl font-semibold '>Never Miss a Blog</h1>
        <p className='md:text-lg text-gray-500/70 pb-4'>Subscribe to our newsletter to get the latest updates and articles delivered straight to your inbox.</p>
        <form className='flex items-center gap-3.5 justify-between max-w-2xl w-full md:h-13 h-12'>
            <input type="email" placeholder='Enter your email' className='px-4 py-2 border border-gray-300 rounded-md h-full w-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary' />
            <button type='submit' className='px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 cursor-pointer hover:scale-105 transition-all'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter