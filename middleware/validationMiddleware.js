import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { CATEGORIA_L0_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no product")) {
          throw new NotFoundError(errorMessages);
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateProductInput = withValidationErrors([
  body("categoria_l0")
    .isIn(Object.values(CATEGORIA_L0_TYPE))
    .withMessage("invalid level 0"),
  body("categoria_l1").notEmpty().withMessage("categoria_l1 is required"),
  body("codigo")
    .notEmpty()
    .withMessage("codigo is required")
    .custom(async (codigo) => {
      const product = await Product.findOne({ codigo });
      if (product) {
        throw new BadRequestError("codigo already exists");
      }
    }),
  body("descripcion").notEmpty().withMessage("descripcion is required"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoosDB id");
    const product = await Product.findById(value);
    if (!product) throw new NotFoundError(`no product wiht id : ${value}`);
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("name is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("name is required")
    .isEmail()
    .withMessage("invalid email format"),

  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("name is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
]);
