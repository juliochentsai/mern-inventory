import { Router } from "express";
import {
  createImage,
  getAllImages,
  deleteImage,
} from "../controllers/imageController.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();

router
  .route("/")
  .get(getAllImages)
  .post(upload.single("imageUrl"), createImage);

router.route("/:id").delete(deleteImage);
export default router;
