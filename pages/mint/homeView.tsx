import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStarknetReact } from "@web3-starknet-react/core";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ERC20Proof } from "@vocdoni/storage-proofs-eth";
import { Modal } from "../../src/components/modal/modal";
import BaseButton from "../../src/components/ui/buttons/BaseButton";
import WalletIcon from "../../src/assets/icons/outline/Wallet.svg?inline";
import Steps, { Step } from "rc-steps";
import { checkRequirements, encodeCallArgs } from "./proof_generation";
import StepBar from "../../src/components/Steps/StepBar";

const HomeView = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const { account: starknetAccount } = useStarknetReact();
  const { address: ethereumAddress, isConnected } = useAccount();
  const connector = new InjectedConnector();
  const [step1, setStep1] = useState<string | undefined>(undefined);
  const [step2, setStep2] = useState<string | undefined>(undefined);
  const [verification, setVerification] = useState<boolean | undefined>(
    undefined
  );
  const valid = useCallback(async () => {
    const res = await validRequirements();
    setVerification(res);
  }, []);

  useEffect(() => {
    valid();
  }, []);
  const { connectAsync } = useConnect({
    connector,
  });
  //   useEffect(() => {
  //     const onKeyPress = (e: KeyboardEvent) => {
  //       if (closeOnEsc && open && e.key === "Escape") onClose();
  //     };

  //     window.addEventListener("keydown", onKeyPress);
  //     return () => window.removeEventListener("keydown", onKeyPress); // don't forget to clean up
  //   }, [closeOnEsc, onClose, open]);
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
      setStep1("accepted");
      await new Promise<void>((done) => setTimeout(() => done(), 3000));
      setStep2("accepted");
    } catch (error) {
      setStep1("rejected");
    }
  }

  async function validRequirements() {
    try {
      if (!isConnected) await connectAsync();
      const ethProvider = await connector.getProvider();

      const signer = await connector.getSigner();
      //   const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI
      const tokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; // LINK
      const blockNumber = 7826160;
      const storageSlot = 1;
      const userBalance = "0x1";
      return checkRequirements(
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
      console.log(error);
    }
  }

  return (
    <>
      {verification != undefined && verification === false && (
        <div
          className="tooltip"
          data-tip="Your account does not fit the requirements"
        >
          <BaseButton
            onClick={() => {
              setStep1(undefined);
              setStep2(undefined);
              setIsShowing(true);
              mintBadge();
            }}
            small={true}
            className="px-10 justify-center items-center"
            disabled={true}
          >
            <div className="flex font-Heading text-[30px] text-center justify-center">
              Claim your SBT
            </div>
          </BaseButton>
        </div>
      )}
      {verification != undefined && verification === true && (
        <BaseButton
          onClick={() => {
            setIsShowing(true);
            mintBadge();
          }}
          small={true}
          className="px-10 justify-center items-center"
          disabled={false}
        >
          <div className="flex font-Heading text-[30px] text-center justify-center">
            Claim your SBT
          </div>
        </BaseButton>
      )}
      <div className="flex justify-center items-center">
        <Modal.Frame open={isShowing} onClose={() => setIsShowing(false)}>
          <Modal.Head>
            <div className=" font-Bold text-[45px] text-primaryDark text-center ">
              Steps
            </div>
          </Modal.Head>
          <Modal.Body>
            <div className="">
              <StepBar step1={step1} step2={step2} />
            </div>
          </Modal.Body>
        </Modal.Frame>
      </div>
    </>
  );
};
export default HomeView;
