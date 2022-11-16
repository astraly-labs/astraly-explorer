import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { StarknetReactProvider } from "@web3-starknet-react/core";
import { Provider } from "starknet";
import dynamic from "next/dynamic";
import Layout from "./layout";
import { configureChains, chain, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";
import Web3ReactManager from "../src/components/Web3ReactManager";

function getLibrary(starknetProvider: Provider | undefined) {
  return new Provider(starknetProvider);
}

const Web3ReactProviderDefault = dynamic(
  () => import("../src/components/defaultprovider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [chain.goerli],
    [
      alchemyProvider({ apiKey: "uXpxHR8fJBH3fjLJpulhY__jXbTGNjN7" }),
      // publicProvider(),
    ]
  );

  const client = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains })],
    provider,
  });
  return (
    <StarknetReactProvider getLibrary={getLibrary}>
      <Web3ReactProviderDefault getLibrary={getLibrary}>
        <Web3ReactManager>
          <Layout>
            <WagmiConfig client={client}>
              <Component {...pageProps} />
            </WagmiConfig>
          </Layout>
        </Web3ReactManager>
      </Web3ReactProviderDefault>
    </StarknetReactProvider>
  );
}

export default MyApp;
