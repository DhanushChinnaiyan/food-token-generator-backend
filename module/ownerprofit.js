import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

const profiteSchema = new mongoose.Schema(
    {
        foodId:{
           type:ObjectId,
           ref:"food"
        },
        foodName:{
            type:String,
            required:true
        },
        foodPrice:{
            type:Number,
            required:true
        },
        customerId:{
            type:ObjectId,
            ref:"customer"
        },
        foodCount:{
            type:Number,
            required:true
        },
        deliveredDate:{
            type:String,
            required:true
        }
    }
)

const Profit = mongoose.model("profit",profiteSchema)
export default Profit;