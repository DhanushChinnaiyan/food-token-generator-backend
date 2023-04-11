import express from "express";
import Cart from "../../module/addtocart.js";
import { FoodDetails } from "../../module/food.js";

const router = express.Router();

// get cart detail
router.get("/", async (request, response) => {
  try {
    console.log(request.customer._id)
    const cart = await Cart.find({customerId:request.customer._id});
    console.log(cart)
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

// post cart
router.post("/add/:id", async (request, response) => {
  try {
    const foods = await FoodDetails.findById(request.params.id);
    if (!foods) {
      return response.status(400).json({ message: "Couldn't fetch food data" });
    }

    const postDate = new Date().toJSON().slice(0, 10);
    const cart = await new Cart({
      customerId: request.customer._id,
      foodImage:foods.foodImage,
      foodName: foods.foodName,
      foodCount: 1,
      foodPrice: foods.foodPrice,
      totalFoodPrice:foods.foodPrice,
      AddedToCartDate: postDate,
    }).save();
    if (!cart) {
      return response.status(400).json({ message: "Error posting your food" });
    }
    response.status(200).json(cart);
  } catch (error) {
    console.log("add cart error", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
});

// Edit cart details
router.put("/edit/:id", async (request, response) => {
  try {

     const foodPricedetail = await Cart.findById(request.params.id)
   
     const updatedcart = await Cart.findByIdAndUpdate(
      { _id: request.params.id },
      { $set: {
        foodCount:request.body.foodCount,
        totalFoodPrice:request.body.foodCount*foodPricedetail.foodPrice
      } },
      { new: true }
    );
    if (!updatedcart) {
      return response
        .status(400)
        .json({ message: "Error updating cart details" });
    }

    response.status(200).json({ message: "Cart details updated successfully" });
  } catch (error) {
    console.log("edit cart error", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
});

// delete cart

router.delete("/delete/:id", async (request, response) => {
  try {
    const deleteCart = await Cart.findByIdAndDelete({
      _id: request.params.id,
    });

    if (!deleteCart) {
      return response.status(400).json({ message: "Error deleting cart" });
    }
    response.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.log("delete cart error", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
});

export const customerCartRouter = router;
