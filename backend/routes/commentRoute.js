import express from 'express';
import { authGuard } from '../middleware/authMiddleware.js';
import { creatComment } from '../controllers/commentController.js';


export const commentRouter = express.Router();
commentRouter.post("/",authGuard,creatComment);
