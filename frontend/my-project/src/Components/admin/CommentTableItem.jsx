import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {
  const {blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  // ================= APPROVE COMMENT =================
  const approveComment = async () => {
    try {
      const { data } = await axios.post(`/api/admin/approve-comment/${_id}`);
      if (data.success) {
        toast.success(data.message);
        await fetchComments(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= DELETE COMMENT =================
  const deleteComment = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?",
    );
    if (!confirmDelete) return;

    try {
     const { data } = await axios.post(`/api/admin/delete-comment/${_id}`);
      if (data.success) {
        toast.success(data.message);
        await fetchComments(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 cursor-pointer transition-all">
      <td className="py-4 px-2">
        <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
        <br />
        <br />
        <b className='font-medium text-gray-600'>Name</b> : {comment.name}
        <br />
        
        <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
      </td>
      <td className='px-6 py-4 max-sm:hidden'>
        {BlogDate.toLocaleDateString()}
      </td>
      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
            {!comment.isApproved ? 
            <img onClick={approveComment} src={assets.tick_icon} alt="" className='w-5 hover:scale-110 transition-all cursor-pointer'/>
            : <p className='text-green-600 text-sm border border-green-600 bg-green-100 px-3 py-1 rounded-full'>Approved</p>
        }
        <img  onClick={deleteComment} src={assets.bin_icon} alt="" className='w-5 hover:scale-110 transition-all cursor-pointer '/>

        </div>
      </td>
      
     
    </tr>
  )
}

export default CommentTableItem