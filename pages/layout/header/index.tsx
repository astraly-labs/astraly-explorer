import React, { useEffect, useState } from "react";

import { useStarknetReact } from "@web3-starknet-react/core";

import Link from "next/link";

import Logo from "src/assets/images/logo.svg";
import LogoDark from "src/assets/images/logo--dark.svg";
import HeaderMenu from "./menu";
import ProfileButton from "../../../src/components/ui/ProfileButton/ProfileButton";
import classNames from "classnames";
import styles from "./menu.module.scss";
const Header: React.FC = () => {
  const { account, deactivate, chainId } = useStarknetReact();

  return (
    <div className={classNames(styles.appHeader, { [styles.open]: open })}>
      <div
        className={classNames(
          styles.appHeader__container,
          "g-container relative"
        )}
      >
        <div className="g-container flex justify-between w-full pt-2 items-center">
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
              <div className="text-24 font-bold ml-4 font-Black text-primaryDark hidden md:inline-block uppercase dark:text-whitePurple">
                Astraly
              </div>
            </div>
          </Link>
          <HeaderMenu />
          <ProfileButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
