import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import nftRoutes from "./routes/nftRoutes";
import listingRoutes from "./routes/listingRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { setupWebSocket } from "./websocket/wsServer";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/nfts", nftRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes);

// WebSocket
const server = app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
setupWebSocket(server);
