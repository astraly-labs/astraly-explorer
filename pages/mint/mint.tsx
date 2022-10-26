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

export default function Mint() {
  const { account } = useStarknetReact();
  const { getContract } = useContract();

  const { address: ethereumAddress, isConnected } = useAccount();
  const connector = new InjectedConnector();
  const { connect } = useConnect({ connector });
  const provider: AlchemyProvider = useProvider();
  const { data: signer } = useSigner();

  async function mintBadge() {
    try {
      if (!isConnected) connect();
      const tokenAddress = "0x326c977e6efc84e512bb9c30f76e30c160ed06fb"; // LINK
      // const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI
      const blockNumber = await provider.getBlockNumber();
      const storageSlot = await ERC20Proof.findMapSlot(
        tokenAddress,
        ethereumAddress as string,
        provider
      );
      connector.getSigner();
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

      debugger;
      const contract = await getContract("0x0", BADGE_CONTRACT_ABI);
      debugger;
      await contract.invoke("mint", proof);
    } catch (error) {
      debugger;
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
