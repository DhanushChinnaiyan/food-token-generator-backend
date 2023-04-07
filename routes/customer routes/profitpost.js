import express from 'express';
import Profit from '../../module/ownerprofit.js';
import Cart from '../../module/addtocart.js';


const router = express.Router();

// post profits
router.post("/:id",async(request,response)=>{
    try {
      const postDate = new Date().toJSON().slice(0, 10);
      const foodDetail = await Cart.findById(request.params.id)
      if(!foodDetail){
        return response.status(400).json({message:"Error posting your food"})
    }
       const food = await new Profit(
        {   cartId:request.params.id,
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

export const profitPostRouter = router;
