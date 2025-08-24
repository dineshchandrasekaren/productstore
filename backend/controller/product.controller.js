import mongoose from "mongoose";
import Product from "../model/product.model.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data:products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const products = new Product({ name, price, image });
    await products.save();

    res.status(200).json({ success: true, data:products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, image } = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Product Id" });
  }
  
  try {
    const products = await Product.findByIdAndUpdate(
      id,
      { name, price, image },
      { new: true }
    );

    res.status(200).json({ success: true, data:products });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
