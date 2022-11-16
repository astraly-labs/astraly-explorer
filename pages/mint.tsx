import { useStarknetReact } from "@web3-starknet-react/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import Mint from "./mint/mint";

const Astraly: NextPage = () => {
  const { account } = useStarknetReact();

  useEffect(() => {
    console.log(account);
  }, [account]);

  return <Mint></Mint>;
};

export default Astraly;
