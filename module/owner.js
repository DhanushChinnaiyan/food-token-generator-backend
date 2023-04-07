import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const ownerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            maxlength:32,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        }
    }
)

const generateOwnerToken = (id) =>{
    return jwt.sign({id},"2e6a98abb5b23339ad")
}

const Owner = mongoose.model("owner",ownerSchema)

export {generateOwnerToken,Owner}