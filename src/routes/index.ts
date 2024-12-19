import { Router } from "express";

// import authRoutes from "./auth.router";
import userRoutes from "./user.router";
import authRoutes from "./auth.router";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;
