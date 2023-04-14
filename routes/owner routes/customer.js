import express from 'express';
import { Customer } from '../../module/customer';



const router = express.Router();


router.get("/",async(request,response)=>{

    try {
        const customer =await Customer.find()
    if(!customer){
        return response.status(400).json({message :" Customers Not Avalilable"})
    }
    response.status(200).json(customer)
    } catch (error) {
        return response.status(500).json({message:"Internal server error"})
    }
})


export const customergetRouter = router