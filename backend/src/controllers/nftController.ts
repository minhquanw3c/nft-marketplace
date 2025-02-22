import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

export const getNFTs = async (req: Request, res: Response) => {
	try {
		const nfts = await prisma.nFT.findMany();
		res.json(nfts);
	} catch (error) {
		res.status(500).json({ error: "Error fetching NFTs" });
	}
};
