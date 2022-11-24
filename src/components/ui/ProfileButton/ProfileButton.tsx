import BaseButton from "../../../components/ui/buttons/BaseButton";
import Chevron from "../../../assets/icons/Chevron.svg?inline";
import { WalletIcon } from "../../../components/ui/Icons/Icons";
import { useState } from "react";
import { truncateAddress } from "../../../utils";

const ProfileButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <>
      <div className="hidden lg:block profile-button relative ml-8">
        <BaseButton
          className="px-6"
          white={true}
          onClick={() => setShowTooltip(true)}
        >
          <WalletIcon className={"mr-3"} />
          {"Connect your wallet"}
          <Chevron className={"icon-right ml-3"} />
        </BaseButton>
      </div>
    </>
  );
};

export default ProfileButton;
