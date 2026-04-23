import React, { useState, useRef, useEffect } from "react";
import { assets, blogCategories } from "../../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("startup");
  const [isPublished, setIsPublished] = useState(false);

  // ✅ FIXED: async + await
  const generateContent = async (e) => {
    e.preventDefault(); // ✅ stop form submit when clicked

    if (!title) return toast.error("Please enter a title to generate content");

    try {
      setLoading(true);

      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle: subtitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);

        // ✅ reset form properly
        setImage(false);
        setTitle("");
        setSubtitle("");
        setCategory("startup");
        setIsPublished(false);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write blog content here...",
      });
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white shadow rounded w-full p-4 max-w-3xl md:p-10 sm:m-10 mx-auto mt-5">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            className="hidden"
            hidden
            required
          />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full max-w-lg border-gray-300 outline-none p-2 border rounded mt-2 mb-4"
          placeholder="Enter blog title"
          required
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef} className="h-full" />
          {loading && (
            <div className="absolute right-0 top-0 left-0 bottom-0 bg-black/10 mt-2 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-white"></div>
              <p className="text-gray-700">Generating content...</p>
            </div>
          )}

          {/* ✅ FIXED: prevent form submit */}
          <button
            type="button"
            disabled={loading}
            onClick={generateContent}
            className="absolute bottom-1 ml-2 text-sm bg-black/70 text-white px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        <p className="mb-2 mt-1">Blog Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full max-w-xs border-gray-300 outline-none p-2 border rounded mb-4"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 mb-4">
          <input
            onChange={(e) => setIsPublished(e.target.checked)}
            type="checkbox"
            checked={isPublished}
            id="publish"
            className="h-4 w-4 accent-primary cursor-pointer"
          />
          <label htmlFor="publish">Publish immediately</label>
        </div>

        {/* ✅ FIXED: disabled typo */}
        <button
          type="submit"
          disabled={isAdding}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80 cursor-pointer hover:scale-105 transition-all"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
