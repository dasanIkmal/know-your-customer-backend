import { Router } from "express";
import { KycController } from "../controllers/kyc.controller";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();

const kycController = new KycController();

router.get("/getKyc", authenticate, kycController.getAllKyc);
router.put("/approve/:id/:name", authenticate, kycController.approveKyc);
router.put("/reject/:id", authenticate, kycController.rejectKyc);
router.get("/stats", authenticate, kycController.getStats);
router.get("/allUsers", authenticate, kycController.getAllUsers);

export default router;
