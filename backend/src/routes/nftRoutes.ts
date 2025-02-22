import express from "express";
import { getNFTs } from "../controllers/nftController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/", authenticate, getNFTs);

export default router;
