import express from 'express';
import { authGuard } from '../middleware/authMiddleware.js';
import { creatComment, updateComment, deleteComment, getPostComments } from '../controllers/commentController.js';


export const commentRouter = express.Router();
commentRouter.post("/",authGuard,creatComment);
commentRouter.get("/post/:slug",getPostComments);
commentRouter.put("/:commentId",authGuard,updateComment);
commentRouter.delete("/:commentId",authGuard,deleteComment);
