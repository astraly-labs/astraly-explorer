import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { StarknetReactProvider } from "@web3-starknet-react/core";
import { Provider } from "starknet";
import dynamic from "next/dynamic";
import Layout from "./layout";
import { useStore } from "../src/stores/reduxStore";
import { configureChains, chain, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

function getLibrary(provider: Provider | undefined) {
  return new Provider(provider);
}

const Web3ReactProviderDefault = dynamic(
  () => import("../src/components/defaultprovider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  const { provider, webSocketProvider } = configureChains(
    [chain.goerli],
    [publicProvider()]
  );
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });
  return (
    <ReduxProvider store={store}>
      <StarknetReactProvider getLibrary={getLibrary}>
        <Web3ReactProviderDefault getLibrary={getLibrary}>
          <Layout>
            <WagmiConfig client={client}>
              <Component {...pageProps} />
            </WagmiConfig>
          </Layout>
        </Web3ReactProviderDefault>
      </StarknetReactProvider>
    </ReduxProvider>
  );
}

export default MyApp;
