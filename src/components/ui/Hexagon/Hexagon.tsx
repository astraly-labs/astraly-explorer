import React from "react";
import classnames from "classnames";

import styles from "./Hexagon.module.scss";

export const Hexagon: React.FC<
  React.PropsWithChildren<{
    className?: string;
    svgClassName?: string;
    strokeColor?: string;
    fillColor?: string;
    size?: number;
    strokeWidth?: string;
  }>
> = ({
  children,
  className,
  strokeColor = "white",
  fillColor = "#FAF3FF",
  size = 48,
  strokeWidth = "2",
  svgClassName,
}) => (
  <div
    className={classnames(styles.Hexagon, className)}
    style={{ width: size, height: size }}
  >
    <svg
      className={svgClassName}
      viewBox={`0 0 ${size - 4} ${size - 3}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.455 3.2656L35.2396 8.28166C38.6686 10.2397 40.7851 13.8854 40.7851 17.8341V27.6375C40.7851 31.5862 38.6686 35.2319 35.2396 37.1899L26.455 42.206C23.0748 44.1361 18.9262 44.1361 15.546 42.206L6.7614 37.1899C3.33236 35.2319 1.21588 31.5862 1.21588 27.6375L1.21588 17.8341C1.21588 13.8854 3.33236 10.2397 6.76139 8.28166L15.546 3.2656C18.9262 1.33548 23.0748 1.33548 26.455 3.2656Z"
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        fill={fillColor}
      />
    </svg>
    <div className={styles.Hexagon__content}>{children}</div>
  </div>
);
