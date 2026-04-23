import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Moment from "moment";
import Footer from "../Footer";
import Loader from "../loader";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // ================= FETCH BLOG =================
  const fetchBlogData = async () => {
    try {
      const {data} = await axios.get(`/api/blog/${id}`);
      data.success
        ? setData(data.blog)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

 // ================= FETCH COMMENTS =================
const fetchComments = async () => {
  try {
    const { data } = await axios.post("/api/blog/comments", {blogId: id});

    if (data.success) {
      setComments(data.comments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  // ================= ADD COMMENT =================
  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/blog/add-comments", {blog: id, name, content});
      if(data.success){
        toast.success(data.message)
        setName("")
        setContent("")
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
    
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    
      fetchBlogData();
      fetchComments();
    
  }, [id]);

  // ================= UI =================
  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt="background"
        className="absolute -top-50 -z-1"
      />

      <Navbar />

      {/* HEADER */}
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("DD/MM/YYYY")}
        </p>

        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto">
          {data.title}
        </h1>

        <h2 className="text-xl font-medium my-5 max-w-lg truncate mx-auto">
          {data.subTitle}
        </h2>

        <p className="inline-block py-1 px-4 rounded-full mb-3 border text-sm border-primary/35 bg-primary/5 font-medium">
          busy brain
        </p>
      </div>

      {/* BLOG CONTENT */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img
          src={data.image}
          className="md:w-full lg:w-[80%] m-auto h-96 rounded-3xl mb-5"
        />

        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="max-w-3xl mx-auto rich-text my-5"
        ></div>
      </div>

      {/* COMMENTS */}
      <div className="mt-14 mb-10 max-w-3xl mx-auto">
        <p className="text-gray-500 font-semibold mb-5 text-sm">
          Comments ({comments.length})
        </p>

        <div className="flex flex-col gap-4">
          {comments.map((item, index) => (
            <div
              key={index}
              className="relative bg-primary/5 rounded w-[75%] border text-gray-600 border-primary/5 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={assets.user_icon}
                  alt="user"
                  className="w-6 rounded-full"
                />
                <p className="font-medium">{item.name}</p>
              </div>

              {/* FIXED: content instead of comment */}
              <p className="text-gray-500 max-w-md ml-8 text-sm">
                {item.content}
              </p>

              <div className="text-xs text-gray-400 mt-2">
                {Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMENT FORM */}
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="font-semibold mb-4">Add a Comment</h2>

        <form
          onSubmit={addComment}
          className="flex items-start flex-col gap-4 max-w-lg"
        >
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your Name"
            required
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Your Comment"
            required
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>

          <button
            type="submit"
            className="self-start my-3 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 cursor-pointer hover:scale-105 transition-all"
          >
            Submit
          </button>
        </form>
      </div>

      {/* SHARE */}
      <div className="mt-10 mb-20 max-w-3xl mx-auto">
        <p className="my-4 font-semibold">Share this article:</p>

        <div className="flex items-center gap-4">
          <img src={assets.facebook_icon} className="w-10" />
          <img src={assets.twitter_icon} className="w-10" />
          <img src={assets.googleplus_icon} className="w-10" />
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
