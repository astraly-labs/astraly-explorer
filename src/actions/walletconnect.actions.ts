import { WalletConnectConstants } from '../constants/walletconnect.constants'

const WalletConnectActions = {
  connectWallet,
  disconnectWallet,
}

function connectWallet(authToken: string, isModerator: boolean) {
  return (dispatch: any) => {
    dispatch(_connectWallet(authToken, isModerator))
  }
}

const _connectWallet = (authToken: string, isModerator: boolean) => {
  return {
    type: WalletConnectConstants.WALLETCONNECTED,
    token: authToken,
    isModerator,
  }
}

function disconnectWallet() {
  return (dispatch: any) => {
    dispatch(_disconnectWallet())
  }
}

const _disconnectWallet = () => {
  return {
    type: WalletConnectConstants.WALLETDISCONNECTED,
  }
}

export default WalletConnectActions
