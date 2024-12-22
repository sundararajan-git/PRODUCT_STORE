import express from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../CONTROLLERS/productController.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SINGLE PRODUCT
router.get("/product", getProduct);

// CREATE PRODUCT
router.post("/createproduct", addProduct);

// UPDATE PRODUCT
router.put("/updateproduct", updateProduct);

// DELETE PRODUCT
router.delete("/deleteproduct", deleteProduct);

export default router;
