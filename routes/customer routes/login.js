import express from 'express';
import bcrypt from 'bcrypt';
import { generateCustomerToken,Customer } from '../../module/customer.js';

const router = express.Router();


router.post("/",async(request,response)=>{
    try {
        const customer = await Customer.findOne({email: request.body.email});
        if(!customer){
            return response.status(400).json({message:"Invalid Email or Password"})
        }

        const validatePassword = await bcrypt.compare(
            request.body.password,
            customer.password
        )

        if(!validatePassword){
            return response.status(400).json({message:"Invalid Email or Password"})
        }

        const customerToken = generateCustomerToken(customer._id)
       
        response.status(200).json({message:"Loged in successfully",customerToken,customerName:customer.name})
        
    } catch (error) {
        console.log("Login error",error)
        response.status(500).json({
            message :"Internal server error",
            Error : error
    })
    }
})

export const customerLoginRouter =router;