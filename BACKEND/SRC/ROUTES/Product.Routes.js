import express from "express";
const router = express.Router();
import { getProducts, getProduct , addProduct , updateProduct, deleteProduct}  from "../controllers/productController";

// GET ALL PRODUCTS
router.get("/products", getProducts );

// GET SINGLE PRODUCT
router.get("/products/:id", getProduct);

// CREATE PRODUCT
router.post("/products", addProduct)

// UPDATE PRODUCT
router.put("/products/:id", updateProduct );

// DELETE PRODUCT
router.delete("/products/:id", deleteProduct )


export default router;