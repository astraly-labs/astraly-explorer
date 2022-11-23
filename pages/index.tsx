import { useStarknetReact } from "@web3-starknet-react/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import Landing from "./landing/landing";

const Astraly: NextPage = () => {
  const { account } = useStarknetReact();

  useEffect(() => {
    console.log(account);
  }, [account]);

  return <Landing></Landing>;
};

export default Astraly;
