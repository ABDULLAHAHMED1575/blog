import Comment from "../models/Comment.js"
import Post from "../models/Post.js";

export const creatComment = async(req,res,next) => {
    try {
        const {desc,slug,parent,replyOnUser} = req.body;
        const post = await Post.findOne({slug:slug});
        if(!post){
            const error = new Error("post was not found");
            return res.json(error);
        }
        const newComment = await Comment({
            user:req.user._id,
            desc,
            post:post._id,
            parent,
            replyOnUser,
        })

        const savedComment = await newComment.save();
        return res.json(savedComment);
    } catch (error) {
        next(error)
    }
}

export const updateComment = async(req,res,next) => {
    try {
        const {desc} = req.body;
        const comment = await Comment.findById(req.params.commentId);

        if(!comment){
            const error = new Error("Comment not found");
            error.statusCode = 404;
            return next(error);
        }

        // Check if user is the owner of the comment
        if(comment.user.toString() !== req.user._id.toString()){
            const error = new Error("You are not authorized to update this comment");
            error.statusCode = 403;
            return next(error);
        }

        comment.desc = desc || comment.desc;
        const updatedComment = await comment.save();
        return res.json(updatedComment);
    } catch (error) {
        next(error);
    }
}

export const deleteComment = async(req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if(!comment){
            const error = new Error("Comment not found");
            error.statusCode = 404;
            return next(error);
        }

        // Check if user is the owner of the comment or admin
        if(comment.user.toString() !== req.user._id.toString() && !req.user.admin){
            const error = new Error("You are not authorized to delete this comment");
            error.statusCode = 403;
            return next(error);
        }

        // Delete all replies to this comment
        await Comment.deleteMany({parent: comment._id});

        // Delete the comment itself
        await Comment.findByIdAndDelete(req.params.commentId);

        return res.json({message: "Comment deleted successfully"});
    } catch (error) {
        next(error);
    }
}

export const getPostComments = async(req,res,next) => {
    try {
        const post = await Post.findOne({slug: req.params.slug});

        if(!post){
            const error = new Error("Post not found");
            error.statusCode = 404;
            return next(error);
        }

        const comments = await Comment.find({post: post._id})
            .populate([
                {
                    path: "user",
                    select: ["avatar", "name"]
                },
                {
                    path: "replyOnUser",
                    select: ["name"]
                }
            ])
            .sort({createdAt: -1});

        return res.json(comments);
    } catch (error) {
        next(error);
    }
}