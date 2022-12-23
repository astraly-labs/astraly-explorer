import React, { useState } from "react";
import BaseButton from "../../src/components/ui/buttons/BaseButton";
import WalletIcon from "../../src/assets/icons/outline/Wallet.svg?inline";
import Chevron from "src/assets/icons/Chevron.svg?inline";
import styles from "./landing.module.scss";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import Logo from "src/assets/images/logo--dark.svg";
import { InjectedConnector } from "wagmi/connectors/injected";
import Link from "next/link";
import Footer from "../layout/footer";

const Landing = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
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

  return (
    <div className={styles.background}>
      <Link href="/">
        <div className="logo flex items-center cursor-pointer absolute top-10 left-6">
          <img
            src={Logo}
            height="80"
            width="80"
            alt="Astraly logo"
            className="dark:hidden"
          />
          <div className="text-24 font-bold ml-4 font-Black text-primaryDark hidden md:inline-block uppercase dark:text-whitePurple">
            Astraly
          </div>
        </div>
      </Link>
      <div className={styles.stars}></div>
      <div className={styles.stars2}></div>
      <div className={styles.stars3}></div>
      <div className="flex flex-col gap-y-[50px] items-center h-[100vh] justify-center">
        <div className="flex animate-fadeIn font-boldLato items-center justify-center text-[80px] text-transparent text-white gap-x-8 z-10 bg-clip-text">
          Your gateway to explore
          <div className="text-primary">Web3</div>
        </div>
        <div className="text-[30px] font-Light items-center justify-center text-center  text-white w-[70%]">
          <p>
            {" "}
            Connect your wallet and get recommandations on the most relevant
            pieces of content in Web3.{" "}
          </p>
          <p>Learn, earn, grow</p>
        </div>
        <label className="flex" htmlFor="my-modal-3">
          <BaseButton
            className="px-6"
            medium={true}
            onClick={(e) => {
              e.preventDefault();
              if (!isConnected) {
                connect();
              } else {
                handleLogin();
              }
            }}
          >
            <WalletIcon className="mr-4" />
            <div className="hidden lg:flex md:flex">Connect your wallet</div>
            <Chevron className={"icon-right lg:ml-3"} />
          </BaseButton>
        </label>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
