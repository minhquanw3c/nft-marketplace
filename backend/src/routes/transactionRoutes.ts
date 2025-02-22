import express from "express";
import {
	getTransactions,
	purchaseNFT,
} from "../controllers/transactionController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticate, getTransactions);
router.post("/purchase", authenticate, purchaseNFT);

export default router;
