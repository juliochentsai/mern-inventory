import { Router } from "express";
import {
  createWebItem,
  getWebItem,
  getAllWebItems,
} from "../controllers/webController.js";

const router = Router();

router.route("/").post(createWebItem).get(getAllWebItems);
router.route("/:id").get(getWebItem);

export default router;
