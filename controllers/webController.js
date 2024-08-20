import { StatusCodes } from "http-status-codes";
import WebProduct from "../models/WebModel.js";

export const getAllWebItems = async (req, res) => {
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
  };
  const sortKey = sortOptions[sort] || sortOptions.ascending;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  const item = await WebProduct.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalItems = await WebProduct.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalItems / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalItems, numOfPages, currentPage: page, item });
};

export const createWebItem = async (req, res) => {
  const { products, description, title, group, categoria_l0, categoria_l1 } =
    req.body;
  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ error: "Products array is required and cannot be empty" });
  }
  const newItem = await WebProduct.create({
    products,
    description,
    title,
    group,
    categoria_l0,
    categoria_l1,
  });

  res.status(StatusCodes.CREATED).json({ item: newItem });
};

export const getWebItem = async (req, res) => {
  const { id } = req.params;
  const item = await WebProduct.findById(id);
  res.status(StatusCodes.OK).json({ item });
};
