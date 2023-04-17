import express from 'express';
import Profit from '../../module/ownerprofit.js';
import Token from '../../module/token.js';


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

// post profits
router.post("/:id",async(request,response)=>{
    try {
      const postDate = new Date().toJSON().slice(0, 10);
      const foodDetail = await Token.findById(request.params.id)
      if(!foodDetail){
        return response.status(400).json({message:"Error posting your food"})
    }
       const food = await new Profit(
        {   foodId:request.params.id,
            foodName:foodDetail.foodName,
            foodPrice:foodDetail.foodPrice,
            customerId:request.customer._id,
            foodCount:foodDetail.foodCount,
            deliveredDate:postDate
        }
       ).save()
if(!food){
    return response.status(400).json({message:"Error posting your food"})
}
response.status(200).json(food)
        
    } catch (error) {
        console.log("add food error", error);
        response.status(500).json({
          message: "Internal server error",
        });
    }
})



export const profitGetRouter = router;
