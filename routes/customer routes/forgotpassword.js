import express from "express";
import { Customer, generateCustomerToken } from "../../module/customer.js";
import { OTP } from "../../module/OTPforForgotPassword.js";
import OTPGenerator from "../EmailAndOTP/OTPString.js";
import mail from "../EmailAndOTP/emailscript.js";
import bcrypt from 'bcrypt'

const router = express.Router();

// email verification and otp genaration process:
router.post("/", async (request, response) => {
  try {
    // email verification
    const user = await Customer.findOne({ email: request.body.email });
    if (!user) return response.status(400).json({ message: "User not found" });
    // generating otp
    const OTPstring = OTPGenerator(6);
    // Stores the otp in the database
    await new OTP({
      email: request.body.email,
      OTP: OTPstring,
    }).save();

    // Path String
    const pathToken = generateCustomerToken(user._id)

    // Sends OTP to user email
    mail(OTPstring, request.body.email);

    response.status(200).json({ message: "Email sent successfully" ,path:pathToken });
  } catch (error) {
    console.log("Email verification error", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
});

 
// OTP verification process
router.post("/otp",async(request,response)=>{
  try {  
    
    // Validates the OTP if the user is correct
    const userOTP = await OTP.findOne({email:request.body.email,OTP:request.body.OTP})
    if(!userOTP)return response.status(400).json({message:"Invalid OTP"})

    // Path String
    const pathToken = generateCustomerToken(userOTP._id)

    response.status(200).json({message:"You can reset your password now",path:pathToken})
    
  } catch (error) {
    console.log("OTP verification error", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
})

// changing password
router.put("/newpassword",async(request,response)=>{
  try {

    // generating hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(request.body.password,salt)
    const newpassword = await Customer.findOneAndUpdate(
      {email:request.body.email},
      {$set:{
        password:hashedPassword
      }},
      {new:true}
    )

    if(!newpassword)return response.status(400).json({message:"Wrong user"})
    response.status(200).json({message:"Successfully your password changed"})
    
  } catch (error) {
    console.log("Password changing error", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
})

export const forgotCustomerRouter = router;
