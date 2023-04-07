import express from "express";
import bcrypt from "bcrypt";
import { Customer } from "../../module/customer.js";

const router = express.Router();

router.put("/", async (request, response) => {
  try {
    // password generation
    const salt =await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password,salt)
    const forgotpassword = await Customer.findOneAndUpdate(
      { email: request.body.email },
      { $set: {
        password:hashedPassword
      } },
      { new: true }
    )
    if (!forgotpassword) {
      return response.status(400).json({ message: "Error updating data" });
    }

    response
      .status(200)
      .json({ message: "Your password successfully changed" });
  } catch (error) {
    console.log("Forgot error", error);
    response.status(500).json({
      message: "Internal server error",
      Error: error,
    });
  }
});

export const forgotCustomerRouter = router;