import { useStarknetReact } from "@web3-starknet-react/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import Score from "./score /score";

const Astraly: NextPage = () => {
  const { account } = useStarknetReact();

  useEffect(() => {
    console.log(account);
  }, [account]);

  return <Score></Score>;
};

export default Astraly;
