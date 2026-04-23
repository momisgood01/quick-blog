import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import Comment from "../Models/Comment.js";


// ================== ADMIN LOGIN ==================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      token,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================== GET ALL BLOGS ==================
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      blogs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================== GET ALL COMMENTS ==================
export const getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comments,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================== DASHBOARD ==================
export const getDashboard = async (req, res) => {
  try {

    const recentBlogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const draft = await Blog.countDocuments({ isPublished: false });

    return res.status(200).json({
      success: true,
      dashboard: {
        blogs,
        comments,
        draft,
        recentBlogs,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================== DELETE COMMENT ==================
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID",
      });
    }

    await Comment.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Comment successfully deleted",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================== APPROVE COMMENT ==================
export const approveComment = async (req, res) => {
  try {
    const { id } = req.params;

    // validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID",
      });
    }

    await Comment.findByIdAndUpdate(id, { isApproved: true });

    return res.status(200).json({
      success: true,
      message: "Comment successfully approved",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};