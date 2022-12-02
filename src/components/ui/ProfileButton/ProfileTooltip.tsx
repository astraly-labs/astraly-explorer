/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import styles from "./Profile.module.scss";
import React, { useState } from "react";
import Book from "../../../assets/icons/outline/Book-open.svg";
import Check from "../../../assets/icons/currentColor/Check.svg?inline";
import User from "../../../assets/icons/currentColor/User.svg?inline";
import Chevron from "../../../assets/icons/Chevron.svg?inline";
import Cross from "../../../assets/icons/solid/Cross.svg";

import { SUPPORTED_WALLETS } from "../../../constants/wallet";
import Link from "next/link";
import {
  UnsupportedChainIdError,
  useStarknetReact,
} from "@web3-starknet-react/core";
import BaseButton from "../../../components/ui/buttons/BaseButton";
import { truncateAddress } from "../../../utils";

const ProfileTooltip = ({ close }: { close: () => void }) => {
  const { account, deactivate, activate, connector, error } =
    useStarknetReact();
  const getTitle = () => {
    if (account) {
      return (
        <>
          Wallet Connected{" "}
          <Check className={"ml-1 transform -translate-y-0.5"} />
        </>
      );
    } else {
      return <>Choose Wallet</>;
    }
  };

  const updateWalletCache = (wallet: any) => {
    const _walletKey = Object.keys(SUPPORTED_WALLETS).find(
      (key) => SUPPORTED_WALLETS[key].connector === wallet
    );
    if (!_walletKey) return;
    localStorage.setItem("astraly__wallet", SUPPORTED_WALLETS[_walletKey].name);
  };

  const tryActivation = async (connector: any) => {
    const conn =
      typeof connector === "function" ? await connector() : connector;

    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return SUPPORTED_WALLETS[key].name;
      }
      return true;
    });

    conn &&
      activate(conn, undefined, true)
        .then(() => updateWalletCache(conn))
        .catch((error) => {
          console.log(error);
          if (error instanceof UnsupportedChainIdError) {
            activate(conn); // a little janky...can't use setError because the connector isn't set
          }
        });
  };

  const getContent = () => {
    if (account) {
      return (
        <>
          <div>
            <BaseButton onClick={() => close()} white={true} className={"mb-2"}>
              <User className={"mr-1"} />
              {truncateAddress(account.address)}
              <Chevron className={"ml-1 icon-right"} />
            </BaseButton>
          </div>
          <div
            className="font-heading text-12 text-center text-white cursor-pointer hover:bg-white hover:text-primary rounded-md transition-all"
            onClick={deactivate}
          >
            Disconnect
          </div>
        </>
      );
    } else {
      return Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option: any = SUPPORTED_WALLETS[key];
        return (
          <div
            className="bg-white px-4 py-2 mb-2 rounded-xl flex items-center justify-center font-bold text-primary cursor-pointer text-24"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              option.connector === connector
                ? null
                : tryActivation(option.connector);
            }}
            key={key}
          >
            <img
              src={option.icon}
              alt="option-icon"
              height={32}
              width={32}
              className="mr-2"
            />
            {option.name}
          </div>
        );
      });
    }
  };

  return (
    <div className={styles.profileTooltip}>
      <div
        className="close w-8 h-8 ml-auto cursor-pointer"
        onClick={() => close()}
      >
        <img src={Cross} alt={"close"} />
      </div>
      <div className="text-white text-16 flex items-center justify-center mb-2 font-bold">
        {getTitle()}
      </div>

      <div className="mb-6">{getContent()}</div>

      <Link href="https://wp.astraly.xyz/step-by-step-guide/connecting-your-staknet-wallet">
        <a
          className="text-12 text-center text-white flex items-center justify-center font-bold"
          target={"_blank"}
          rel="noreferrer"
        >
          <img src={Book} alt={""} className="mr-2" />
          How to get a Starknet Wallet?
        </a>
      </Link>
    </div>
  );
};

export default ProfileTooltip;
