import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const customerSchema = new mongoose.Schema(
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

const generateCustomerToken = (id) =>{
    return jwt.sign({id},"2e6a98abb5b23339ad")
}

const Customer = mongoose.model("customer",customerSchema)

export {generateCustomerToken,Customer}