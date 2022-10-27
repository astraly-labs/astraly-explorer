import React from "react";
import {
  PropsWithChildren,
  ReactComponentElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./menu.module.scss";

const MenuItem = ({
  children,
  link,
}: PropsWithChildren<{
  link: {
    text: string;
    href: string;
    iconOutline: any;
    iconSolid: any;
  };
}>) => {
  const router = useRouter();
  const [isCurrentRoute, setIsCurrentRoute] = useState(false);

  useEffect(() => {
    setIsCurrentRoute(
      router.route === link.href || router.route.startsWith("/project")
    );
  }, [router.route]);

  return (
    <Link href={link.href}>
      <div
        className={`${styles.menuItem} ${
          isCurrentRoute && styles.menuItemActive
        } cursor-pointer`}
      >
        <div className={`${styles.icon} relative`}>
          <div
            className={`${styles.iconSolid} absolute top-0 left-0 h-full w-full`}
          >
            {link.iconSolid}
          </div>
          <div className={styles.iconOutline}>{link.iconOutline}</div>
        </div>
        <span className={"hidden lg:inline"}>{children}</span>
      </div>
    </Link>
  );
};

import Star from "src/assets/icons/currentColor/star.svg?inline";
import Home from "src/assets/icons/outline/Home.svg?inline";
import HomeFull from "src/assets/icons/currentColor/Home--solid.svg?inline";

import Launchpad from "src/assets/icons/currentColor/Rocket.svg?inline";
import LaunchpadFull from "src/assets/icons/currentColor/RocketSolid.svg?inline";

import Lock from "src/assets/icons/currentColor/Unlock.svg?inline";
import LockFull from "src/assets/icons/currentColor/Lock.svg?inline";

import Buy from "src/assets/icons/currentColor/Shopping-cart-outline.svg?inline";
import BuyFull from "src/assets/icons/currentColor/Shopping-cart.svg?inline";

const Links = [
  {
    text: "Home",
    iconOutline: <Home />,
    iconSolid: <HomeFull />,
    href: "/",
  },
  {
    text: "Lock",
    iconOutline: <Lock />,
    iconSolid: <LockFull />,
    href: "/stake",
  },
  {
    text: "Buy $ASTR",
    iconOutline: <Buy />,
    iconSolid: <BuyFull className="transform -translate-y-0.5" />,
    href: "/buy",
  },
];

const HeaderMenu = () => {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderLineStyle] = useState<any>({
    transform: "translateX(0)",
    width: "20px",
  });

  const redrawUnderline = () => {
    if (!container.current) {
      return;
    }
    const activeIndex = Links.findIndex(
      (x) => x.href === router.route || router.route.startsWith("/project")
    );

    if (activeIndex == -1) {
      setUnderLineStyle({ display: "none" });
    }

    const element: any = container.current.querySelector(
      `.${styles.menuItem}:nth-child(${activeIndex + 1})`
    );

    if (!element) {
      return;
    }

    const isFirst = activeIndex === 0;
    const isLast = activeIndex === Links.length - 1;

    setUnderLineStyle({
      width: `${element.offsetWidth - (isFirst || isLast ? 22 : 46)}px`,
      transform: `translateX(${element.offsetLeft + (isFirst ? 2 : 24)}px)`,
    });
  };

  useEffect(() => {
    redrawUnderline();
  }, [router.route, container.current]);
  return (
    <div
      className={`headerMenu flex text-20 leading-6 ui-t-primaryClear ${styles.menu}`}
      ref={container}
    >
      {Links.map((x) => (
        <MenuItem link={x} key={x.href}>
          {x.text}
        </MenuItem>
      ))}

      <div className={styles.underline} style={underlineStyle}>
        <Star />
      </div>
    </div>
  );
};

export default HeaderMenu;
