import axios from "axios";

import React, { useState } from "react";

const Create = () => {
  //Criterias for users to get the badge
  const [network, setNetwork] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [minimumClaim, setMinimumClaim] = useState<string>("");
  const [snapshotDate, setSnapshotDate] = useState<string>("");
  //Badge metadata
  const [badgeName, setBadgeName] = useState<string>("");
  const [badgeDescription, setBadgeDescription] = useState<string>("");
  const [badgeExtURL, setBadgeExtURL] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
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
            pinata_api_key: `${process.env.NEXT_PUBLIC_REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.NEXT_PUBLIC_REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        return ImgHash;
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  const creationTreatment = async () => {
    const ipfsLink = await sendFileToIPFS();
    var metadata_obj = JSON.stringify({
      name: badgeName,
      description: badgeDescription,
      image: ipfsLink,
      external_link: badgeExtURL,
    });

    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        pinata_api_key: `${process.env.NEXT_PUBLIC_REACT_APP_PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.NEXT_PUBLIC_REACT_APP_PINATA_API_SECRET}`,
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
      },
      data: metadata_obj,
    };
    const res = await axios(config);
    const metaLink = `ipfs://${res.data}`;
    console.log(metaLink);
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
      </div>

      <div className="">The name ? </div>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setBadgeName(event.target.value)
        }
      ></input>
      <div className="">The description? </div>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setBadgeDescription(event.target.value)
        }
      ></input>
      <div className="">Upload the image </div>
      <div className="">
        <input
          type="file"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedFile(event.target.files![0])
          }
        ></input>
      </div>
      <button onClick={creationTreatment}>Mint NFT</button>
    </>
  );
};

export default Create;
