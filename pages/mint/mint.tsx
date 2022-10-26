import { useStarknetReact } from "@web3-starknet-react/core";
import { useAccount, useConnect, useProvider, useSigner } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ERC20Proof } from "@vocdoni/storage-proofs-eth";

import BaseButton from "../../src/components/ui/buttons/BaseButton";
import { WalletIcon } from "../../src/components/ui/Icons/Icons";
import Chevron from "src/assets/icons/Chevron.svg?inline";
import { encodeCallArgs } from "./proof_generation";
import { AlchemyProvider } from "@ethersproject/providers";
import useContract from "../../src/hooks/useContract";
import { BADGE_CONTRACT_ABI } from "../../src/contracts/abi";
import { useEffect } from "react";

export default function Mint() {
  const { account } = useStarknetReact();
  const { getContract } = useContract();

  const { address: ethereumAddress, isConnected } = useAccount();
  const connector = new InjectedConnector();
  const { connect } = useConnect({ connector });
  const provider: AlchemyProvider = useProvider();
  // const { data: signer } = useSigner();

  useEffect(() => {
    if (!isConnected) connect();
  });

  async function mintBadge() {
    try {
      const tokenAddress = "0x326c977e6efc84e512bb9c30f76e30c160ed06fb"; // LINK
      // const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI
      const blockNumber = await provider.getBlockNumber();
      const storageSlot = await ERC20Proof.findMapSlot(
        tokenAddress,
        ethereumAddress as string,
        provider
      );
      const signer = await connector.getSigner();
      const userMinBalance = "0x1";
      const proof = await encodeCallArgs(
        provider,
        signer,
        ethereumAddress,
        account?.address as string,
        tokenAddress,
        blockNumber,
        storageSlot,
        userMinBalance
      );
      console.log(proof);

      const contract = await getContract(
        "0x020b6d41d2df761dfa4c9f123fc0d68b55f45dfd4266124befc2500352387a91",
        BADGE_CONTRACT_ABI
      );
      await contract.invoke("mint", proof);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <BaseButton onClick={mintBadge} medium={true}>
          <WalletIcon />
          Mint
          <Chevron className={"ml-3 icon-right"} />
        </BaseButton>
      </div>
    </>
  );
}
