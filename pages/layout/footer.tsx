import {
  ContactEmail,
  DiscordLink,
  GitHubLink,
  DocsLink,
  TwitterLink,
  WhitepaperLink,
  TelegramLink,
} from "../../src/constants";
import TwitterIcon from "src/assets/icons/currentColor/Twitter.svg";
import TelegramIcon from "src/assets/icons/currentColor/Telegram.svg";
import GithubIcon from "src/assets/icons/currentColor/Github.svg";
import DiscordIcon from "src/assets/icons/currentColor/Discord.svg";

import Logo from "src/assets/images/currentColor/logo-text.svg";
import Link from "next/link";

const Item = ({
  icon,
  label,
  href,
}: {
  icon: string;
  label: string;
  href: string;
}) => {
  return (
    <>
      <a href={href} target="__blank">
        <div className="flex items-center text-primary cursor-pointer">
          <div className="icon mr-2 transform -translate-y-0.5">
            <img src={icon} alt={label} />
          </div>

          <div className="text">{label}</div>
        </div>
      </a>
    </>
  );
};

export const Footer = () => {
  const Links = [
    [TwitterIcon, "Twitter", TwitterLink],
    [DiscordIcon, "Discord", DiscordLink],
    [GithubIcon, "Github", GitHubLink],
    [TelegramIcon, "Telegram", TelegramLink],
  ];
  return (
    <>
      <div className="g-container py-4">
        <div className="py-2 flex flex-col lg:flex-row items-center justify-between text-16">
          <div className="links flex flex-wrap items-center gap-4 lg:gap-11 mb-6 lg:mb-0">
            {Links.map(([icon, label, href]) => (
              <Item icon={icon} label={label} href={href} key={label} />
            ))}
          </div>

          <div className="flex items-center">
            <p className={"mr-8"}>
              Get in touch:{" "}
              <a href={`mailto:${ContactEmail}`} className={"text-primary"}>
                {ContactEmail}{" "}
              </a>
            </p>

            {/* <Link href={"/"}>
              <img src={Logo} alt={"Astraly"} />
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
