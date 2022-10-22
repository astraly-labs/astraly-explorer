import React from 'react'

import type { TWalletContext } from './model'
import { WALLET_PROVIDER_INITIAL_STATE } from './model'

export const WalletContext = React.createContext<TWalletContext>(WALLET_PROVIDER_INITIAL_STATE)

export function useWallet() {
  return React.useContext(WalletContext)
}
