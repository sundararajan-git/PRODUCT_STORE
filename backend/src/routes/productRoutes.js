import express from "express";
import multer from "multer";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/", getProducts);

router.get("/product", getProduct);

router.post("/createproduct", upload.single("file"), addProduct);

router.put("/updateproduct", upload.single("file"), updateProduct);

router.delete("/deleteproduct", deleteProduct);

export default router;
