import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct); // <-- NOVO

export default router;
