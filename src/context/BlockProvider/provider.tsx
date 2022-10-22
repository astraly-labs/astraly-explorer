import { useStarknetReact } from '@web3-starknet-react/core'
import axios from 'axios'
import React from 'react'
import { GetBlockResponse, Provider } from 'starknet'

import { BlockContext } from './context'

export interface BlockHashProviderProps {
  children: React.ReactNode
  interval?: number
}

export function BlockHashProvider({ interval, children }: BlockHashProviderProps): JSX.Element {
  const { library, account, chainId } = useStarknetReact()
  const [blockHash, setBlockHash] = React.useState<string | undefined>(undefined)
  const [blockNumber, setBlockNumber] = React.useState<number | undefined>(undefined)
  const [ethPrice, setEthPrice] = React.useState<number | undefined>(undefined)

  const provider = account
    ? library
    : new Provider({ network: chainId === 1 ? 'mainnet-alpha' : 'goerli-alpha' })

  const fetchBlockHash = React.useCallback(() => {
    provider
      ?.getBlock()
      .then((block: GetBlockResponse) => {
        setBlockHash(block.block_hash)
        // @ts-ignore
        setBlockNumber(block.block_number)
      })
      .catch(console.log)
  }, [provider])

  const fetchETHPrice = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD`
      )
      const price = parseFloat(response.data['ethereum']['usd'])
      setEthPrice(price)
    } catch (error) {
      console.error(error)
    }
  }, [])

  React.useEffect(() => {
    fetchBlockHash()
    fetchETHPrice()
    const intervalId = setInterval(() => {
      fetchBlockHash()
      fetchETHPrice()
    }, interval ?? 5000)
    return () => clearInterval(intervalId)
  }, [interval, fetchBlockHash, fetchETHPrice])

  return (
    <BlockContext.Provider value={{ blockHash, blockNumber, ethPrice }}>
      {children}
    </BlockContext.Provider>
  )
}
