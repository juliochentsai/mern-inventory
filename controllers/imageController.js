import Image from "../models/ImageModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";

export const getAllImages = async (req, res) => {
  const { search, sort } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.$or = [{ imageName: { $regex: search, $options: "i" } }];
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
  };
  const sortKey = sortOptions[sort] || sortOptions.ascending;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  const images = await Image.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalImages = await Image.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalImages / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalImages, numOfPages, currentPage: page, images });
};

export const createImage = async (req, res) => {
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    req.body.imageUrl = response.secure_url;
    req.body.imageId = response.public_id;
  }
  const image = await Image.create(req.body);

  res.status(StatusCodes.CREATED).json({ image });
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;
  const removedImage = await Image.findByIdAndDelete(id);
  if (removedImage.imageId) {
    await cloudinary.v2.uploader.destroy(removedImage.imageId);
  }
  res.status(StatusCodes.OK).json({ image: removedImage });
};
