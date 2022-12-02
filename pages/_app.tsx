import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { StarknetReactProvider } from "@web3-starknet-react/core";
import { Session } from "next-auth";
import { Provider } from "starknet";
import dynamic from "next/dynamic";
import Layout from "./layout";

import { configureChains, chain, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";

function getLibrary(provider: Provider | undefined) {
  return new Provider(provider);
}

const Web3ReactProviderDefault = dynamic(
  () => import("../src/components/defaultprovider"),
  {
    ssr: false,
  }
);
export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  // const client = createClient({
  //   autoConnect: true,
  //   provider,
  //   webSocketProvider,
  // });
  return (
    <StarknetReactProvider getLibrary={getLibrary}>
      <Web3ReactProviderDefault getLibrary={getLibrary}>
        <Layout>
          <WagmiConfig client={client}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
              <Component {...pageProps} />
            </SessionProvider>
          </WagmiConfig>
        </Layout>
      </Web3ReactProviderDefault>
    </StarknetReactProvider>
  );
}

export default MyApp;
