import React, { useEffect, useRef, useState } from "react";

import { Modal } from "../../src/components/modal/modal";
import BaseButton from "../../src/components/ui/buttons/BaseButton";
import WalletIcon from "../../src/assets/icons/outline/Wallet.svg?inline";
import Steps, { Step } from "rc-steps";
import "rc-steps/assets/index.css";

const ControlSteps = () => {
  const [current, setCurrent] = React.useState(0);
  return (
    <Steps
      current={current}
      onChange={(val) => {
        // eslint-disable-next-line no-console
        console.log("Change:", val);
        setCurrent(val);
      }}
      items={[
        {
          title: "已完成",
        },
        {
          title: "进行中",
        },
        {
          title: "待运行",
          description: "Hello World!",
        },
        {
          title: "待运行",
        },
      ]}
    />
  );
};
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
            <div className="text-black">Steps</div>
          </Modal.Head>
          <Modal.Body>
            <div className="h-[50px] w-[100px]">
              <Steps current={1}>
                <Step title="first" />
                <Step title="second" className="text-black bg-black" />
                <Step title="third" />
                <ControlSteps />
              </Steps>
            </div>
          </Modal.Body>
        </Modal.Frame>
      </div>
    </>
  );
};
export default HomeView;
