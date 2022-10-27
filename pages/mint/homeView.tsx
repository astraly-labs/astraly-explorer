import React, { useEffect, useRef, useState } from "react";

import { Modal } from "../../src/components/modal/modal";
import BaseButton from "../../src/components/ui/buttons/BaseButton";
import WalletIcon from "../../src/assets/icons/outline/Wallet.svg?inline";
const HomeView = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  //   useEffect(() => {
  //     const onKeyPress = (e: KeyboardEvent) => {
  //       if (closeOnEsc && open && e.key === "Escape") onClose();
  //     };

  //     window.addEventListener("keydown", onKeyPress);
  //     return () => window.removeEventListener("keydown", onKeyPress); // don't forget to clean up
  //   }, [closeOnEsc, onClose, open]);
  return (
    <>
      <BaseButton
        onClick={() => setIsShowing(true)}
        medium={true}
        className="justify-center items-center px-10"
      >
        <WalletIcon className="items-center justify-center" />
        <div className="pr-4 font-Heading text-[22px] items-center text-center justify-center">
          Claim your SBT
        </div>
      </BaseButton>
      <div className="flex justify-center items-center w-full">
        <Modal.Frame open={isShowing} onClose={() => setIsShowing(false)}>
          <Modal.Head>
            <div className="text-black">Hi there!</div>
          </Modal.Head>
          <Modal.Body>
            <div className="text-black">Hi there!</div>
          </Modal.Body>
        </Modal.Frame>
      </div>
    </>
  );
};
export default HomeView;
