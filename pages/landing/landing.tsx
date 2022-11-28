import React, { useState } from "react";
import BaseButton from "../../src/components/ui/buttons/BaseButton";
import { WalletIcon } from "../../src/components/ui/Icons/Icons";
import Chevron from "src/assets/icons/Chevron.svg?inline";

const Landing = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="flex flex-col pt-[60px] gap-y-[50px] items-center ">
      <div className="flex font-Heading items-center justify-center text-[70px] text-primaryDark gap-x-8">
        Your gateway to explore
        <div className="text-primary">Web3</div>
      </div>
      <div className="text-[30px] font-Bold items-center justify-center text-center  text-primaryDark w-[70%]">
        <p>
          {" "}
          Connect your wallet and get recommandations on the most relevant
          pieces. of content in Web3.{" "}
        </p>
        <p>Learn, earn, grow</p>
      </div>
      <label className="flex" htmlFor="my-modal-3">
        <a href="/siwe">
          <BaseButton className="px-6" medium={true}>
            <WalletIcon className={"lg:mr-3 "} />
            <div className="hidden lg:flex md:flex">Connect your wallet</div>
            <Chevron className={"icon-right lg:ml-3"} />
          </BaseButton>
        </a>
      </label>
    </div>
  );
};

export default Landing;
