import express from "express";
import Cart from "../../module/addtocart.js";

const router = express.Router();

// get cart detail
router.get("/", async (request, response) => {
  try {
    const cart = await Cart.find();
    if (!cart) {
      return response.status(400).json({ message: "Couldn't fetch food data" });
    }

    response.status(200).json(cart);
  } catch (error) {
    console.log("cart get error", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
});

export const ownerCartRouter = router;