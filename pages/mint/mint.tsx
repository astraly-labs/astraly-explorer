import { useStarknetReact } from "@web3-starknet-react/core";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ERC20Proof } from "@vocdoni/storage-proofs-eth";

import BaseButton from "../../src/components/ui/buttons/BaseButton";
import { WalletIcon } from "../../src/components/ui/Icons/Icons";
import Chevron from "src/assets/icons/Chevron.svg?inline";
import { encodeCallArgs } from "./proof_generation";

export default function Mint() {
  const { account: starknetAccount } = useStarknetReact();

  const { address: ethereumAddress, isConnected } = useAccount();
  const connector = new InjectedConnector();
  const { connectAsync } = useConnect({
    connector,
  });
  async function mintBadge() {
    try {
      if (!isConnected) await connectAsync();
      const ethProvider = await connector.getProvider();

      const signer = await connector.getSigner();
      //   const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI
      const tokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; // LINK
      const blockNumber = 7826160;
      //   const storageSlot = await ERC20Proof.findMapSlot(
      //     tokenAddress,
      //     ethereumAddress as string,
      //     provider
      //   );
      const storageSlot = 1;
      const userBalance = "0x1";
      await encodeCallArgs(
        ethProvider,
        signer,
        ethereumAddress,
        starknetAccount?.address as string,
        tokenAddress,
        blockNumber,
        storageSlot,
        userBalance
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <BaseButton onClick={mintBadge} medium={true}>
          <WalletIcon />
          Add ASTR to Wallet
          <Chevron className={"ml-3 icon-right"} />
        </BaseButton>
      </div>
    </>
  );
}
