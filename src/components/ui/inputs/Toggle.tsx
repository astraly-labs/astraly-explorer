import React from "react";

import Unlock from "src/assets/icons/outline/Unlock--current.svg?inline";
import Locked from "src/assets/icons/solid/Lock.svg";

import style from "./Toggle.module.scss";

const Toggle: React.FC<{
  value: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({ value, onClick }) => {
  return (
    <div
      className={`${style.baseToggle} ${value && style.baseToggleActive}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
    >
      <div className={style.baseToggleItem}>
        {!value && <Unlock />}
        {value && <img src={Locked} alt="" />}
      </div>
    </div>
  );
};

export default Toggle;
