import { ArgentXConnector } from '@web3-starknet-react/argentx-connector'
import { BraavosConnector } from '@web3-starknet-react/braavos-connector'

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET'

export const argentXConnector = new ArgentXConnector({})

export const braavosConnector = new BraavosConnector({ supportedChainIds: [5] })
