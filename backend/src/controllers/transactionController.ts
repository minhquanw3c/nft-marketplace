import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

export const getTransactions = async (req: Request, res: Response) => {
	try {
		const transactions = await prisma.transaction.findMany();
		res.json(transactions);
	} catch (error) {
		res.status(500).json({ error: "Error fetching transactions" });
	}
};

export const purchaseNFT = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { nftId, buyerId, txHash, price } = req.body;

	try {
		const nft = await prisma.nFT.findUnique({ where: { id: nftId } });
		if (!nft) return res.status(404).json({ error: "NFT not found" });

		const transaction = await prisma.transaction.create({
			data: {
				nft: { connect: { id: nftId } },
				buyer: { connect: { id: buyerId } },
				seller: { connect: { id: nft.ownerId } },
				price,
				txHash,
			},
		});

		// Update ownership of NFT
		await prisma.nFT.update({
			where: { id: nftId },
			data: { ownerId: buyerId },
		});

		return res.json({ success: true, transaction });
	} catch (error) {
		return res.status(500).json({ error: "Purchase failed" });
	}
};
