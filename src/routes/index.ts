import { Router } from "express";

// import authRoutes from "./auth.router";
import userRoutes from "./user.router";
import authRoutes from "./auth.router";
import kycRoutes from "./kyc.router";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/kyc", kycRoutes);

export default router;
