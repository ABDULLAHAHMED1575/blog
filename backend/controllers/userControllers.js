import { uploadPricture } from "../middleware/uploadPictureMiddleware.js";
import User from "../models/User.js";
import { fileRemover } from "../utils/fileRemover.js";


export const registerUser = async ( req,res, next) => {
    try {
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user) {
            throw new Error("User have already resigter")
        }
        user = await User.create({
            name,
            email,
            password,
        });
        return res.status(200).json({
            _id:user._id,
            avatar:user.avatar,
            name:user.name,
            email:user.email,
            password:user.password,
            verified:user.verified,
            admin:user.admin,
            token:await user.generateJWT(),
        })
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            throw new Error("Email not Found");
        }
        if(await user.comparePassword(password)){
            return res.status(200).json({
                _id:user._id,
                avatar:user.avatar,
                name:user.name,
                email:user.email,
                password:user.password,
                verified:user.verified,
                admin:user.admin,
                token:await user.generateJWT(),
            });
        }else{
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        next(error);
    }
}

export const userProfile = async (req,res,next) => {
    try {
        let user = await User.findById(req.user._id);

        if(user){
            return res.status(200).json({
                _id:user._id,
                avatar:user.avatar,
                name:user.name,
                email:user.email,
                password:user.password,
                verified:user.verified,
                admin:user.admin,
                token:await user.generateJWT(),
            });
        }else{
            let error = new Error("User not found");
            error.statuscode =404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

export const updateProfile = async (req,res,next) => {
    try {
        let user = await User.findById(req.user._id);

        if(!user){
            throw new Error("User not found");
        }
        else{
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if(req.body.password && req.body.password.length < 6){
                throw new Error("password length must be 6 characters")
            }else if(req.body.password){
                user.password = req.body.password;
            }

            const updateUserProfile = await user.save();

            res.json ({
                    _id:updateUserProfile._id,
                    avatar:updateUserProfile.avatar,
                    name:updateUserProfile.name,
                    email:updateUserProfile.email,
                    password:updateUserProfile.password,
                    verified:updateUserProfile.verified,
                    admin:updateUserProfile.admin,
                    token:await updateUserProfile.generateJWT(),
            })

        }
    } catch (error) {
        next(error);
    }
};


export const updateProfilePic = async (req,res,next) => {
    try {
        const upload = uploadPricture.single("profilePicture");
        upload(req,res,async function (err) {
            if(err){
                const error = new Error("An unknown error occured when uploading " + err.message);
                next(error);
            }else{
                    if(req.file){
                        let filename;
                        let updatedUser = await User.findById(req.user._id);
                        filename = updatedUser.avatar;
                        if(filename){
                            fileRemover(filename)
                        }
                        updatedUser.avatar = req.file.filename;
                        await updatedUser.save();
                    res.json ({
                        _id:updatedUser._id,
                        avatar:updatedUser.avatar,
                        name:updatedUser.name,
                        email:updatedUser.email,
                        password:updatedUser.password,
                        verified:updatedUser.verified,
                        admin:updatedUser.admin,
                        token:await updatedUser.generateJWT(),
                    })
                }else{
                    let filname;
                    let updatedUser = await User.findById(req.user._id);
                    filname = updatedUser.avatar;
                    updatedUser.avatar = "";
                    await updatedUser.save();
                    fileRemover(filname);
                    res.json ({
                        _id:updatedUser._id,
                        avatar:updatedUser.avatar,
                        name:updatedUser.name,
                        email:updatedUser.email,
                        password:updatedUser.password,
                        verified:updatedUser.verified,
                        admin:updatedUser.admin,
                        token:await updatedUser.generateJWT(),
                    });
                }
            }
        })
    } catch (error) {
        
    }
}