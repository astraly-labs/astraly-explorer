declare module "*.svg?inline" {
  import React = require("react");
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare global {
  interface Window {
    mozRequestAnimationFame: typeof window.requestAnimationFrame;
    webkitRequestAnimationFrame: typeof window.requestAnimationFrame;
    msRequestAnimationFrame: typeof window.requestAnimationFrame;
  }
}
