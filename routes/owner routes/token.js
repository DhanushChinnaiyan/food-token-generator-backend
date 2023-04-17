import express from 'express';
import Token from '../../module/token.js';


const router = express.Router();

// get token;

router.get("/",async(request,response)=>{
  try {
    const token = await Token.find()

    if(!token){
     return response.status(400).json({message:"Error fething token data"})
    }
    response.status(200).json(token)
  } catch (error) {
    console.log("tkoen get error ",error)
    response.status(500).json({message:"Internal server error"})
  }
})

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

export const ownerTokenRouter = router;