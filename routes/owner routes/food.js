import express from 'express';
import { FoodDetails } from '../../module/food.js';


const router = express.Router();


// get foods detail
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

// post foods
router.post("/addfood",async(request,response)=>{
    try {
      const postDate = new Date().toJSON().slice(0, 10);
       const food = await new FoodDetails(
        {
            foodCategory:request.body.foodCategory,
            foodName:request.body.foodName,
            foodImage:request.body.foodImage,
            foodPrice:request.body.foodPrice,
            foodAddedDate:postDate
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

// Edit food details
router.put("/edit/:id",async(request,response)=>{
    try {
        
        const updatedFood = await FoodDetails.findByIdAndUpdate(
            {_id:request.params.id},
            {$set:request.body},
            {new:true}
        )
if(!updatedFood){
    return response.status(400).json({message:"Error updating food details"})
}

response.status(200).json({message:"Food details updated successfully"})

    } catch (error) {
        console.log("edit food error", error);
        response.status(500).json({
          message: "Internal server error",
        });
    }
})

// delete food

router.delete("/delete/:id",async(request,response)=>{
    try {

        const deletefood = await FoodDetails.findByIdAndDelete(
            {_id:request.params.id}
        )

        if(!deletefood){
            return response.status(400).json({message:"Error deleting food"})
        }
        response.status(200).json({message:"Food deleted successfully"})
        
    } catch (error) {
        console.log("delete food error", error);
        response.status(500).json({
          message: "Internal server error",
        });
    }
})




export const ownerfoodRouter = router;