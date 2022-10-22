import { createStarknetReactRoot } from '@web3-starknet-react/core';
import { NetworkContextName } from '../constants/index';

const Web3ReactProviderDefault = createStarknetReactRoot(NetworkContextName);

const Web3ReactProviderDefaultSSR = ({ children, getLibrary }) => {
  return <Web3ReactProviderDefault getLibrary={getLibrary}>{children}</Web3ReactProviderDefault>;
};

export default Web3ReactProviderDefaultSSR;
