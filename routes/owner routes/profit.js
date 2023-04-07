import express from 'express';
import Profit from '../../module/ownerprofit.js';


const router = express.Router();


// get profits detail
router.get("/",async(request,response)=>{
    try {

        const profits = await Profit.find()
        if(!profits){
            return response.status(400).json({message:"Couldn't fetch food data"})
        }

        response.status(200).json(profits)
        
    } catch (error) {
        console.log("food get error", error);
    response.status(500).json({
      message: "Internal server error",
    });
    }
})


export const profitGetRouter = router;
