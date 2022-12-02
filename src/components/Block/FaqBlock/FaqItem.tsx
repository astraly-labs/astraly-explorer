import classnames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import { Hexagon } from "../../ui/Hexagon/Hexagon";
import ArrowIcon from "../../../assets/icons/ArrowDown.svg?inline";

const FaqItem: React.FC<PropsWithChildren<{ question: string }>> = ({
  question,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="FaqItem mb-6 px-8 py-6 min-h-[84px] items-center flex cursor-pointer hover"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="w-full">
        <div
          style={{ letterSpacing: "0.03em" }}
          className={classnames(
            "question font-sans text-24 text-midPurple flex items-center justify-between w-full",
            isOpen ? "ui-t-primary mb-2" : "ui-t-primaryClear"
          )}
        >
          {question}
          <div className="hidden dark:inline-block">
            <Hexagon fillColor={"#2C2A30"} strokeColor={"#9f24ff"}>
              <ArrowIcon
                className={classnames(
                  "transform transition -ml-[2px]",
                  isOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </Hexagon>
          </div>
          <div className="dark:hidden">
            <Hexagon fillColor={"#ffffff"} strokeColor={"#FBF6FF"}>
              <ArrowIcon
                className={classnames(
                  "transform transition -ml-[2px]",
                  isOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </Hexagon>
          </div>
        </div>
        {isOpen && (
          <div
            style={{ letterSpacing: "0.02em" }}
            className="response text-primaryDark dark:text-white font-bold leading-138"
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqItem;
