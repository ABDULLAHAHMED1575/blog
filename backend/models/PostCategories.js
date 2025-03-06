import { Schema,model } from "mongoose";

const postCategoriesSchema = new Schema({
    name:{type:String,required:true}
}, {timestamps:true});

const postCategories = model("postCategories",postCategoriesSchema);

export default postCategories;