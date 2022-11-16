import { encode, number, uint256 } from "starknet";
import { utils } from "ethers";

export const isValidAddress = (address: string): boolean =>
  /^0x[0-9a-f]{1,64}$/.test(address);

export const formatAddress = (address: string) =>
  encode.addHexPrefix(encode.removeHexPrefix(address).padStart(64, "0"));

export const truncateAddress = (fullAddress: string) => {
  const address = formatAddress(fullAddress);

  const hex = address.slice(0, 2);
  const start = address.slice(2, 6);
  const end = address.slice(-4);
  return `${hex} ${start} ... ${end}`;
};

export function getUint256CalldataFromBN(bn: number.BigNumberish) {
  return { type: "struct" as const, ...uint256.bnToUint256(bn) };
}

export function parseInputAmountToUint256(input: string, decimals = 18) {
  return getUint256CalldataFromBN(utils.parseUnits(input, decimals).toString());
}

export function parseInputAmountToUint256ExecuteCall(
  input: string,
  decimals = 18
) {
  const _parsedAmount = uint256.bnToUint256(
    utils.parseUnits(input, decimals).toString()
  );
  return [_parsedAmount.low, _parsedAmount.high];
}

export const getUID = () =>
  "_" + (Math.random() * Math.random()).toString(36).substring(2, 9);

export const getVoyagerLink = (txHash?: string): string => {
  const VoyagerLink = `https://${
    process.env.REACT_APP_ENV === "TESTNET" ? "testnet." : ""
  }starkscan.co`;
  return txHash ? `${VoyagerLink}/tx/${txHash}` : VoyagerLink;
};

export const wait = (timeout = 1000) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, timeout)
  );
};

export const isSameAddress = (a1?: string, a2?: string): boolean => {
  if (!a1 || !a2) return false;

  const address1 = !isValidAddress(a1) ? a1 : formatAddress(a1);
  const address2 = !isValidAddress(a2) ? a2 : formatAddress(a2);

  if (!isValidAddress(address1) || !isValidAddress(address2)) return false;
  return address1 === address2;
};

export const promiseHandler = async (promise: any) => {
  try {
    return [await promise, null];
  } catch (err) {
    return [null, err];
  }
};
