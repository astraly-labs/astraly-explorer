import { useStarknetReact } from '@web3-starknet-react/core'
import { SUPPORTED_WALLETS } from 'constants/wallet'
import { useEffect, useMemo, useState } from 'react'
import { argentXConnector } from '../connectors'

export default function useEagerConnect() {
  const { activate, active } = useStarknetReact()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    const _walletName = localStorage.getItem('astraly__wallet')
    const _connector = Object.keys(SUPPORTED_WALLETS).find(
      (key) => _walletName === SUPPORTED_WALLETS[key].name
    )
    const __connector = _connector ? SUPPORTED_WALLETS[_connector].connector : argentXConnector
    if (!_connector) localStorage.setItem('astraly__wallet', 'Argent X')
    __connector?.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(__connector, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, [activate])

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}
