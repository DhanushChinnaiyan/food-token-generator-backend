import express from 'express';
import bcrypt from 'bcrypt';

import {Owner,generateOwnerToken} from '../../module/owner.js'


const router =express.Router();

router.post("/",async(request,response)=>{
    try {

        let owner = await Owner.findOne({email : request.body.email})
        if(owner) return response.status(409).json({message:"Email already exist"})
        
        // generate password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password,salt)

        // new password
        owner= await new Owner({
            name : request.body.name,
            email : request.body.email,
            password : hashedPassword
        }).save();

        response.status(201).json({message : "succefully signed up"})


    } catch (error) {
        console.log("signup error",error)
        response.status(500).json({
            message :"Internal server error",
            Error : error
    })
    }
})

export const ownerSignupRouter = router;