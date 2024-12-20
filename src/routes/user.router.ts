import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";
const router = Router();

const userController = new UserController();

router.post("/register", userController.userSignup);
router.post("/kyc", upload, userController.submitDocuments);
router.get("/getAllKyc/:id", userController.getAllDocuments);

export default router;
