import express from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

// get the router
const router = express.Router();

// get all products
router.get("/", getProducts);

// get single product
router.get("/product", getProduct);

// create product
router.post("/createproduct", addProduct);

// update product
router.put("/updateproduct", updateProduct);

// delete product
router.delete("/deleteproduct", deleteProduct);

export default router;
