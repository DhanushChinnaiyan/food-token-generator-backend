import express from "express";
import bcrypt from "bcrypt";
import { Owner } from "../../module/owner.js";

const router = express.Router();

router.put("/", async (request, response) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const forgotpassword = await Owner.findOneAndUpdate(
      { email: request.body.email },
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );
    if (!forgotpassword) {
      return response.status(400).json({ message: "Error uploding data" });
    }

    response
      .status(200)
      .json({ message: "Your password successfully changed" });
  } catch (error) {
    console.log("forgot error", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
});

export const forgotOwnerRouter = router;