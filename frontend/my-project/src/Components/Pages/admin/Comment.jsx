import React from "react";
import { useState } from "react";
import { comments_data } from "../../../assets/assets";
import { useEffect } from "react";
import CommentTableItem from "../../admin/CommentTableItem";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
const Comment = () => {
  const [comment, setComment] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const { axios } = useAppContext();

  const fetchComment = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComment(data.comments) : toast.error(data.message); 
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comment</h1>
        <div className="flex gap-4">
          <button
            className={
              filter === "Approved"
                ? "text-primary border shadow-custom-sm text-xs px-4 py-1 rounded-full"
                : "text-gray-700 border shadow-custom-sm text-xs px-4 py-1 rounded-full"
            }
            onClick={() => setFilter("Approved")}
          >
            Approved
          </button>

          <button
            className={
              filter === "Not Approved"
                ? "text-primary border shadow-custom-sm text-xs px-4 py-1 rounded-full"
                : "text-gray-700 border shadow-custom-sm text-xs px-4 py-1 rounded-full"
            }
            onClick={() => setFilter("Not Approved")}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl overflow-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
       <table className="w-full text-sm text-gray-500">
          <thead className="text-gray-700 text-xs text-left uppercase font-light border-b">
            <tr>
              <th scope="col" className="px-6 py-3">Blog Title Comment</th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {comment.filter((comment)=>{
              if(filter === "Approved") return comment.isApproved === true
              else return comment.isApproved === false
            })
            .map((comment, index) => (
              <CommentTableItem key={comment._id}
               comment={comment} index={index + 1} fetchComments={fetchComment} />
            ))}
          </tbody>
       </table>

      </div>
    </div>
  );
};

export default Comment;
