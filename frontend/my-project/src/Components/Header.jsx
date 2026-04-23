import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

    const { setInput, input} = useAppContext()
    const inputRef = useRef()

    const onsubmiHandler = async (e)=>{
        e.preventDefault()
        setInput(inputRef.current.value)
    }

    const onClear = ()=>{
        setInput("")
        inputRef.current.value = ""
    }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-20 mb-8'>

            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5
             mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                <p>New: AI features integrated</p>
                <img src={assets.star_icon} alt="AI Features" />
            </div>

            <h1 className='text-3xl sm:text-4xl font-bold mb-4'>Write, Publish, and Share Your Stories <br/> with 
            <span className='text-primary'>QuickBlog</span></h1>

            <p className='text-gray-500 max-w-2xl m-auto max-sm:text-xs mx-auto my-6'>
                Create, publish, and share your stories with our easy-to-use platform. No technical skills required, just your creativity and passion for storytelling.
                
            </p>

            <form onSubmit={onsubmiHandler} action="" className='flex mt-5 justify-between max-w-lg max-sm:scale-75 mx-auto  overflow-hidden'>
                <input ref={inputRef} type="text" placeholder="Search for stories..." className="w-full max-w-md px-4 py-2 border border-gray-300 cursor-pointer rounded-lg focus:outline-none " />
                <button type="submit" className="ml-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 cursor-pointer hover:scale-105 transition-all">Search</button>
            </form>

            <div className='text-center mt-5'>
                {input &&  <button onClick={onClear} className='border font-light text-xs py-2 px-3 rounded-sm shadow-custom-sm cursor-pointer '>Clear Search</button>}
 
            </div>

        </div>
        <img src={assets.gradientBackground} alt="header" className='absolute top-50  w-full opacity-50 z-[-1]' />

    </div>
  )
}

export default Header