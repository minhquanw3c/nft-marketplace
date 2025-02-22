import { useAccount, useDisconnect, Connector, useConnect } from "wagmi";
import { injected } from "wagmi";

export function ConnectWallet() {
	const { isConnected, address } = useAccount();
	const { disconnect } = useDisconnect();
	const { connect } = useConnect();

	if (!isConnected) {
		return (
			<button onClick={() => connect({ connector: injected() })}>
				Connect
			</button>
		);
	}

	return <button onClick={() => disconnect()}>Disconnect</button>;
}
