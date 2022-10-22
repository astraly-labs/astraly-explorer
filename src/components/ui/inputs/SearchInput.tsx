import React, { useState, useRef } from "react";
import classnames from "classnames";

import SearchIcon from "src/assets/icons/currentColor/Search.svg?inline";

import styles from "./Search.module.scss";

const SearchInput: React.FC<{
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ value, onChange }) => {
  const [hasFocus, setFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!hasFocus) inputRef.current?.focus();
  };

  return (
    <div
      className={classnames(styles.search, { [styles.searchActive]: hasFocus })}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleClick}
    >
      <div className={`icon mr-2 ${!hasFocus && "-ml-4"}`}>
        <SearchIcon />
      </div>
      <div className="text font-heading">Search</div>
      <div className="input">
        <input
          ref={inputRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchInput;
