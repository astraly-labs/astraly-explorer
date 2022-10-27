import Header from "./header/index";
import { PropsWithChildren } from "react";
import ToastContainer from "../../src/components/ui/Toast/ToastContainer";
import Marquee from "react-fast-marquee";
import Warning from "src/assets/icons/currentColor/warning.svg?inline";
import Noise from "src/assets/images/Noise.png";

export default function Layout({ children }: PropsWithChildren<any>) {
  return (
    <div className="-mb-20">
      <div className="default-layout flex flex-col min-h-full relative">
        <div
          className="noise absolute h-full w-full z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${Noise.src})`,
          }}
        ></div>
        <div className="w-full overflow-hidden">
          <Marquee
            style={{
              background: "black",
              width: "100vw",
              height: "28px",
            }}
            speed={50}
            gradient={false}
          >
            <div className="text-white flex items-center text-14 transform translate-y-px">
              This application runs on{" "}
              <span className="underline px-1">Starknet</span> testnet, which is
              still in
              <span className="font-bold pl-1"> alpha</span>. Transactions can
              take longer than expected. Starkware is working on making it
              faster. Thank you for your patience.
              <Warning
                className={"text-yellow-400 ml-2 transform -translate-y-px"}
              />
            </div>
          </Marquee>
        </div>
        {/* <ToastContainer /> */}

        <div className="flex main-background"></div>

        <Header />
        <>{children}</>

        <div className="h-20"></div>
        <div className="mt-auto">{/* <FooterIndex /> */}</div>
      </div>
    </div>
  );
}
