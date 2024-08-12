import Product from "../models/ProductModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";
// GET ALL
export const getAllProducts = async (req, res) => {
  const { search, categoria_l0, sort } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.$or = [{ descripcion: { $regex: search, $options: "i" } }];
  }
  if (categoria_l0 && categoria_l0 !== "all") {
    queryObject.categoria_l0 = categoria_l0;
  }
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    ascending: "descripcion",
    descending: "-descripcion",
  };
  const sortKey = sortOptions[sort] || sortOptions.ascending;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  const products = await Product.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalJobs = await Product.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, products });
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);

    req.body.imageUrl = response.secure_url;
    req.body.imageId = response.public_id;
  }
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

// GET ONE PRODUCT
export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(StatusCodes.OK).json({ product });
};

// EDIT PRODUCT
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const newProduct = { ...req.body };

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);

    newProduct.imageUrl = response.secure_url;
    newProduct.imageId = response.public_id;
    if (req.body.imageId) {
      await cloudinary.v2.uploader.destroy(req.body.imageId);
    }
  }
  const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ product: updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const removedProduct = await Product.findByIdAndDelete(id);

  if (removedProduct.imageId) {
    await cloudinary.v2.uploader.destroy(removedProduct.imageId);
  }

  res.status(StatusCodes.OK).json({ product: removedProduct });
};
