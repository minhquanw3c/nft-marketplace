import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

export const getListings = async (req: Request, res: Response) => {
	try {
		const listings = await prisma.listing.findMany();
		res.json(listings);
	} catch (error) {
		res.status(500).json({ error: "Error fetching listings" });
	}
};
