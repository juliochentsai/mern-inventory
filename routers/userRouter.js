import { Router } from "express";
import { getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUserInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.post("/update-user", validateUserInput, updateUser);

export default router;
