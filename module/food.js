
import mongoose from "mongoose";


const foodSchema = new mongoose.Schema(

    {
        foodCategory : {
            type : String,
            required :true
        },
        foodName : {
            type : String,
            required :true
        },
        foodImage : {
            type : String,
            required :true
        },
        foodPrice : {
            type : Number,
            required :true
        },
        foodAddedDate : {
            type : String,
            required :true
        }

    }
)

export const FoodDetails = mongoose.model("food",foodSchema)