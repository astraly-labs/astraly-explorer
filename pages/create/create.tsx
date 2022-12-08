import React, { useState } from "react";

const Create = () => {
  const [network, setNetwork] = useState<string>("");
  const [creatorAddress, setCreatorAddress] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [minimumClaim, setMinimumClaim] = useState<string>("");
  const [durationTime, setDurationTime] = useState<string>("");

  const handleCreatorChange = (event: any) => {
    setCreatorAddress(event.target.value);
  };

  const handleTokenChange = (event: any) => {
    setTokenAddress(event.target.value);
  };
  const handleMinimunChange = (event: any) => {
    setMinimumClaim(event.target.value);
  };
  const handleDurationChange = (event: any) => {
    setDurationTime(event.target.value);
  };

  return (
    <>
      <div className="flex text-[60px] text-primary pb-8 font-bold items-center text-center justify-center pt-10">
        Create a new badge
      </div>
      <div className="flex ">
        <div className="">Choose the chain you want:</div>
        <button onClick={() => setNetwork("Ethereum")}>Ethereum</button>
        <button onClick={() => setNetwork("Optimism")}>Optimism</button>
        <button onClick={() => setNetwork("Polygon")}>Polygon</button>
        <button onClick={() => setNetwork("Starknet")}>Polygon</button>
      </div>

      <div className="">The creator address ? </div>
      <input onChange={handleCreatorChange}></input>
      <div className="">The token address ? </div>
      <input onChange={handleTokenChange}></input>
      <div className="">Minimum token balance ? </div>
      <input onChange={handleMinimunChange}></input>
      <div className="">Claim duration? </div>
      <input onChange={handleDurationChange}></input>
    </>
  );
};

export default Create;
