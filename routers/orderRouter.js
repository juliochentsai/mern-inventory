import { Router } from "express";
import {
  createOrder,
  getAllOrder,
  getOneOrder,
  editOrder,
  deleteOrder,
  changeOrderStatus,
} from "../controllers/orderController.js";
const router = Router();

router.route("/").get(getAllOrder).post(createOrder);
router.route("/:id").get(getOneOrder).patch(editOrder).delete(deleteOrder);
router.route("/:id/status").patch(changeOrderStatus).delete(deleteOrder);

export default router;
