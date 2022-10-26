export const BADGE_CONTRACT_ABI = [
  {
    members: [
      {
        name: "low",
        offset: 0,
        type: "felt",
      },
      {
        name: "high",
        offset: 1,
        type: "felt",
      },
    ],
    name: "Uint256",
    size: 2,
    type: "struct",
  },
  {
    data: [
      {
        name: "from_",
        type: "felt",
      },
      {
        name: "to",
        type: "felt",
      },
      {
        name: "tokenId",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Transfer",
    type: "event",
  },
  {
    data: [
      {
        name: "owner",
        type: "felt",
      },
      {
        name: "approved",
        type: "felt",
      },
      {
        name: "tokenId",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Approval",
    type: "event",
  },
  {
    data: [
      {
        name: "owner",
        type: "felt",
      },
      {
        name: "operator",
        type: "felt",
      },
      {
        name: "approved",
        type: "felt",
      },
    ],
    keys: [],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "name",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "symbol",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "owner",
        type: "felt",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "tokenId",
        type: "Uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        name: "owner",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    data: [
      {
        name: "source",
        type: "Uint256",
      },
      {
        name: "target",
        type: "Uint256",
      },
      {
        name: "sbt",
        type: "felt",
      },
    ],
    keys: [],
    name: "sssbt_transfer",
    type: "event",
  },
  {
    inputs: [
      {
        name: "sbt_id",
        type: "felt",
      },
      {
        name: "token_id",
        type: "Uint256",
      },
      {
        name: "salt",
        type: "felt",
      },
      {
        name: "signature",
        type: "(felt, felt)",
      },
    ],
    name: "transfer",
    outputs: [],
    type: "function",
  },
  {
    data: [
      {
        name: "role",
        type: "felt",
      },
      {
        name: "account",
        type: "felt",
      },
      {
        name: "sender",
        type: "felt",
      },
    ],
    keys: [],
    name: "RoleGranted",
    type: "event",
  },
  {
    data: [
      {
        name: "role",
        type: "felt",
      },
      {
        name: "account",
        type: "felt",
      },
      {
        name: "sender",
        type: "felt",
      },
    ],
    keys: [],
    name: "RoleRevoked",
    type: "event",
  },
  {
    data: [
      {
        name: "role",
        type: "felt",
      },
      {
        name: "previousAdminRole",
        type: "felt",
      },
      {
        name: "newAdminRole",
        type: "felt",
      },
    ],
    keys: [],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    data: [
      {
        name: "contract_address",
        type: "felt",
      },
      {
        name: "block_number",
        type: "felt",
      },
      {
        name: "balance",
        type: "felt",
      },
      {
        name: "token_address",
        type: "felt",
      },
    ],
    keys: [],
    name: "SBTContractCreated",
    type: "event",
  },
  {
    data: [
      {
        name: "new_class_hash",
        type: "felt",
      },
    ],
    keys: [],
    name: "SBTClassHashChanged",
    type: "event",
  },
  {
    inputs: [
      {
        name: "_block_number",
        type: "felt",
      },
      {
        name: "_balance",
        type: "felt",
      },
      {
        name: "_token_address",
        type: "felt",
      },
      {
        name: "_fossil_fact_registry_address",
        type: "felt",
      },
    ],
    name: "constructor",
    outputs: [],
    type: "constructor",
  },
  {
    inputs: [],
    name: "minBalance",
    outputs: [
      {
        name: "min",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenAddress",
    outputs: [
      {
        name: "address",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "blockNumber",
    outputs: [
      {
        name: "block",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "starknet_account",
        type: "felt",
      },
      {
        name: "token_balance",
        type: "felt",
      },
      {
        name: "token_contract_nonce",
        type: "felt",
      },
      {
        name: "account_proof_length",
        type: "felt",
      },
      {
        name: "storage_proof_length",
        type: "felt",
      },
      {
        name: "code_hash__len",
        type: "felt",
      },
      {
        name: "code_hash_",
        type: "felt*",
      },
      {
        name: "storage_slot__len",
        type: "felt",
      },
      {
        name: "storage_slot_",
        type: "felt*",
      },
      {
        name: "storage_hash__len",
        type: "felt",
      },
      {
        name: "storage_hash_",
        type: "felt*",
      },
      {
        name: "message__len",
        type: "felt",
      },
      {
        name: "message_",
        type: "felt*",
      },
      {
        name: "message_byte_length",
        type: "felt",
      },
      {
        name: "R_x__len",
        type: "felt",
      },
      {
        name: "R_x_",
        type: "felt*",
      },
      {
        name: "R_y__len",
        type: "felt",
      },
      {
        name: "R_y_",
        type: "felt*",
      },
      {
        name: "s__len",
        type: "felt",
      },
      {
        name: "s_",
        type: "felt*",
      },
      {
        name: "v",
        type: "felt",
      },
      {
        name: "storage_key__len",
        type: "felt",
      },
      {
        name: "storage_key_",
        type: "felt*",
      },
      {
        name: "storage_value__len",
        type: "felt",
      },
      {
        name: "storage_value_",
        type: "felt*",
      },
      {
        name: "account_proofs_concat_len",
        type: "felt",
      },
      {
        name: "account_proofs_concat",
        type: "felt*",
      },
      {
        name: "account_proof_sizes_words_len",
        type: "felt",
      },
      {
        name: "account_proof_sizes_words",
        type: "felt*",
      },
      {
        name: "account_proof_sizes_bytes_len",
        type: "felt",
      },
      {
        name: "account_proof_sizes_bytes",
        type: "felt*",
      },
      {
        name: "storage_proofs_concat_len",
        type: "felt",
      },
      {
        name: "storage_proofs_concat",
        type: "felt*",
      },
      {
        name: "storage_proof_sizes_words_len",
        type: "felt",
      },
      {
        name: "storage_proof_sizes_words",
        type: "felt*",
      },
      {
        name: "storage_proof_sizes_bytes_len",
        type: "felt",
      },
      {
        name: "storage_proof_sizes_bytes",
        type: "felt*",
      },
    ],
    name: "mint",
    outputs: [],
    type: "function",
  },
];
