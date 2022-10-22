// import COINBASE_ICON_URL from 'src/assets/svgs/coinbase.svg';
import { argentXConnector, braavosConnector } from "../connectors";

export const SUPPORTED_WALLETS: any = {
  ARGENT_X: {
    connector: argentXConnector,
    name: "Argent X",
    icon: "/assets/imgs/argent_x.png",
  },
  BRAAVOS: {
    connector: braavosConnector,
    name: "Braavos",
    icon: "/assets/imgs/braavos.png",
  },
};
