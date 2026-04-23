import React from 'react'
import{ useState } from 'react'
import { blog_data } from '../../../assets/assets'
import { useEffect } from 'react'
import BlogtableItem from '../../admin/BlogtableItem'
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-hot-toast";

const BlogList = () => {
    const [blogs, setBlogs] = useState([])
    const {axios} = useAppContext()

    const fetchBlogs = async () => {
        try {
          const {data} = await axios.get("api/admin/blogs")
          if(data.success){
            setBlogs(data.blogs)
          }else{
            toast.error(data.message)

          }
        } catch (error) {
          toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])
  return (
    <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
        <h1 className='text-gray-600 mb-4 font-semibold'>All blogs</h1>

        <div className="relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white p-4">
          <table className="w-full text-sm text-gray-500 table-auto text-left">
            <thead className="text-gray-400 font-light border-b">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max:sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4 max:sm:hidden">
                  status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blogs, index) => (
                <BlogtableItem key={blogs.id} blog={blogs} fetchBlogs={fetchBlogs} index={index} />
              ))}
            </tbody>
          </table>
        </div>

    </div>
  )
}

export default BlogList