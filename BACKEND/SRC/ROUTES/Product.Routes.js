import express from "express";
const router = express.Router();

// GET ALL PRODUCTS
router.get("/products", (req, res) => {
  res.send("Hello World!");
});

// GET SINGLE PRODUCT
router.get("/products/:id", (req, res) => {
  res.send("Hello World!");
});


// CREATE PRODUCT
router.post("/products", (req, res) => {
  res.send("Hello World!");
});

// UPDATE PRODUCT
router.put("/products/:id", (req, res) => {
  res.send("Hello World!");
});

// DELETE PRODUCT
router.delete("/products/:id", (req, res) => {
  res.send("Hello World!");
});




export default router;