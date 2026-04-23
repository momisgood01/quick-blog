import fs from "fs";
import imagekit from "../config/ImageKiteConfiq.js";
import Blog from "../models/Blog.js";
import Comment from "../Models/Comment.js"
import mongoose from "mongoose";
import main from "../config/geminiApi.js";



// ================== ADD BLOG ==================
export const addBlog = async (req, res) => {
  try {

    const { title, subTitle, description, category } = JSON.parse(req.body.blog)

    const imageFile = req.file;

    console.log("BODY:", req.body);
console.log("FILE:", req.file);


    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // read uploaded file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // upload to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimized url
    const image = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: 1280, height: 600, crop: "limit" },
      ],
    });

    // save blog
    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished: true
    });

    // delete temp file
    //fs.unlinkSync(imageFile.path);

    res.status(200).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    console.error("ADD BLOG ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: error.message,
    });

  }
};



// ================== GET ALL BLOGS ==================
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })

    res.json({
      success: true,
      blogs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
  

// ================== GET BLOG BY ID ==================
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};




// ================== DELETE BLOG ==================
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ================== TOGGLE PUBLISH ==================
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: "Blog status updated",
    });

  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

// ================== ADD COMMENT ==================
export const addComment = async (req, res) => {
  try {
    

    const { blog, name, content } = req.body;
    await Comment.create({
      blog,
      name,
      content,
    });

    res.json({
      success: true,
      message: "Comment added for review",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



// ================== GET BLOG COMMENTS ==================
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      comments,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================== Generate Content ==================

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    const content = await main(prompt + "generate a blog content for this topic in simple text format without any html tags or markdown");

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



