import React, { useEffect, useState } from "react";

import { useStarknetReact } from "@web3-starknet-react/core";

import Link from "next/link";

import Logo from "src/assets/images/logo.svg";
import LogoDark from "src/assets/images/logo--dark.svg";
import HeaderMenu from "./menu";
import ProfileButton from "../../../src/components/ui/ProfileButton/ProfileButton";
import classNames from "classnames";
import styles from "./AppHeader.module.scss";
import BaseButton from "../../../src/components/ui/buttons/BaseButton";
import { WalletIcon } from "../../../src/components/ui/Icons/Icons";
import Chevron from "../../../src/assets/icons/Chevron.svg?inline";
import WalletModal from "../../../src/components/ui/walletModal/walletModal";
const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="flex justify-around py-22 items-center ">
      <Link href="/">
        <div className="logo flex items-center cursor-pointer">
          <img
            src={Logo}
            height="80"
            width="80"
            alt="Astraly logo"
            className="dark:hidden"
          />
          <img
            src={LogoDark}
            height="80"
            width="80"
            alt="Astraly logo"
            className="hidden dark:inline-block"
          />
          <div className="text-24 font-bold ml-4 font-heading text-primaryDark hidden md:inline-block uppercase dark:text-whitePurple">
            Astraly
          </div>
        </div>
      </Link>
      {/* <HeaderMenu /> */}
      <label className="flex" htmlFor="my-modal-3">
        <BaseButton
          className="px-6"
          white={true}
          onClick={() => setShowModal(true)}
        >
          <WalletIcon className={"lg:mr-3 "} />
          <div className="hidden lg:flex md:flex">Connect your wallet</div>
          <Chevron className={"icon-right ml-3"} />
        </BaseButton>
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <WalletModal />
    </div>
  );
};

export default Header;
