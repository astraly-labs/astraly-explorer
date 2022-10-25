import { sha3Raw, stripHexPrefix, toHex, padLeft, toBN } from "web3-utils";
import { utils } from "ethers";
import { secp256k1 } from "@zoltu/ethereum-crypto";

import * as BN from "bn.js";

function packInts64(input: string): Array<BN> {
  const array = [];
  for (const s of input.match(/.{1,16}/g)!) {
    array.push(toBN(s));
  }
  return array;
}

function packBigInt3(input: string): Array<BN> {
  const a = [];
  const base = toBN(2).pow(toBN(86));
  let num = toBN(input);
  for (const _ of [0, 1, 2]) {
    // how to create for loop with unused variable?
    const quotient = num.div(base);
    const residue = num.mod(base);
    num = quotient;
    a.push(residue);
  }
  return a;
}

function encodeProof(proof: Array<string>) {
  const flatProof: Array<BN> = [];
  const flatProofSizesBytes = [];
  const flatProofSizesWords = [];

  for (const proofElement of proof) {
    const packedProofElement: Array<BN> = packInts64(proofElement);
    flatProof.push(...packedProofElement);
    flatProofSizesBytes.push(stripHexPrefix(proofElement).length / 2);
    flatProofSizesWords.push(packedProofElement.length);
  }

  return [flatProof, flatProofSizesWords, flatProofSizesBytes];
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

  console.log(block);

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
  const packedMessage: Array<BN> = [
    toBN("1820989616068650357"),
    toBN("7863376661560845668"),
    toBN("2327628128951822181"),
    toBN("4182209287050756096"),
  ];
  packedMessage.push(...packInts64(paddedMessage));
  const rawSignature = await signer.signMessage(paddedMessage);
  const signature = utils.splitSignature(rawSignature);

  // Derive the y-coordinate of the elliptic curve point
  const Rx = BigInt("0x" + toBN(signature.r).toJSON());
  const recoveryParam: 0 | 1 = signature.recoveryParam === 0 ? 0 : 1;
  const Ry = secp256k1.decompressPoint(Rx, recoveryParam);
  console.log("Rx", Rx);
  console.log("Ry", Ry);

  console.log(proof);

  console.log(toBN(starknetAccount));
  console.log(toBN(minBalance));
  console.log(parseInt(ethereum.chainId, 16)); // chain id
  console.log(blockNumber);
  console.log(accountProof.length);
  console.log(storageProof.proof.length);
  console.log(packInts64(stripHexPrefix(token))); // address
  console.log(packInts64(stripHexPrefix(block.stateRoot)));
  console.log(packInts64(stripHexPrefix(proof.codeHash)));
  console.log(packInts64(padLeft(stripHexPrefix(toHex(storageSlot)), 64)));
  console.log(packBigInt3(stripHexPrefix(proof.storageHash)));
  // Signed state signature
  console.log(packedMessage);
  console.log(132); // message_byte_len
  console.log(packBigInt3(stripHexPrefix(Rx.toString())));
  console.log(packBigInt3(stripHexPrefix(Ry.toString())));
  console.log(packBigInt3(stripHexPrefix(signature.s)));
  console.log(signature.recoveryParam + 27);
  console.log(packInts64(stripHexPrefix(storageProof.key)));
  console.log(packInts64(stripHexPrefix(storageProof.value)));
  // Account proof
  console.log(accountProofsConcat);
  console.log(accountProofSizesWords);
  console.log(accountProofSizesBytes);
  // Storage proof
  console.log(storageProofsConcat);
  console.log(storageProofSizesWords);
  console.log(storageProofSizesBytes);

  return [
    toBN(starknetAccount),
    toBN(minBalance),
    parseInt(ethereum.chainId, 16), // chain id
    blockNumber,
    accountProof.length,
    storageProof.proof.length,
    packInts64(stripHexPrefix(token)), // address
    packInts64(stripHexPrefix(block.stateRoot)),
    packInts64(stripHexPrefix(proof.codeHash)),
    packInts64(padLeft(stripHexPrefix(toHex(storageSlot)), 64)),
    packBigInt3(stripHexPrefix(proof.storageHash)),
    // Signed state signature
    packedMessage,
    132, // message_byte_len
    packBigInt3(stripHexPrefix(Rx.toString())),
    packBigInt3(stripHexPrefix(Ry.toString())),
    packBigInt3(stripHexPrefix(signature.s)),
    signature.recoveryParam + 27,
    packInts64(stripHexPrefix(storageProof.key)),
    packInts64(stripHexPrefix(storageProof.value)),
    // Account proof
    accountProofsConcat,
    accountProofSizesWords,
    accountProofSizesBytes,
    // Storage proof
    storageProofsConcat,
    storageProofSizesWords,
    storageProofSizesBytes,
  ];
}
