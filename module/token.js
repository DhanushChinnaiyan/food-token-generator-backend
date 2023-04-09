import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema



const tokenschema = new mongoose.Schema(
    {
        foodImage:{
            type:String,
            required:true
        },
        foodName:{
            type:String,
            required:true
        },
        foodToken:{
            type:String,
            required:true
        },
        customerId:{
            type:ObjectId,
            ref:"customer"
        },
        customerName:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        }
    }
)

const Token = mongoose.model("token",tokenschema)
export default Token;