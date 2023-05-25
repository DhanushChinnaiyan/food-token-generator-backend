import express from 'express';
import bcrypt from 'bcrypt';
import { generateOwnerToken,Owner } from '../../module/owner.js';
import { ObjectId } from 'mongoose';


const router = express.Router();

router.post("/",async(request,response)=>{
    try {

        const ownerId = '642bca5b39513e9346a0b412';
        const owner = await Owner.findOne({email:request.body.email})
     
        const originalOwner = await Owner.findById(ownerId)

        if(!owner){
            return response.status(400).json({message:"you are not the owner"})
        }
     
        if(owner.email !== originalOwner.email){
            return response.status(400).json({message:"you are not the owner"})
        }
       
        const validatePassword = await bcrypt.compare(
            request.body.password,
            owner.password
        )

        if(!validatePassword){
            return response.status(400).json({message:"you are not the owner"})
        }

        const ownerToken = generateOwnerToken(owner._id,"2d");

        response.status(200).json({message:"Loged in successfully",ownerToken,ownerName:owner.name})
        
    } catch (error) {
        console.log("login error",error)
        response.status(500).json({
            message :"Internal server error"
    })
    }
})


export const ownerLoginRouter = router;