import { useStarknetReact } from "@web3-starknet-react/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import Profile from "./profile/profile";

const Astraly: NextPage = () => {
  const { account } = useStarknetReact();

  useEffect(() => {
    console.log(account);
  }, [account]);

  return <Profile></Profile>;
};

export default Astraly;
