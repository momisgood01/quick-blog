import express from "express";
import { adminLogin, approveComment, deleteCommentById, getAllBlogsAdmin, getAllCommentsAdmin, getDashboard } from "../Controllers/adminControllers.js";
import auth from "../Middleware/auth.js";

const AdminRouter = express.Router();

AdminRouter.post("/login", adminLogin);
AdminRouter.get("/comments", auth, getAllCommentsAdmin);
AdminRouter.get("/blogs", auth, getAllBlogsAdmin);
AdminRouter.post("/delete-comment/:id", auth, deleteCommentById);
AdminRouter.post("/approve-comment/:id", auth, approveComment);
AdminRouter.get("/dashboard", auth, getDashboard);




export default AdminRouter;