import express from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/product", getProduct);

router.post("/createproduct", addProduct);

router.put("/updateproduct", updateProduct);

router.delete("/deleteproduct", deleteProduct);

export default router;
