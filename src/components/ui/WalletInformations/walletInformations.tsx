import React from "react";
import PolygonIcon from "src/assets/icons/icons/PolygonEth.svg?inline";
const WalletInformations: React.FC<{
  isEth: boolean;
  EnsName: string;
  account: string;
  link: string;
  balance: string;
}> = ({ isEth, account, EnsName, link, balance }) => {
  return (
    <div className="flex justify-start px-[10px] py-[16px] shadow-whiteDark rounded-xl gap-x-[10px]">
      <PolygonIcon />
      <div className="flex flex-col gap-y-2">
        <div className="flex text-Bold font-Bold text-primaryDark items-center text-[16px]">
          {" "}
          {account}
        </div>
        <div className="text-whitePurple text-[12px] border rounded-xl flex px-4 justify-center items-center self-start hover:text-white hover:bg-primary hover:cursor-pointer">
          {isEth ? EnsName : ""}
        </div>
      </div>
    </div>
  );
};

export default WalletInformations;
