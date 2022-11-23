import BaseButton from "../../../components/ui/buttons/BaseButton";
import Chevron from "../../../assets/icons/Chevron.svg?inline";
import { WalletIcon } from "../../../components/ui/Icons/Icons";
import ProfileTooltip from "./ProfileTooltip";
import { useState } from "react";
import { useStarknetReact } from "@web3-starknet-react/core";
import { truncateAddress } from "../../../utils";

const ProfileButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { account } = useStarknetReact();
  return (
    <>
      <div className="hidden lg:block profile-button relative ml-8">
        <BaseButton
          className="px-6"
          white={true}
          onClick={() => setShowTooltip(true)}
        >
          <WalletIcon className={"mr-3"} />
          {account ? truncateAddress(account.address) : "Connect your wallet"}
          <Chevron className={"icon-right ml-3"} />
        </BaseButton>
      </div>
    </>
  );
};

export default ProfileButton;
