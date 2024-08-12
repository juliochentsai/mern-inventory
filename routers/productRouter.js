import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProduct,
} from "../controllers/productController.js";
import {
  validateProductInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(validateProductInput, upload.single("imageUrl"), createProduct);
router
  .route("/:id")
  .get(validateIdParam, getProduct)
  .patch(validateIdParam, upload.single("imageUrl"), editProduct)
  .delete(validateIdParam, deleteProduct);

export default router;
