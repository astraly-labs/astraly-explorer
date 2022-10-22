import React from "react";
import classnames from "classnames";

import styles from "./Icons.module.scss";

const IconTemplate: React.FC<{
  outline: React.ReactNode;
  solid: React.ReactNode;
  className?: string;
}> = ({ outline, solid, className }) => {
  return (
    <div className={classnames(styles.icon, className, "animatedIcon")}>
      <div
        className={classnames(
          styles.iconIcon,
          className,
          "animatedIconOutline"
        )}
      >
        {outline}
      </div>
      <div
        className={classnames(styles.iconIcon, className, "animatedIconSolid")}
      >
        {solid}
      </div>
    </div>
  );
};

import Wallet from "src/assets/icons/outline/Wallet.svg?inline";
import WalletSolid from "src/assets/icons/solid/Wallet.svg?inline";

export const WalletIcon: React.FC<{ className?: string }> = (props) => {
  return (
    <IconTemplate outline={<Wallet />} solid={<WalletSolid />} {...props} />
  );
};

import Lock from "src/assets/icons/currentColor/Unlock.svg?inline";
import LockSolid from "src/assets/icons/currentColor/Lock.svg?inline";

export const LockIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Lock />} solid={<LockSolid />} {...props} />;
};

import Send from "src/assets/icons/currentColor/UploadOutline.svg?inline";
import SendSolid from "src/assets/icons/currentColor/Upload.svg?inline";

export const SendIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Send />} solid={<SendSolid />} {...props} />;
};

import Cart from "src/assets/icons/currentColor/Shopping-cart-outline.svg?inline";
import CartSolid from "src/assets/icons/currentColor/Shopping-cart.svg?inline";

export const CartIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Cart />} solid={<CartSolid />} {...props} />;
};

import Rocket from "src/assets/icons/currentColor/Rocket.svg?inline";
import RocketSolid from "src/assets/icons/currentColor/RocketSolid.svg?inline";

export const RocketIcon: React.FC<{ className?: string }> = (props) => {
  return (
    <IconTemplate outline={<Rocket />} solid={<RocketSolid />} {...props} />
  );
};

import Bolt from "src/assets/icons/outline/Lightning-alt.svg?inline";
import BoltSolid from "src/assets/icons/currentColor/Lightning-alt.svg?inline";

export const BoltIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Bolt />} solid={<BoltSolid />} {...props} />;
};

import Forward from "src/assets/icons/outline/Forward.svg?inline";
import ForwardSolid from "src/assets/icons/solid/Forward.svg?inline";

export const ForwardIcon: React.FC<{ className?: string }> = (props) => {
  return (
    <IconTemplate outline={<Forward />} solid={<ForwardSolid />} {...props} />
  );
};

import Like from "src/assets/icons/currentColor/Like.svg?inline";
import LikeSolid from "src/assets/icons/currentColor/LikeSolid.svg?inline";

export const LikeIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Like />} solid={<LikeSolid />} {...props} />;
};

import Checked from "src/assets/icons/currentColor/Checked-box--outline.svg?inline";
import CheckedSolid from "src/assets/icons/currentColor/Checked-box.svg?inline";

export const CheckedIcon: React.FC<{ className?: string }> = (props) => {
  return (
    <IconTemplate outline={<Checked />} solid={<CheckedSolid />} {...props} />
  );
};

import Fire from "src/assets/icons/currentColor/Fire--outline.svg?inline";
import FireSolid from "src/assets/icons/currentColor/Fire.svg?inline";

export const FireIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Fire />} solid={<FireSolid />} {...props} />;
};

import Swap from "src/assets/icons/currentColor/Swap.svg?inline";
// import SwapSolid from 'src/assets/icons/currentColor/Swap.svg?inline'

export const SwapIcon: React.FC<{ className?: string }> = (props) => {
  return <IconTemplate outline={<Swap />} solid={<Swap />} {...props} />;
};
