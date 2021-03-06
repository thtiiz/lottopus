import { getNetwork } from '@ethersproject/networks';
import { TNetworkInfo } from 'eth-hooks/models';
import { NETWORKS } from 'scaffold-common/src/constants';
import { TNetworkNames } from 'scaffold-common/src/models/TNetworkNames';

export const getNetworkInfo = (chainId: number | undefined): TNetworkInfo | undefined => {
  if (!chainId) return;

  for (const n in NETWORKS) {
    const names = n as TNetworkNames;
    if (NETWORKS[names].chainId === chainId) {
      return NETWORKS[names];
    }
  }

  const network = getNetwork(chainId) ?? {};
  // @ts-expect-error
  const url = network?._defaultProvider?.connection?.url ?? '';
  return { ...network, blockExplorer: '', color: '#666666', url: url };
};
