import Order from "../models/OrderModel.js";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/customErrors.js";
import mongoose from "mongoose";

// CREATE PRODUCT
export const createOrder = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const order = await Order.create(req.body);
  res.status(StatusCodes.CREATED).json({ order });
};

export const getAllOrder = async (req, res) => {
  const { sort } = req.query;
  const queryObject = {};

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
  };
  const sortKey = sortOptions[sort] || sortOptions.ascending;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const order = await Order.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalOrders = await Order.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalOrders / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalOrders, numOfPages, currentPage: page, order });
};

export const getOneOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  res.status(StatusCodes.OK).json({ order });
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  console.log(order.status);
  console.log(req.user);
  if (order.status === "approved" && req.user.role === "admin") {
    const removedOrder = await Order.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ order: removedOrder });
  } else if (order.status === "pending") {
    const removedOrder = await Order.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ order: removedOrder });
  } else {
    throw new UnauthenticatedError("Apologies, you are not allowed.");
  }
};

export const editOrder = async (req, res) => {
  const { id } = req.params;

  const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ order: updatedOrder });
};

export const changeOrderStatus = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (req.user.role === "admin" && order.status === "pending") {
    order.status = "approved";
  } else if (req.user.role === "admin" && order.status === "approved") {
    order.status = "pending";
  } else {
    throw new UnauthenticatedError("Apologies, you are not allowed.");
  }

  const updatedOrder = await Order.findByIdAndUpdate(id, order, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ order: updatedOrder });
};
