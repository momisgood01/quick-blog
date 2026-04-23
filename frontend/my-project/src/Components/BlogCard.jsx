import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {

  const { _id, title, description, category, image } = blog
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className='w-full overflow-hidden hover:scale-102 hover:shadow-primary/25 duration-300 
      cursor-pointer rounded-lg shadow'
    >
      <img
        src={image}
        alt={title}
        className='w-full h-48 object-cover rounded-lg mb-4'
      />

      <span className='ml-5 mt-4 px-3 py-2 inline-block bg-primary/20 rounded-full text-xs text-primary'>
        {category}
      </span>

      <div className='p-5'>
        <h5 className=' font-medium text-gray-900 mb-2'>{title}</h5>
        <p className='text-gray-600 mb-2 text-xs'>
          {description.replace(/<[^>]+>/g, "").slice(0, 80)}...
        </p>
      </div>
    </div>
  )
}

export default BlogCard
