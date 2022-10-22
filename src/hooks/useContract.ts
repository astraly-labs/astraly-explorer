import { useStarknetReact } from "@web3-starknet-react/core";
import { useCallback } from "react";
import { Abi, Contract, Provider } from "starknet";

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

export default () => {
  const { account } = useStarknetReact();

  const getContract = useCallback(
    async (address: string, abi: Abi) => {
      if (account) {
        return new Contract(abi, address, account);
      }

      const networkName = isMainnet ? "mainnet-alpha" : "goerli-alpha";
      const provider = new Provider({ sequencer: { network: networkName } });

      return new Contract(abi, address, provider);
    },
    [account]
  );

  return { getContract };
};
