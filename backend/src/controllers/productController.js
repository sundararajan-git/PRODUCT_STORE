import Product from "../models/productModel.js";
import { AppError } from "../utils/appError.js";
import { cloudinary } from "../cloudinary/cloudinary.js";
import fs from "fs";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      throw new AppError("Id is required", 400);
    }
    const product = await Product.findById(id);
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      throw new AppError("All fields are required", 400);
    }

    const fileResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "product_store",
    });

    fs.unlinkSync(req.file.path);

    const createData = {
      name,
      price,
      description,
      image: fileResponse.secure_url,
    };

    const product = await Product.create(createData);
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, id } = req.body;

    if (!name || !price || !description || !id) {
      throw new AppError("All fields are required", 400);
    }

    let fileResponse;

    if (req.file) {
      fileResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "product_store",
      });
      fs.unlinkSync(req.file.path);
    }

    const updateData = {
      id,
      name,
      price,
      description,
    };

    if (fileResponse) {
      updateData["image"] = fileResponse.secure_url;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      throw new AppError("Id is required", 400);
    }
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};
