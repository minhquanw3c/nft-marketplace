import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
	chains: [mainnet, sepolia],
	connectors: [injected()],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
	},
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}
