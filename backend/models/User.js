import pkg1 from 'bcryptjs';
import pkg2 from 'jsonwebtoken';
import { Schema,model } from "mongoose";

const {sign} = pkg2;
const { hash,compare } = pkg1;
const userSchema = new Schema({
    avatar:{type:String, default:''},
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    verified:{type:Boolean, default:false},
    verificationCode:{type:String, required:false},
    admin:{type:Boolean, default:false},
}, {timestamps:true});

userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await hash(this.password, 10);
        return next();
    }
    return next();
})

userSchema.methods.generateJWT = async function (params) {
    return await sign({id:this._id}, process.env.JWT_Token, {expiresIn:"30d"})
};

userSchema.methods.comparePassword = async function(enteredPassword){
    return await compare(enteredPassword,this.password);
}

const User = model("User",userSchema);

export default User;