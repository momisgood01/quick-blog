import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const BlogtableItem = ({ blog, fetchBlogs, fetchDashboardData, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  // ================= DELETE BLOG =================
  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post(`/api/blog/delete/${blog._id}`);

      if (data.success) {
        toast.success(data.message);
        
      // refresh list
        if (fetchBlogs) await fetchBlogs();
        if (fetchDashboardData) await fetchDashboardData();

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= TOGGLE PUBLISH =================
  const togglePublish = async () => {
    try {
      const { data } = await axios.post(`/api/blog/toggle-published/${blog._id}`);

      if (data.success) {
        toast.success(data.message);
        
        if (fetchBlogs) await fetchBlogs();
        if (fetchDashboardData) await fetchDashboardData();// refresh list
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 cursor-pointer transition-all">
      <td className="py-4 px-2">{index + 1}</td>
      <td className="py-4 px-2">{title}</td>
      <td className="py-2 px-2 max:sm:hidden">{BlogDate.toDateString()}</td>
      <td className="py-2 px-2 max:sm:hidden">
        <span
          className={`${blog.isPublished ? "text-green-600" : "text-red-600"}`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>
      <td className="py-4 px-2">
        <div className="flex gap-3 items-center">
          <button
            onClick={togglePublish}
            className="cursor-pointer border px-2 py-1 mt-1 rounded "
          >
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>
          <img
            src={assets.cross_icon}
            onClick={deleteBlog}
            alt="Delete Icon"
            className="w-8 h-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default BlogtableItem;
