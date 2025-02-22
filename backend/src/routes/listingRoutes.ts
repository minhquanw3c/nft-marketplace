import express from "express";
import { getListings } from "../controllers/listingController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/", authenticate, getListings);

export default router;
