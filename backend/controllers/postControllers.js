import { uploadPricture } from "../middleware/uploadPictureMiddleware.js";
import Comment from "../models/Comment.js"
import Post from "../models/Post.js";
import { fileRemover } from "../utils/fileRemover.js";
import {v4 as uuidv4} from "uuid";


export const createPost = async ( req,res, next) => {
    try {
            const {title,caption,photo} = req.body
         const posts = new Post({
            title: title,
            caption:caption,
            slug: uuidv4(),
            body:{
                type:"doc",
                content:[],
            },
            photo:photo,
            user:req.user._id,

         })
         const createdPost = await posts.save();
         return res.json(createdPost);
    } catch (error) {
        next(error);
    }
}

export const updatePost = async ( req,res, next) => {
    try {
         const posts = await Post.findOne({slug: req.params.slug})
         if(!posts){
            const error = new Error("Post was not found");
            next(error);
            return;
        }
        const upload = uploadPricture.single("postPicture");
        const handleUpdatePostData = async (data) => {
            const {title,caption,slug,body, tags, categories} = JSON.parse(data);
            posts.title = title || posts.title;
            posts.caption = caption || posts.caption;
            posts.slug = slug || posts.slug;
            posts.body = body || posts.body;
            posts.tags = tags || posts.tags;
            posts.categories = categories || posts.categories;

            const updatedPost = await posts.save();
            return res.json(updatedPost);
        }
        upload(req,res,async function (err) {
            if(err){
                const error = new Error("An unknown error occured when uploading " + err.message);
                next(error);
            }else{
                    if(req.file){
                        let filename;
                        filename = posts.photo;
                        if(filename){
                            fileRemover(filename)
                        }
                        posts.photo = req.file.filename;
                        handleUpdatePostData(req.body.document);
                }else{
                    let filname;
                    filname = posts.photo;
                    posts.photo = "";
                    fileRemover(filname);
                    handleUpdatePostData(req.body.document);
                }
            }
        })

    } catch (error) {
        next(error);
    }
}

export const deletePost = async(req,res,next) => {
    try {
        const post = await Post.findOneAndDelete({slug: req.params.slug});

        if(!post){
            const error = new Error("Post was not found");
            next(error);
            return;
        }
        await Comment.deleteMany({post: post._id});
        return res.json({
            message : "Post is Successfully deleted"
        })
    } catch (error) {
        next(error)
    }
}

export const getPost = async (req,res,next) => {
    try {
        const post = await Post.findOne({slug:req.params.slug}).populate([
            {
                path: "user",
                select:["avatar","name"],
            },
            {
                path:"Comments",
                match:{
                    check:true,
                    parent:null,
                },
                populate:[
                    {
                        path:"user",
                        select:[
                            'avatar','name'
                        ],
                    },
                    {
                        path:'replies',
                        match:{
                            check:true,
                        }
                    }
                ]
            }
        ]);
        if(!post){
            const error = new Error("Post not found");
            return res(error);
        }
        return res.json(post)
    } catch (error) {
        next(error)
    }
}

export const getAllPosts = async (req,res,next) => {
    try {
        const post = await Post.find({}).populate([
            {
                path:"user",
                select:["avatar","name","verified"],
            }
        ])
        res.json(post)
    } catch (error) {
        next(error)
    }
}