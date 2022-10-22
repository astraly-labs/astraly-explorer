import React, { useEffect, useState } from "react";
import classnames from "classnames";

import Explore from "src/assets/icons/currentColor/Explore.svg?inline";
import Gear from "src/assets/icons/currentColor/Gear.svg?inline";
import Check from "src/assets/icons/solid/Check.svg";

import { QuestType } from "../../../interfaces";

import Hint from "../Hint/Hint";
import BaseButton from "../buttons/BaseButton";

import styles from "./UrlInput.module.scss";

const defaultOptions = {
  icon: <Explore className="mr-2" />,
  label: "Url",
  placeholder: "Paste URL here",
};

const UrlInput: React.FC<{
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  setValue: (value: string) => void;
  questType: QuestType;
}> = ({ questType, value, onChange, setValue }) => {
  const handlePaste = async () => {
    setValue(await navigator.clipboard.readText());
  };

  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    setOptions(
      questType === "PRODUCT"
        ? {
            icon: <Gear className="mr-2" />,
            label: "HASH",
            placeholder: "Paste Transaction Hash here",
          }
        : defaultOptions
    );
  }, [questType]);

  return (
    <div
      className={classnames("UrlInput", styles.urlInputContainer, {
        [styles.urlInputContainerValid]: value,
      })}
    >
      <div className="flex items-center flex-shrink-0 mr-6">
        {options.icon}
        <div className="font-heading text-12 mr-2 uppercase">
          {options.label}
        </div>

        <Hint>
          {questType === "PRODUCT"
            ? "You can find the transaction hash on starkscan or in your wallet."
            : "Find the link on social media"}
        </Hint>
      </div>

      <input
        value={value}
        onChange={onChange}
        className="ml-auto mr-4 text-right bg-transparent w-full"
        placeholder={options.placeholder}
      />

      {!value && (
        <BaseButton xSmall className="uppercase" onClick={handlePaste}>
          Paste
        </BaseButton>
      )}

      {value && <img src={Check} alt="" />}
    </div>
  );
};

export default UrlInput;
