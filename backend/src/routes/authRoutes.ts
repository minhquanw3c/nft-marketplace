import express from "express";
import {
	getLoginMessage,
	verifySignature,
} from "../controllers/authController";

const router = express.Router();

router.post("/message", getLoginMessage);
router.post("/verify", verifySignature);

export default router;
