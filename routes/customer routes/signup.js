import express from 'express';
import {Customer,generateCustomerToken} from '../../module/customer.js';
import bcrypt from 'bcrypt';

const router =express.Router();

router.post("/",async(request,response)=>{
    try {

        let customer = await Customer.findOne({email : request.body.email})
        if(customer) return response.status(409).json({message:"Email already exist"})
        
        // generate password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password,salt)

        // new password
        customer= await new Customer({
            name : request.body.name,
            email : request.body.email,
            password : hashedPassword
        }).save();

        const headertoken = generateCustomerToken(customer._id);
        response.status(201).json({message : "succefully signed up",headertoken})


    } catch (error) {
        console.log("signup error",error)
        response.status(500).json({
            message :"Internal server error",
            Error : error
    })
    }
})

export const customerSignupRouter = router;