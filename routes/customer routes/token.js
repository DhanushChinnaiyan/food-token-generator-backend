import express from 'express';
import Token from '../../module/token.js';
import Cart from '../../module/addtocart.js';


const router = express.Router();

// get token;

router.get("/",async(request,response)=>{
  try {
    const token = await Token.find({customerId:request.customer._id})

    if(!token){
     return response.status(400).json({message:"Error fething token data"})
    }
    response.status(200).json(token)
  } catch (error) {
    console.log("tkoen get error ",error)
    response.status(500).json({message:"Internal server error"})
  }
})


// post token;

router.post("/add/:id",async(request,response)=>{
    try {
        const foodDetail = await Cart.findById(request.params.id);
        
        
        const addToken = await new Token(
            {
              foodImage:foodDetail.foodImage,  
              foodName:foodDetail.foodName,
              foodToken:foodDetail.foodName.split(" ").join("")+request.customer.name.toLowerCase()+request.customer._id,
              customerId:request.customer._id,
              customerName:request.customer.name,
              date:Date.now()
            }
        ).save()

        if(!addToken){
            return response.status(400).json({message:"Error Adding Token Data"})
        }
        response.status(200).json(addToken)
        
    } catch (error) {
        console.log("Add token error ",error)
        response.status(500).json({message:"Internal server error"})
    }
})


// delete token;

router.delete("/:id",async(request,response)=>{
    try {
        const deleteToken = await Token.findByIdAndDelete({_id:request.params.id});
        if(!deleteToken){
            return response.status(400).json({message:"Error deleting token"})
        }
        response.status(200).json({message:"Token deleted successfully"})
        
    } catch (error) {
        console.log("deleting oken error ",error)
        response.status(500).json({message:"Internal Server Error"})
    }
})


export const customertokenRouter = router;