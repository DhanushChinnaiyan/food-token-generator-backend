import express from 'express';
import { FoodDetails } from '../../module/food.js';


const router = express.Router();





router.get("/food",async(request,response)=>{
    try {

        const foods = await FoodDetails.find()
        if(!foods){
            return response.status(400).json({message:"Couldn't fetch food data"})
        }

        response.status(200).json(foods)
        
    } catch (error) {
        console.log("food get error", error);
    response.status(500).json({
      message: "Internal server error",
    });
    }
})

export const customerRouter = router;