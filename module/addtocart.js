import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema

const cartschema = new mongoose.Schema(
    {
        foodImage:{
            type:String,
            required:true
        },
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
        totalFoodPrice:{
            type:Number,
            required:true
        },
        customerId:{
            type:ObjectId,
            ref:"customer"
        },
        foodId:{
            type:ObjectId,
            ref:"food"
        },
        AddedToCartDate:{
            type:String,
            required:true
        }

    }
)

const Cart =mongoose.model("cart",cartschema)
export default Cart