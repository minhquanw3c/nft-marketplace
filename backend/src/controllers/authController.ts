import { Request, Response } from "express";
import { verifyMessage } from "ethers";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient";

const NONCE_EXPIRY = 5 * 60 * 1000; // 5 minutes

// Step 1: Generate a login message
export const getLoginMessage = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { address } = req.body;

	if (!address) {
		return res.status(400).json({ error: "Wallet address is required" });
	}

	const nonce = Math.floor(Math.random() * 1000000);
	const message = `Sign this message to log in. Nonce: ${nonce}`;

	// Store nonce in DB with expiry
	await prisma.user.upsert({
		where: { wallet: address },
		update: { updatedAt: new Date() },
		create: { wallet: address },
	});

	return res.json({ message });
};

// Step 2: Verify signature & generate JWT
export const verifySignature = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { address, signature, message } = req.body;

	if (!address || !signature || !message) {
		return res.status(400).json({ error: "Missing parameters" });
	}

	try {
		const recoveredAddress = verifyMessage(message, signature);

		if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
			return res.status(401).json({ error: "Invalid signature" });
		}

		// Generate JWT Token
		const token = jwt.sign({ address }, process.env.JWT_SECRET as string, {
			expiresIn: "1h",
		});

		res.json({ token });
	} catch (error) {
		res.status(500).json({ error: "Verification failed" });
	}
};
