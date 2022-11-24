import "../styles/globals.scss";
import type { AppProps } from "next/app";

import dynamic from "next/dynamic";
import Layout from "./layout";
import { configureChains, chain, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";
import Web3ReactManager from "../src/components/Web3ReactManager";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [publicProvider()]
);

// const client = createClient({
//   autoConnect: true,
//   provider,
// });
const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
});
// function getLibrary(starknetProvider: Provider | undefined) {
//   return new Provider(starknetProvider);
// }

// const Web3ReactProviderDefault = dynamic(
//   () => import("../src/components/defaultprovider"),
//   {
//     ssr: false,
//   }
// );

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  // const { chains, provider } = configureChains(
  //   [chain.goerli],
  //   [
  //     alchemyProvider({ apiKey: "uXpxHR8fJBH3fjLJpulhY__jXbTGNjN7" }),
  //     // publicProvider(),
  //   ]
  // );

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Web3ReactManager>
          <Layout>
            <WagmiConfig client={client}>
              <Component {...pageProps} />
            </WagmiConfig>
          </Layout>
        </Web3ReactManager>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
