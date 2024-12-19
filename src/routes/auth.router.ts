import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
const router = Router();

const authRouter = new AuthController();

router.post("/login", authRouter.userLogin);

export default router;
