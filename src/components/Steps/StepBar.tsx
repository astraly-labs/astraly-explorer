import React from "react";

const StepBar: React.FC<{
  step1: string | undefined;
  step2: string | undefined;
}> = ({ step1, step2 }) => {
  return (
    <ul className="steps w-full pt-[120px]">
      <li className="step step-primary font-Light text-primaryDark ">
        Initialization
      </li>
      <li
        className={
          step1 == "accepted"
            ? "step step-primary font-Light text-primaryDark"
            : step1 == "rejected"
            ? "step step-error font-Light text-primaryDark"
            : "step font-Light text-primaryDark"
        }
      >
        Sign message
      </li>
      <li
        className={
          step2 == "accepted"
            ? "step step-primary font-Light text-primaryDark"
            : step2 == "rejected "
            ? "step step-error font-Light text-primaryDark"
            : "step font-Light text-primaryDark"
        }
      >
        Claim badge
      </li>
    </ul>
  );
};

export default StepBar;
