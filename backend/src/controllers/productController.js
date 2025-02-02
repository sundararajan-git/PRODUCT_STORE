import Product from "../models/productModel.js";

// get all proucts
export const getProducts = async (req, res) => {
  try {
    // find the products
    const products = await Product.find();

    res.status(200).json({ success: true, data: products });

  } catch (err) {
    res.status(404).json({ success: false, message: err.messages });
  }
};

// get single product
export const getProduct = async (req, res) => {
  try {

    // destruture the payload
    const { id } = req.body;

    // valdiate the id
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id is required" });
    }

    // find the product 
    const product = await Product.findById(id);

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.messages });
  }
};

// add product
export const addProduct = async (req, res) => {
  try {

    // destructure the payload
    const { name, price, description, image } = req.body;

    //  vlaidate the req data
    if (!name || !price || !description || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // create the  product
    const product = await Product.create(req.body);

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.messages });
  }
};

// update  product
export const updateProduct = async (req, res) => {
  try {

    // destructure the payload
    const { name, price, description, image, id } = req.body;

    // validate the required data
    if (!name || !price || !description || !image || !id) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // find and update the product
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.messages });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  try {

    // destructure the paylod
    const { id } = req.body;

    // validate the id
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id is required" });
    }

    //  find & delete the product
    const product = await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.messages });
  }
};
