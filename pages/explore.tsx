import { useStarknetReact } from "@web3-starknet-react/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import Explore from "./explore /explore";

const Astraly: NextPage = () => {
  const { account } = useStarknetReact();

  useEffect(() => {
    console.log(account);
  }, [account]);

  return <Explore></Explore>;
};

export default Astraly;
