import axios from "axios";
import React, { useState } from "react";

const Create = () => {
  const [network, setNetwork] = useState<string>("");
  const [creatorAddress, setCreatorAddress] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [minimumClaim, setMinimumClaim] = useState<string>("");
  const [durationTime, setDurationTime] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const sendFileToIPFS = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(ImgHash);
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  const creationTreatment = () => {};
  return (
    <>
      <div className="flex text-[60px] text-primary pb-8 font-bold items-center text-center justify-center pt-10">
        Create a new badge
      </div>
      <form onSubmit={creationTreatment}>
        <div className="flex ">
          <div className="">Choose the chain you want:</div>
          <button onClick={() => setNetwork("Ethereum")}>Ethereum</button>
          <button onClick={() => setNetwork("Optimism")}>Optimism</button>
          <button onClick={() => setNetwork("Polygon")}>Polygon</button>
        </div>

        <div className="">The creator address ? </div>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCreatorAddress(event.target.value)
          }
        ></input>
        <div className="">The token address ? </div>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTokenAddress(event.target.value)
          }
        ></input>
        <div className="">Minimum token balance ? </div>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setMinimumClaim(event.target.value)
          }
        ></input>
        <div className="">Claim duration? </div>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDurationTime(event.target.value)
          }
        ></input>
        <div className="">Upload the image </div>
        <div className="">
          <input
            type="file"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTokenAddress(event.target.value)
            }
          ></input>
        </div>
        <button type="submit">Mint NFT</button>
      </form>
    </>
  );
};

export default Create;
