import { Server } from "ws";

export function setupWebSocket(server: any) {
	const wss = new Server({ server });

	wss.on("connection", (ws) => {
		console.log("New WebSocket connection");

		ws.on("message", (message) => {
			console.log("Received:", message.toString());
		});

		ws.send("Welcome to NFT Marketplace WebSocket");
	});
}
