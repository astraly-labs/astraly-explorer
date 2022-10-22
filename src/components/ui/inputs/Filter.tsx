import React from "react";
import classnames from "classnames";

import Outline from "src/assets/icons/outline/Filter.svg";
import Solid from "src/assets/icons/solid/Filter.svg";

import styles from "../buttons/Buttons.module.scss";
import filterStyles from "./Filter.module.scss";

const Filter = () => {
  return (
    <div
      className={classnames(
        styles.baseButton,
        styles.baseButtonMedium,
        filterStyles.filter
      )}
    >
      <img
        src={Outline}
        alt=""
        className={classnames(
          styles.baseButtonIcon,
          styles.baseButtonIconOutline
        )}
      />
      <img
        src={Solid}
        alt=""
        className={classnames(
          styles.baseButtonIcon,
          styles.baseButtonIconSolid
        )}
      />
    </div>
  );
};

export default Filter;
