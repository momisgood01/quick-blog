import express from "express";
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish, generateContent } from "../Controllers/blogControllers.js";
import upload from "../Middleware/multer.js";
import auth from "../Middleware/auth.js";



const BlogRouter = express.Router();

BlogRouter.post("/add", auth, upload.single("image"), addBlog);
BlogRouter.get("/all", getAllBlogs);
BlogRouter.get("/:blogId", getBlogById);
BlogRouter.post("/delete/:id", auth, deleteBlogById);
BlogRouter.post("/toggle-published/:id", auth, togglePublish);
BlogRouter.post("/add-comments", addComment);
BlogRouter.post("/comments", getBlogComments);
BlogRouter.post("/generate", auth, generateContent);


export default BlogRouter;