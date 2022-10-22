import { useStarknetReact } from '@web3-starknet-react/core'
import ToastActions from 'actions/toast.actions'
import { ToastState } from 'components/ui/Toast/utils'
import { useAppDispatch } from 'hooks/hooks'
import React, { useEffect } from 'react'
import type { AddTransactionResponse } from 'starknet'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { getVoyagerLink } from 'utils'
import { useBlock } from '../BlockProvider'

import { TransactionsContext } from './context'
import type { StoredTransaction } from './model'
import transactionsReducer from './reducer'

interface TransactionsProviderProps {
  children: React.ReactNode
}

const LOCAL_STORAGE_KEY = 'ASTRALY_TX_'
const TransactionsProvider = ({ children }: TransactionsProviderProps): JSX.Element => {
  const { library, account } = useStarknetReact()
  const { blockHash } = useBlock()

  const [transactions, dispatch] = React.useReducer(transactionsReducer, [])
  const appDispatch = useAppDispatch()
  // Dispatch new transactions to store
  const syncStoreTransactions = (localTransactions: StoredTransaction[]) => {
    dispatch({
      type: 'UPDATE_TRANSACTIONS',
      payload: localTransactions,
    })
  }

  // Save new transactions to localstorage
  const syncStoreTransactionsToLocalStorage = (
    newTransactions: StoredTransaction[],
    accountAddress: string
  ) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY + accountAddress,
      JSON.stringify(
        newTransactions.map((tx: StoredTransaction) => {
          // Remove successCallback & errorCallback before stringify
          const { successCallback, errorCallback, ...rest } = tx
          return rest
        })
      )
    )
  }

  // Check if tx is terminated
  // If yes, use callback & return updated tx
  // If not return undefined
  const processTransactionEnd = (tx: StoredTransaction) => {
    if (tx.code === 'ACCEPTED_ON_L1' || tx.code === 'ACCEPTED_ON_L2') {
      if (tx.successCallback) tx.successCallback()

      return {
        ...tx,
        successCallback: undefined,
        errorCallback: undefined,
      }
    }
    if (tx.code === 'REJECTED') {
      if (tx.errorCallback) tx.errorCallback()

      return {
        ...tx,
        successCallback: undefined,
        errorCallback: undefined,
      }
    }
    return undefined
  }

  // Called when tx is updated
  // Update the displayed toast information
  const updateTxToastStatus = (tx: StoredTransaction) => {
    const linkLabel = 'View on Explorer'
    const voyagerLink = getVoyagerLink(tx.hash)
    const { description, hash } = tx
    switch (tx.code) {
      case 'NOT_RECEIVED':
        // Display toast info text to "transmitted to network"
        // displayInfo('transmitted to network', description, hash, voyagerLink, linkLabel)
        appDispatch(
          ToastActions.addToast({
            id: hash,
            title: `${description} | Transmitted to network`,
            action: (
              <a
                className="text-12 text-primaryClear"
                href={voyagerLink}
                target="_blank"
                rel="noreferrer">
                {linkLabel}
              </a>
            ),
            state: ToastState.LOADING,
            autoClose: false,
          })
        )
        break
      case 'RECEIVED':
      case 'PENDING':
        // Update toast to "success"
        // updateToastInfosText('success', description, hash, voyagerLink, linkLabel)
        appDispatch(
          ToastActions.addToast({
            id: hash,
            title: `${description} | Received`,
            action: (
              <a
                className="text-12 text-primaryClear"
                href={voyagerLink}
                target="_blank"
                rel="noreferrer">
                View on explorer
              </a>
            ),
            state: ToastState.LOADING,
            autoClose: false,
          })
        )
        break
      case 'ACCEPTED_ON_L1':
      case 'ACCEPTED_ON_L2':
        // Update toast to "success"
        // updateToastInfosToSuccess('confirmed', description, hash, voyagerLink, linkLabel)
        appDispatch(
          ToastActions.updateToast({
            id: hash,
            title: `${description} | Confirmed`,
            action: (
              <a
                className="text-12 text-primaryClear"
                href={voyagerLink}
                target="_blank"
                rel="noreferrer">
                View on explorer
              </a>
            ),
            state: ToastState.VALID,
            autoClose: false,
          })
        )
        break
      case 'REJECTED':
        // Update toast to "error"
        // updateToastInfosToError('rejected', description, hash, voyagerLink, linkLabel)
        appDispatch(
          ToastActions.updateToast({
            id: hash,
            title: `${description} | Rejected`,
            action: (
              <a
                className="text-12 text-primaryClear"
                href={voyagerLink}
                target="_blank"
                rel="noreferrer">
                View on explorer
              </a>
            ),
            state: ToastState.ERROR,
            autoClose: false,
          })
        )
        break
      default:
    }
  }

  // Check if tx has changed, & update it
  const checkAndUpdateTransaction = async (tx: StoredTransaction, newBlockHash: string) => {
    // If tx ended, return // TODO Only check if end & return (remove callback management)
    const txEndedResponse = processTransactionEnd(tx)
    if (txEndedResponse) return txEndedResponse

    // If last hashBlock when check transaction is the same as newBlockHash
    // RECEIVED status can change in the same block
    if (tx.lastChecked === newBlockHash && tx.code !== 'NOT_RECEIVED') {
      return tx
    }

    try {
      // get the new status of te tx
      const newStatus = await library.getTransactionStatus(tx.hash)

      // Update & return the transaction
      const newTransaction: StoredTransaction = {
        ...tx,
        code: newStatus.tx_status,
        lastChecked: newBlockHash,
      }

      // Tx is seen for first time or is updated
      if (tx.lastChecked === '' || tx.code !== newTransaction.code) {
        updateTxToastStatus(newTransaction)
      }

      return newTransaction
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`failed to check transaction status: ${tx.hash}`)
    }

    return tx
  }

  // Run once to get local storage
  // Tricks as localStorage only be accessible via browser, not on SSR with next.js
  useEffect(() => {
    if (account) {
      const localJsonTransactions = localStorage.getItem(LOCAL_STORAGE_KEY + account.address)
      let localTransactions: StoredTransaction[] = []
      if (localJsonTransactions) {
        localTransactions = JSON.parse(localJsonTransactions)
        syncStoreTransactions(localTransactions)
      }
    } else {
      syncStoreTransactions([])
    }
  }, [account])

  // Dispatch transaction to store
  const addTransaction = React.useCallback(
    (
      payload: AddTransactionResponse,
      description: string,
      successCallback: () => void,
      errorCallback: () => void
    ) => {
      dispatch({
        type: 'ADD_TRANSACTION',
        payload,
        description,
        successCallback,
        errorCallback,
      })
    },
    [dispatch]
  )

  // Called at each block or transactions updated
  useDeepCompareEffect(() => {
    const process = async () => {
      console.log(blockHash, transactions)
      // If block hash is undefined, stop process
      if (!blockHash || !account || transactions.length === 0) {
        return
      }

      // Filter by unique tx hash
      const filteredTxs = transactions.filter(
        (tx: StoredTransaction, index, self) =>
          index === self.findIndex((txTemp) => txTemp.hash === tx.hash)
      )

      const promises: Promise<StoredTransaction>[] = []
      filteredTxs.forEach((tx) => promises.push(checkAndUpdateTransaction(tx, blockHash)))

      Promise.all(promises).then((newTransactions: StoredTransaction[]) => {
        // Re-sync the store & the localstorage
        syncStoreTransactions(newTransactions)
        syncStoreTransactionsToLocalStorage(newTransactions, account.address)
      })
    }
    process()
  }, [blockHash, transactions, account])

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction }}
      // eslint-disable-next-line react/no-children-prop
      children={children}
    />
  )
}

export default TransactionsProvider
