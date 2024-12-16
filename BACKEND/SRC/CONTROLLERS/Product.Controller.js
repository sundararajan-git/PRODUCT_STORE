import Product from "../MODELS/Product.Model.js";

// GET ALL PROUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error(err.messages);
    res.status(404).json({ success: false, message: err.messages });
  }
};

// GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id is required" });
    }

    const product = await Product.findById(id);

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.messages });
  }
};

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    if (!name || !price || !description || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const product = await Product.create(req.body);

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.messages });
  }
};

// UPDATE  PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, id } = req.body;

    if (!name || !price || !description || !image || !id) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.messages });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id is required" });
    }

    const product = await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.messages });
  }
};
