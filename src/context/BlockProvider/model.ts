export interface BlockManagerState {
  blockHash?: string
  blockNumber?: number
  ethPrice?: number
}

export const BLOCK_STATE_INITIAL_STATE: BlockManagerState = {
  blockHash: undefined,
  blockNumber: undefined,
  ethPrice: undefined,
}
