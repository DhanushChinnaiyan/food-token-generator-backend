import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema

const cartschema = new mongoose.Schema(
    {
        foodName:{
            type:String,
            required:true
        },
        foodCount:{
            type:Number,
            required:true
        },
        foodPrice :{
            type:Number,
            required:true
        },
        customerId:{
            type:ObjectId,
            ref:"customer"
        },
        AddedToCartDate:{
            type:String,
            required:true
        }

    }
)

const Cart =mongoose.model("cart",cartschema)
export default Cart