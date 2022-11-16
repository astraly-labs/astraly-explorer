import { sha3Raw, stripHexPrefix, toHex, padLeft } from "web3-utils";
import { utils } from "ethers";
import { secp256k1 } from "@zoltu/ethereum-crypto";

import * as BN from "bn.js";
import { toBN, toFelt } from "starknet/dist/utils/number";

function packInts64(input: string): Array<string> {
  const array = [];
  for (const s of input.match(/.{1,16}/g)!) {
    array.push(toFelt(padString(s)));
  }
  return array;
}

function padString(input: string): string {
  if (input.startsWith("0x")) return input;

  return "0x" + input;
}

function packBigInt3(input: string): Array<string> {
  const a = [];
  const base = toBN(2).pow(toBN(86));
  let num = toBN(padString(input));
  for (const _ of [0, 1, 2]) {
    // how to create for loop with unused variable?
    const quotient = num.div(base);
    const residue = num.mod(base);
    num = quotient;
    a.push(toFelt(residue));
  }
  return a;
}

function encodeProof(proof: Array<string>) {
  const flatProof: Array<string> = [];
  const flatProofSizesBytes = [];
  const flatProofSizesWords = [];

  for (const proofElement of proof) {
    const packedProofElement: Array<string> = packInts64(proofElement);
    flatProof.push(...packedProofElement);
    flatProofSizesBytes.push(toFelt(stripHexPrefix(proofElement).length / 2));
    flatProofSizesWords.push(toFelt(packedProofElement.length));
  }

  return [flatProof, flatProofSizesWords, flatProofSizesBytes];
}
export async function checkRequirements(
  ethereum: any,
  signer: any,
  account: any,
  starknetAccount: string,
  token: string,
  blockNumber: number,
  storageSlot: number,
  balance: string
) {
  if (!ethereum) {
    /// https://eips.ethereum.org/EIPS/eip-1102
    console.error("No Provider detected");
    return;
  }

  const number = "0x" + blockNumber.toString(16);
  const block = (await ethereum.send("eth_getBlockByNumber", [number, false]))
    .result;

  console.log(block);

  // Prepare message attestation contents
  let pos = padLeft(stripHexPrefix(account.toLowerCase()), 64);
  pos += padLeft(stripHexPrefix(toHex(storageSlot)), 64);
  const storageKey = sha3Raw("0x" + pos);
  starknetAccount = stripHexPrefix(starknetAccount);
  const stateRoot = stripHexPrefix(block.stateRoot);

  const userCurrentBalance = (
    await ethereum.send("eth_getStorageAt", [token, storageKey, number])
  ).result;
  /// TODO: check denomination
  if (!toBN(userCurrentBalance).eq(toBN(balance))) {
    console.error("User balance doesn't match");
    return false;
  }
  return true;
}

export async function encodeCallArgs(
  ethereum: any,
  signer: any,
  account: any,
  starknetAccount: string,
  token: string,
  blockNumber: number,
  storageSlot: number,
  minBalance: string
) {
  // eslint-disable-next-line no-undef
  if (!ethereum) {
    /// https://eips.ethereum.org/EIPS/eip-1102
    console.error("No Provider detected");
    return;
  }

  const number = "0x" + blockNumber.toString(16);
  const block = await ethereum.send("eth_getBlockByNumber", [number, false]);

  // Prepare message attestation contents
  let pos = padLeft(stripHexPrefix(account.toLowerCase()), 64);
  pos += padLeft(stripHexPrefix(toHex(storageSlot)), 64);
  const storageKey = sha3Raw("0x" + pos);
  starknetAccount = stripHexPrefix(starknetAccount);
  const stateRoot = stripHexPrefix(block.stateRoot);

  const userCurrentBalance = await ethereum.send("eth_getStorageAt", [
    token,
    storageKey,
    number,
  ]);
  /// TODO: check denomination
  if (!toBN(userCurrentBalance).gte(toBN(minBalance))) {
    console.log("User balance doesn't match");
    return;
  }

  // Request storage state proof
  const proof = await ethereum.send("eth_getProof", [
    token,
    [storageKey],
    number,
  ]);
  const accountProof = proof.accountProof;
  const storageProof = proof.storageProof[0];
  const [accountProofsConcat, accountProofSizesWords, accountProofSizesBytes] =
    encodeProof(accountProof);
  const [storageProofsConcat, storageProofSizesWords, storageProofSizesBytes] =
    encodeProof(storageProof.proof);

  // Sign attestation message
  const message = starknetAccount + stateRoot + stripHexPrefix(storageKey);
  const paddedMessage = "000000" + message + "00000000";
  let packedMessage: Array<string> = [
    toBN("1820989616068650357"),
    toBN("7863376661560845668"),
    toBN("2327628128951822181"),
    toBN("4182209287050756096"),
  ].map((x) => toFelt(x));
  packedMessage.push(...packInts64(paddedMessage));
  const rawSignature = await signer.signMessage(paddedMessage);
  const signature = utils.splitSignature(rawSignature);

  // Derive the y-coordinate of the elliptic curve point
  const Rx = BigInt("0x" + toBN(signature.r).toJSON());
  const recoveryParam: 0 | 1 = signature.recoveryParam === 0 ? 0 : 1;
  const Ry = secp256k1.decompressPoint(Rx, recoveryParam);

  let args = [];
  args.push(toFelt(padString(starknetAccount)));
  args.push(toFelt(proof.balance));
  args.push(toFelt(proof.nonce));
  args.push(toFelt(accountProof.length));
  args.push(toFelt(storageProof.proof.length));

  const code_hash_ = packInts64(proof.codeHash);
  // args.push(code_hash_.length);
  args.push(code_hash_);

  const storage_slot_ = packInts64(
    padLeft(stripHexPrefix(toHex(storageSlot)), 64)
  );
  // args.push(storage_slot_.length);
  args.push(storage_slot_);

  const storage_hash_ = packBigInt3(proof.storageHash);
  // args.push(storage_hash_.length);
  args.push(storage_hash_);

  args.push(packedMessage);
  args.push(132);

  const R_x_ = packBigInt3(Rx.toString());
  // args.push(R_x_.length);
  args.push(R_x_);

  const R_y_ = packBigInt3(Ry.toString());
  // args.push(R_y_.length);
  args.push(R_y_);

  const s_ = packBigInt3(signature.s);
  // args.push(s_.length);
  args.push(s_);

  args.push(toFelt(signature.recoveryParam + 27));

  const storage_key_ = packInts64(storageProof.key);
  // args.push(storage_key_.length);
  args.push(storage_key_);

  const storage_value_ = packInts64(storageProof.value);
  // args.push(storage_value_.length);
  args.push(storage_value_);

  args.push(accountProofsConcat);
  args.push(accountProofSizesWords);
  args.push(accountProofSizesBytes);

  args.push(storageProofsConcat);
  args.push(storageProofSizesWords);
  args.push(storageProofSizesBytes);

  return args;
}
