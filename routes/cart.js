import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/add", addToCart);
router.delete("/remove/:userId/:productId", removeFromCart);

export default router;
