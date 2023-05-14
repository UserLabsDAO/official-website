import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ConnectorNotFoundError,
  SwitchChainNotSupportedError,
  useConnect,
  useDisconnect,
  useNetwork,
  configureChains, Chain, WagmiConfig,createClient
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

export const mainnet: Chain = {
	id: 1,
	name: 'mainnet',
	network: 'mainnet',
	rpcUrls: {
		public: { http: ['https://rpc.tomoweb3.io'] },
		default: { http: ['https://rpc.tomoweb3.io'] },
	},
	blockExplorers: {
		default: { name: 'tomoweb3', url: 'https://scan.tomoweb3.io' },
	},
	nativeCurrency: {
		name: 'ETH',
		symbol: 'ETH',
		decimals: 18,
	},
}

export const {chains, provider, webSocketProvider } = configureChains(
	[mainnet],
	[publicProvider()]
)

const client = createClient({
	autoConnect: false,
	connectors: [
	  new MetaMaskConnector({ chains }),
	  new CoinbaseWalletConnector({
		chains,
		options: {
		  appName: 'wagmi',
		},
	  }),
	  new WalletConnectConnector({
		chains,
		options: {
		  qrcode: true,
		},
	  }),
	  new InjectedConnector({
		chains,
		options: {
		  name: 'Injected',
		  shimDisconnect: true,
		},
	  }),
	],
	provider,
	webSocketProvider,
  })
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
		<WagmiConfig client={client}>
    <App />
		</WagmiConfig >
  </React.StrictMode>
);

reportWebVitals();
