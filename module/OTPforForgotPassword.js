import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,  
        },
        OTP:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            default:Date.now,
            expires:300
        }
    }
)

export const OTP = mongoose.model("otps",OTPSchema)