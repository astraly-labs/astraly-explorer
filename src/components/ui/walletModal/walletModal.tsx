import React, { useEffect } from "react";
import BaseButton from "../buttons/BaseButton";
import Wallet from "../../../assets/icons/outline/Wallet.svg?inline";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
const WalletModal = () => {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: session, status } = useSession();
  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    console.log(isConnected);
    if (isConnected && !session) {
      handleLogin();
    }
  }, [isConnected]);

  return (
    <div className="modal flex-col gap-y-2 ">
      <div className="modal-box relative gap-y-4 justify-between">
        <div className="flex flex-row text-center items-center justify-start gap-x-4 pb-[30px]">
          <Wallet />
          <h3 className="font-Bold text-primaryDark font-bold text-[24px] text-xl tracking-wide">
            Connect your wallet
          </h3>
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-6 top-6 bg-primary border-none hover:bg-white hover:text-black"
          >
            ✕
          </label>
        </div>
        <div className="flex">
          <BaseButton
            xSmall={true}
            className="px-4 text-[12px] py-0"
            onClick={(e) => {
              e.preventDefault();
              if (!isConnected) {
                connect();
              } else {
                handleLogin();
              }
            }}
          >
            LINK ANOTHER WALLET
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
